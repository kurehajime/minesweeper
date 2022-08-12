import { Cell } from "../model/State"
import Params from "../params"
import "./CellElement.css"

type Props = {
    cell: Cell
    x: number
    y: number
}
export default function CellElement(props: Props) {
    const cellSize = Params.cellSize
    const mark = (): string => {
        if (props.cell.Flag) {
            return '🚩'
        }
        if (!props.cell.Open) {
            return ''
        }
        if (props.cell.Bomb) {
            return '💣'
        }
        if (props.cell.Count === 0) {
            return ''
        }

        return props.cell.Count.toString()
    }
    return (
        <g>
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke="black" fill={props.cell.Open ? "whitesmoke" : "lightgray"} />
            <text 
                x={props.x + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="black">{
                    mark()
                }</text>
        </g>)
}