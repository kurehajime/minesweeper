import { Cell } from "../model/State"

type Props = {
    cell: Cell
    cellSize: number
    x: number
    y: number
}
export default function CellElement(props: Props) {
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
            <rect x={props.x} y={props.y} width={props.cellSize} height={props.cellSize} stroke="black" fill={props.cell.Open ? "white" : "lightgray"} />
            <text
                x={props.x + props.cellSize / 2} y={props.y + props.cellSize / 2}
                textAnchor="middle" dominantBaseline="central" stroke="black">{
                    mark()
                }</text>
        </g>)
}