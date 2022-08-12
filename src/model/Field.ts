import { Cell } from "./State"

export type Field = {
    Cells: Cell[]
    isGameOver: boolean
    isComplete: boolean
}