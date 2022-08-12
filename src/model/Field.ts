import { Cell } from "./State"

export class Field {
    public Cells: Cell[]
    public isGameOver: boolean
    public isComplete: boolean

    constructor(Cells: Cell[], isGameOver: boolean, isComplete: boolean) {
        this.Cells = Cells.map(x => Cell.Copy(x)),
            this.isGameOver = isGameOver
        this.isComplete = isComplete
    }

    public static Copy(field: Field): Field {
        return new Field(field.Cells, field.isGameOver, field.isComplete)
    }

    public static Open(field: Field, index: number): Field {
        let returnField = Field.Copy(field);
        if (returnField.Cells[index].Bomb) {
            returnField.isGameOver = true;
            returnField.Cells.forEach((state, i) => {
                if (state.Bomb) {
                    returnField.Cells[i].Open = true;
                }
            })
            return returnField
        }
        returnField = Field.fillOpen(returnField, index);
        if (Field.isComplete(returnField)) {
            returnField.isComplete = true;
        }
        return returnField;
    }

    public static PutFlag(field: Field, index: number): Field {
        const returnField = Field.Copy(field);
        if (!returnField.Cells[index].Open) {
            returnField.Cells[index].Flag = true;
        }
        return returnField;
    }

    public static RemoveFlag(field: Field, index: number): Field {
        const returnField = Field.Copy(field);
        if (!returnField.Cells[index].Open) {
            returnField.Cells[index].Flag = true;
        }
        return returnField;
    }

    private static isComplete(field: Field): boolean {
        for (const state of field.Cells) {
            if (!state.Bomb && !state.Open) {
                return false;
            }
        }
        return true
    }

    private static getSize(field: Field): number {
        return Math.sqrt(field.Cells.length);
    }

    private static xyToIndex(field: Field, x: number, y: number): number {
        const size = Field.getSize(field);
        if (x < 0 || x >= size || y < 0 || y >= size) {
            throw 'Fail to convert xy to index';
        }
        return x + y * size;
    }

    private static xyToIndexOrNaN(field: Field, x: number, y: number): number {
        const size = Field.getSize(field);
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return NaN;
        }
        return Field.xyToIndex(field, x, y);
    }
    private static indexToXy(field: Field, index: number): [number, number] {
        const size = Field.getSize(field);
        return [index % size, Math.floor(index / size)];
    }

    private static fillOpen(field: Field, index: number): Field {
        const returnField = Field.Copy(field);
        const queue: number[] = [];
        queue.push(index)
        while (queue.length > 0) {
            const i = queue.pop();
            if (i) {
                returnField.Cells[i].Open = true;
                returnField.Cells[i].Flag = false;
                if (returnField.Cells[i].Count === 0) {
                    Field.getOpenableAdjacentIndex(returnField, i).forEach((j) => {
                        queue.push(j);
                    })
                }
            }
        }
        return returnField
    }

    private static getOpenableAdjacentIndex(field: Field, index: number): number[] {
        const [x, y] = Field.indexToXy(field, index);
        return [
            Field.xyToIndexOrNaN(field, x - 1, y + 0),
            Field.xyToIndexOrNaN(field, x + 1, y + 0),
            Field.xyToIndexOrNaN(field, x + 0, y - 1),
            Field.xyToIndexOrNaN(field, x + 0, y + 1),
        ].filter((i) => {
            return !isNaN(i);
        }).filter((i) => {
            return !field.Cells[i].Bomb &&
                !field.Cells[i].Flag &&
                !field.Cells[i].Open;
        });
    }
}
