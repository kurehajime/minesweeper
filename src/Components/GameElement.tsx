import { useState } from "react"
import { BUTTON_TYPE } from "../model/ButtonType"
import { Field } from "../model/Field"
import FieldElement from "./FieldElement"

export default function GameElement() {
    const [field, setField] = useState<Field>(Field.GetRandomField(10, 10))
    return (<FieldElement
        field={field} clicked={function (index: number, button_type: BUTTON_TYPE): void {
            if (button_type === 'open') {
                setField(field.Open(index))
            } else {
                setField(field.ToggleFlag(index))
            }
        }} />)
}