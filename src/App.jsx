import './App.css'
import './index.css'
import Search from './components/Search.jsx'
import Meals from './components/Meals.jsx'
import Modal from './components/Modal.jsx'
import Favorites from './components/Favorites.jsx'
import {useGlobalContext} from './context.jsx'

export default function App() {
    const {modal,favorites} = useGlobalContext();
    return (
        <main className="relative">
            { modal && <Modal/>}
            <Search/>
            {favorites.length > 0 && <Favorites />}
            <Meals />
        </main>
    )
}
