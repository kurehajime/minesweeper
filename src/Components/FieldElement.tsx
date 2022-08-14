import { BUTTON_TYPE } from "../model/ButtonType"
import { Field } from "../model/Field"
import CellElement from "./CellElement"
import "./FieldElement.css"

type Props = {
    field: Field
    clicked: (index: number, button_type: BUTTON_TYPE) => void
    cellSize: number
    index: number
    selected: boolean
}
export default function FieldElement(props: Props) {
    const cellSize = props.cellSize
    const FieldSize = props.field.Size() * cellSize
    const mouseClick = (e: React.PointerEvent<SVGSVGElement>) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
        if (isTouch) {
            clicked(x, y, "menu")
        } else {
            clicked(x, y, e.button === 0 ? "open" : "flag")
        }
        e.preventDefault()
    }

    const contextMenu = (e: React.MouseEvent) => {
        const x = e.nativeEvent.offsetX
        const y = e.nativeEvent.offsetY
        clicked(x, y, "flag")
        e.preventDefault()
        return false
    }

    const clicked = (x: number, y: number, button_type: BUTTON_TYPE) => {
        const index = Math.floor(x / cellSize) + Math.floor(y / cellSize) * props.field.Size()
        props.clicked(index, button_type)
    }

    return (<svg width={FieldSize} height={FieldSize} onClick={mouseClick} onContextMenu={contextMenu} >
        {props.field.Cells.map((cell, index) => {
            const x = index % props.field.Size() * cellSize
            const y = Math.floor(index / props.field.Size()) * cellSize
            return <CellElement
                key={index}
                cell={cell}
                x={x}
                y={y}
                cellSize={cellSize}
                selected={props.selected && props.index === index}
            />
        })
        }
    </svg>)
}