import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AbraLogo from '../assets/imgs/AbraLogo.png'

export function Header() {
    const [currPage, setCurrPage] = useState('home')
    const navigate = useNavigate()

    function changePage(page) {
        if (page === 'home') {
            navigate('/')
        } else {
            navigate(`/${page}`)
        }
        setCurrPage(page)
    }

    function checkIsActive(page) {
        return page === currPage
    }

    return (
        <header className="header-container">
            <img
                onClick={() => navigate('/')}
                src={AbraLogo}
                alt="Abra" />
            <div className="nav-links-container">
                <span className={checkIsActive('home') ? 'active' : ''} onClick={() => changePage('home')}>Home</span>
                <span className={checkIsActive('favorite') ? 'active' : ''} onClick={() => changePage('favorite')}>Favorites</span>
            </div>
        </header>
    )
}
