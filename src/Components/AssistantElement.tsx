import dolphin from '../assets/dolphin.png';
import clip from '../assets/clip.png';
import './AssistantElement.css'
import { useTranslation } from 'react-i18next'
type Props = {
    show: boolean
    setLevel: (level: number) => void
}

export default function AssistantElement(props: Props) {
    const { t } = useTranslation()

    const lang = (navigator.language).toLowerCase().includes("ja") ? "ja" : "en";
    return (
        props.show ?
            <div className='assistant zoomIn' >
                <div className="balloon"><p>
                    <p><b>{t('can_i_help_you')}</b></p>
                    <ul>
                        <li onClick={() => props.setLevel(1)}>{t('level_1')}</li>
                        <li onClick={() => props.setLevel(2)}>{t('level_2')}</li>
                        <li onClick={() => props.setLevel(3)}>{t('level_3')}</li>
                        {lang ? <li onClick={() => props.setLevel(99)}>{t('level_99')}</li> : <></>}
                    </ul>
                </p></div>
                <div className='horn'>▼</div>
                <img src={lang == 'ja' ? dolphin : clip} alt="assistant" />
            </div > : <></>)
}