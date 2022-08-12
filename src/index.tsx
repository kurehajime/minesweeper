import ReactDOM from 'react-dom/client'
import GameElement from './Components/GameElement'
import './index.css'
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(<GameElement />)