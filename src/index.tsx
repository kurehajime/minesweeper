import ReactDOM from 'react-dom/client'
import GameElement from './Components/GameElement'
import './index.css'
import './i18n/configs'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<div className='container'>
    <GameElement />
</div>)