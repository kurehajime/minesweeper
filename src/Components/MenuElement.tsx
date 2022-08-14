import { BUTTON_TYPE } from "../model/ButtonType"
import './MenuElement.css'
type Props = {
    show: boolean
    x: number
    y: number
    index: number
    clicked: (index: number, button_type: BUTTON_TYPE) => void
}
export default function MenuElement(props: Props) {
    return (
        props.show ? <svg className="menu">
            <g>
                <rect x="0" y="0" width={550} height={550} fill="white" fillOpacity="0"
                    onClick={() => props.clicked(props.index, "menu")} />
                <circle cx={props.x + 75} cy={props.y + 25} r="25" stroke="black" fill="white"
                    onClick={() => props.clicked(props.index, "flag")} />
                <text x={props.x + 75} y={props.y + 25}
                    textAnchor="middle" dominantBaseline="central" stroke="black"
                    onClick={() => props.clicked(props.index, "flag")} >🚩</text>
                <circle cx={props.x + 75} cy={props.y + 75} r="25" stroke="black" fill="white"
                    onClick={() => props.clicked(props.index, "open")} />
                <text x={props.x + 75} y={props.y + 75}
                    textAnchor="middle" dominantBaseline="central" stroke="black"
                    onClick={() => props.clicked(props.index, "open")}>⛏</text>
            </g>
        </svg >
            : <></>)
}