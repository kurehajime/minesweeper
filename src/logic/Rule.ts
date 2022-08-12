import { Field } from "../model/Field";

export class Rule {

    public static Copy(field: Field): Field {
        return {
            Opens: [...field.Opens],
            Flags: [...field.Flags],
            Boms: [...field.Boms],
            Counts: [...field.Counts],
            isGameOver: field.isGameOver,
            isComplete: field.isComplete,
        }
    }

    public static Open(field: Field, index: number): Field {
        let returnField = Rule.Copy(field);
        if (returnField.Boms[index]) {
            returnField.isGameOver = true;
            returnField.Boms.forEach((isBomb, i) => {
                if (isBomb) {
                    returnField.Opens[i] = true;
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
        returnField.Flags[index] = true;
        return returnField;
    }

    public static RemoveFlag(field: Field, index: number): Field {
        const returnField = Rule.Copy(field);
        returnField.Flags[index] = false;
        return returnField;
    }

    private static isComplete(field: Field): boolean {
        for (let i = 0; i < field.Boms.length; i++) {
            if (!field.Boms[i] && !field.Opens[i]) {
                return false;
            }
        }
        return true
    }

    private static getSize(field: Field): number {
        return Math.sqrt(field.Opens.length);
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
                returnField.Opens[i] = true;
                if (returnField.Counts[i] === 0) {
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
            return !field.Boms[i] &&
                !field.Flags[i] &&
                !field.Opens[i];
        });
    }
}