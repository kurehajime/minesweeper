import imgUrl from '../assets/dolphin.png';
import './AssistantElement.css'
type Props = {
    show: boolean
    setLevel: (level: number) => void
}

export default function AssistantElement(props: Props) {
    return (
        props.show ?
            <div className='assistant' >
                <div className="balloon"><p>
                    <p><b>何かお困りですか？</b></p>
                    <ul>
                        <li onClick={() => props.setLevel(1)}>標準難易度で遊びたい</li>
                        <li onClick={() => props.setLevel(2)}>高難易度で遊びたい</li>
                        <li onClick={() => props.setLevel(99)}>お前を消す方法</li>
                    </ul>
                </p></div>
                <div className='horn'>▼</div>
                <img src={imgUrl} alt="assistant" />
            </div > : <></>)
}