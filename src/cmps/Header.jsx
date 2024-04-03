import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AbraLogo from '../assets/imgs/AbraLogo.png'
import { Switch } from "@mui/material"

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
                <div className={checkIsActive('home') ? 'active' : ''} onClick={() => changePage('home')}>Home</div>
                <div className={checkIsActive('favorite') ? 'active' : ''} onClick={() => changePage('favorite')}>Favorites</div>
                {/* <span
                    onClick={() => {
                        setIsCelsius(prevIsC => !prevIsC)
                    }}
                    className="btn-toggle-deg-type">
                    {isCelsius ? 'C' : 'F'}
                </span> */}
                <Switch
                    // checked={checked}
                    // onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />

            </div>
        </header>
    )
}
