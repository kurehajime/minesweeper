import { Cell } from "./State"

export class Field {
    public Cells: Cell[]

    constructor(Cells: Cell[]) {
        this.Cells = Cells.map(x => x.Copy())
    }

    public Copy(): Field {
        return new Field(this.Cells)
    }

    public Open(index: number): Field {
        let returnField = this.Copy();
        if (returnField.Cells[index].Bomb) {
            returnField.Cells.forEach((state, i) => {
                if (state.Bomb) {
                    returnField.Cells[i].Open = true;
                }
            })
            return returnField
        }
        returnField = this.fillOpen(index);
        return returnField;
    }

    public PutFlag(index: number): Field {
        const returnField = this.Copy();
        if (!returnField.Cells[index].Open) {
            returnField.Cells[index].Flag = true;
        }
        return returnField;
    }

    public RemoveFlag(index: number): Field {
        const returnField = this.Copy();
        if (!returnField.Cells[index].Open) {
            returnField.Cells[index].Flag = true;
        }
        return returnField;
    }

    public IsComplete(): boolean {
        for (const state of this.Cells) {
            if (!state.Bomb && !state.Open) {
                return false;
            }
        }
        return true
    }

    public IsGameOver(): boolean {
        for (const state of this.Cells) {
            if (state.Bomb && state.Open) {
                return true;
            }
        }
        return false
    }

    private getSize(): number {
        return Math.sqrt(this.Cells.length);
    }

    private xyToIndex(x: number, y: number): number {
        const size = this.getSize();
        if (x < 0 || x >= size || y < 0 || y >= size) {
            throw 'Fail to convert xy to index';
        }
        return x + y * size;
    }

    private xyToIndexOrNaN(x: number, y: number): number {
        const size = this.getSize();
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return NaN;
        }
        return this.xyToIndex(x, y);
    }
    private indexToXy(index: number): [number, number] {
        const size = this.getSize();
        return [index % size, Math.floor(index / size)];
    }

    private fillOpen(index: number): Field {
        const returnField = this.Copy();
        const queue: number[] = [];
        queue.push(index)
        while (queue.length > 0) {
            const i = queue.pop();
            if (i) {
                returnField.Cells[i].Open = true;
                returnField.Cells[i].Flag = false;
                if (returnField.Cells[i].Count === 0) {
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
            return !this.Cells[i].Bomb &&
                !this.Cells[i].Flag &&
                !this.Cells[i].Open;
        });
    }
}
