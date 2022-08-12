import { Field } from "../model/Field";
import { Cell } from "../model/State";

export class Rule {
    public static CopyState(state: Cell): Cell {
        return {
            Open: state.Open,
            Flag: state.Flag,
            Bomb: state.Bomb,
            Count: state.Count,
        }
    }

    public static Copy(field: Field): Field {
        return {
            Cells: field.Cells.map(x => Rule.CopyState(x)),
            isGameOver: field.isGameOver,
            isComplete: field.isComplete,
        }
    }

    public static Open(field: Field, index: number): Field {
        let returnField = Rule.Copy(field);
        if (returnField.Cells[index].Bomb) {
            returnField.isGameOver = true;
            returnField.Cells.forEach((state, i) => {
                if (state.Bomb) {
                    returnField.Cells[i].Open = true;
                }
            })
            return returnField
        }
        returnField = Rule.fillOpen(returnField, index);
        if (Rule.isComplete(returnField)) {
            returnField.isComplete = true;
        }
        return returnField;
    }

    public static PutFlag(field: Field, index: number): Field {
        const returnField = Rule.Copy(field);
        if (!returnField.Cells[index].Open) {
            returnField.Cells[index].Flag = true;
        }
        return returnField;
    }

    public static RemoveFlag(field: Field, index: number): Field {
        const returnField = Rule.Copy(field);
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
        const size = Rule.getSize(field);
        if (x < 0 || x >= size || y < 0 || y >= size) {
            throw 'Fail to convert xy to index';
        }
        return x + y * size;
    }

    private static xyToIndexOrNaN(field: Field, x: number, y: number): number {
        const size = Rule.getSize(field);
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return NaN;
        }
        return Rule.xyToIndex(field, x, y);
    }
    private static indexToXy(field: Field, index: number): [number, number] {
        const size = Rule.getSize(field);
        return [index % size, Math.floor(index / size)];
    }

    private static fillOpen(field: Field, index: number): Field {
        const returnField = Rule.Copy(field);
        const queue: number[] = [];
        queue.push(index)
        while (queue.length > 0) {
            const i = queue.pop();
            if (i) {
                returnField.Cells[i].Open = true;
                returnField.Cells[i].Flag = false;
                if (returnField.Cells[i].Count === 0) {
                    Rule.getOpenableAdjacentIndex(returnField, i).forEach((j) => {
                        queue.push(j);
                    })
                }
            }
        }
        return returnField
    }

    private static getOpenableAdjacentIndex(field: Field, index: number): number[] {
        const [x, y] = Rule.indexToXy(field, index);
        return [
            Rule.xyToIndexOrNaN(field, x - 1, y + 0),
            Rule.xyToIndexOrNaN(field, x + 1, y + 0),
            Rule.xyToIndexOrNaN(field, x + 0, y - 1),
            Rule.xyToIndexOrNaN(field, x + 0, y + 1),
        ].filter((i) => {
            return !isNaN(i);
        }).filter((i) => {
            return !field.Cells[i].Bomb &&
                !field.Cells[i].Flag &&
                !field.Cells[i].Open;
        });
    }
}