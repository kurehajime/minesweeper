import { Cell } from "./State"

export class Field {
    private _Cells: Cell[]
    get Cells() { return Object.freeze(this._Cells.map(cell => Object.freeze(cell))) }

    constructor(Cells: Cell[]) {
        this._Cells = Cells.map(cell => { return { ...cell } })
    }

    // 盤面をコピーする
    public Copy(): Field {
        return new Field(this._Cells)
    }

    // マスを開ける
    public Open(index: number): Field {
        let returnField = this.Copy();
        if (returnField._Cells[index].Bomb) {
            returnField._Cells.forEach((state, i) => {
                if (state.Bomb) {
                    returnField._Cells[i].Open = true
                }
            })
            return returnField
        }
        returnField = this.fillOpen(index);
        return returnField;
    }

    // 旗を立てる
    public PutFlag(index: number): Field {
        const returnField = this.Copy();
        if (!returnField._Cells[index].Open) {
            returnField._Cells[index].Flag = true
        }
        return returnField;
    }

    // 旗を消す
    public RemoveFlag(index: number): Field {
        const returnField = this.Copy();
        if (!returnField._Cells[index].Open) {
            returnField._Cells[index].Flag = false
        }
        return returnField;
    }

    // 駆除成功したか
    public IsComplete(): boolean {
        for (const state of this._Cells) {
            if (!state.Bomb && !state.Open) {
                return false;
            }
        }
        return true
    }

    // 爆死したか
    public IsGameOver(): boolean {
        for (const state of this._Cells) {
            if (state.Bomb && state.Open) {
                return true;
            }
        }
        return false
    }

    // 縦横の幅
    public Size(): number {
        return Math.sqrt(this._Cells.length);
    }

    // ランダムなマップを取得
    public static GetRandomField(size: number, bomb: number): Field {
        const len = size * size;
        const opens = Array(len).map(() => false);
        const flags = Array(len).map(() => false);
        const bombs = Array(len).map(() => false);
        const counts = Array(len).map(() => 0);
        for (let i = 0; i < bomb; i++) {
            bombs[i] = true;
        }
        for (let i = len - 1; i >= 0; i--) {
            const r = Math.floor(Math.random() * (i + 1))
            const tmp = bombs[i]
            bombs[i] = bombs[r]
            bombs[r] = tmp
        }
        return new Field(Array(len).map((i) => {
            return {
                Open: opens[i],
                Flag: flags[i],
                Bomb: bombs[i],
                Count: counts[i]
            }
        }));
    }

    private xyToIndex(x: number, y: number): number {
        const size = this.Size();
        if (x < 0 || x >= size || y < 0 || y >= size) {
            throw 'Fail to convert xy to index';
        }
        return x + y * size;
    }

    private xyToIndexOrNaN(x: number, y: number): number {
        const size = this.Size();
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return NaN;
        }
        return this.xyToIndex(x, y);
    }
    private indexToXy(index: number): [number, number] {
        const size = this.Size();
        return [index % size, Math.floor(index / size)];
    }

    private fillOpen(index: number): Field {
        const returnField = this.Copy();
        const queue: number[] = [];
        queue.push(index)
        while (queue.length > 0) {
            const i = queue.pop();
            if (i) {
                returnField._Cells[i].Open = true;
                returnField._Cells[i].Flag = false;
                if (returnField._Cells[i].Count === 0) {
                    this.getOpenableAdjacentIndex(i).forEach((j) => {
                        queue.push(j);
                    })
                }
            }
        }
        return returnField
    }

    private getOpenableAdjacentIndex(index: number): number[] {
        const [x, y] = this.indexToXy(index);
        return [
            this.xyToIndexOrNaN(x - 1, y + 0),
            this.xyToIndexOrNaN(x + 1, y + 0),
            this.xyToIndexOrNaN(x + 0, y - 1),
            this.xyToIndexOrNaN(x + 0, y + 1),
        ].filter((i) => {
            return !isNaN(i);
        }).filter((i) => {
            return !this._Cells[i].Bomb &&
                !this._Cells[i].Flag &&
                !this._Cells[i].Open;
        });
    }
}
