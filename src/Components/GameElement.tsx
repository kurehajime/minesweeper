import { useState } from "react"
import { BUTTON_TYPE } from "../model/ButtonType"
import { Field } from "../model/Field"
import AssistantElement from "./AssistantElement"
import BarElement from "./BarElement"
import FieldElement from "./FieldElement"
import { useTimer } from 'use-timer'
import CreditElement from "./CreditElement"
import useSound from 'use-sound';
import boopSfx from '../assets/Tada-sound.mp3';

export default function GameElement() {
    const [field, setField] = useState<Field>(Field.GetRandomField(10, 10))
    const [showAssistant, setShowAssistant] = useState<boolean>(false)
    const [level, setLevel] = useState<number>(1)
    const { time: scoreTime, start: startScore, pause: pauseScore, reset: resetScore } = useTimer({ endTime: 999 })
    const [play] = useSound(boopSfx, {
        playbackRate: 1.5
    });

    const cellSize = level === 1 ? 50 : 25;
    const newGame = (level: number) => {
        resetScore()
        switch (level) {
            case 1:
                setField(Field.GetRandomField(10, 10))
                break;
            case 2:
                setField(Field.GetRandomField(20, 50))
                break;
            case 3:
                setField(Field.GetRandomField(20, 80))
                break;
            case 99:
                setField(Field.GetRandomField(20, 399))
                break;
        }
    }

    return (<>
        <div>
            <BarElement
                field={field}
                clickReset={() => { newGame(level) }}
                toggleAssistant={() => { setShowAssistant(!showAssistant) }}
                cellSize={cellSize}
                time={scoreTime}
            />
            <FieldElement
                field={field} clicked={function (index: number, button_type: BUTTON_TYPE): void {
                    if (!field.IsGameOver() && !field.IsComplete()) {
                        if (button_type === 'open') {
                            if (field.OpenCount() === 0) {
                                startScore()
                            }
                            const newField = field.Open(index)
                            setField(newField)
                            if (newField.IsGameOver() || newField.IsComplete()) {
                                pauseScore()
                                if (newField.IsComplete()) {
                                    play()
                                }
                            }
                        } else {
                            setField(field.ToggleFlag(index))
                        }
                    }
                }}
                cellSize={cellSize}
            />
            <CreditElement />
            <AssistantElement
                show={showAssistant}
                setLevel={(level: number) => {
                    setLevel(level)
                    newGame(level)
                    setShowAssistant(false)
                }}
            ></AssistantElement>
        </div>
    </>)
}