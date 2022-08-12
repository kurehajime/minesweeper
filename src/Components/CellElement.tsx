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
            <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke="black" fill='whitesmoke' />
            <text x={props.x + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="black">{mark()}</text>
            <g display={props.cell.Open ? 'none' : 'block'}>
                <rect x={props.x} y={props.y} width={cellSize} height={cellSize} stroke="black" fill='lightgray' />
                <line x1={props.x + 0} y1={props.y + 0} x2={props.x + cellSize} y2={props.y + 0} stroke="white" stroke-width="3" />
                <line x1={props.x + cellSize - 3} y1={props.y + 0} x2={props.x + cellSize - 3} y2={props.y + cellSize} stroke="gray" stroke-width="3" />
                <line x1={props.x + cellSize - 3} y1={props.y + cellSize - 3} x2={props.x + 0} y2={props.y + cellSize - 3} stroke="gray" stroke-width="3" />
                <line x1={props.x + 0} y1={props.y + cellSize} x2={props.x + 0} y2={props.y + 0} stroke="white" stroke-width="3" />
            </g>

            <text display={props.cell.Flag ? 'block' : 'none'}
                x={props.x + cellSize / 2} y={props.y + cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="black">🚩</text>
        </g>)
}