import { Field } from "../model/Field"
import "./BarElement.css"

type Props = {
    field: Field
    clickReset: () => void
    toggleAssistant: () => void
    cellSize: number
}
export default function BarElement(props: Props) {
    const cellSize = props.cellSize
    const face = () => {
        if (props.field.IsComplete()) {
            return "😎"
        }
        if (props.field.IsGameOver()) {
            return "🥺"
        }
        return "😀"
    }

    return (
        <div>
            <div className="title_bar" ><div className="title"> Minesweeper </div><div className="button help center" onClick={() => props.toggleAssistant()}>?</div></div>
            <div
                style={
                    {
                        width: props.field.Size() * cellSize,
                    }
                }
                className="bar"
            >
                <div className='item num' ><b>{props.field.BombCount()}</b></div>
                <div className='item center' ><div className="button" onClick={() => { props.clickReset() }}>{face()}</div></div>
                <div className='item num' ><b>0</b></div>
            </div >
        </div>

    )
}