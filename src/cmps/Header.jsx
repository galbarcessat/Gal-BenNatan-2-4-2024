import { useNavigate } from "react-router-dom"
import { FormControlLabel, Switch } from "@mui/material"
import { setCurrPage, setFavoriteCity, toggleDegreeType } from "../store/actions/weather.action"
import { useSelector } from "react-redux"
import { MaterialUISwitch } from "./MaterialUISwitch"
import { showSuccessMsg } from "../services/event-bus.service"
import AbraLogo from '../assets/imgs/AbraLogo.png'
import { MenuToggle } from "./MenuToggle"
import { useState } from "react"

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const currPage = useSelector(state => state.weatherModule.currPage)
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)
    const navigate = useNavigate()

    function changePage(page) {
        setCurrPage(page)
        setIsMenuOpen(false)
        if (page === 'home') {
            setFavoriteCity(null)
            navigate('/')
        } else {
            navigate(`/${page}`)
        }
    }

    function checkIsActive(page) {
        return page === currPage
    }

    function changeDegreeType() {
        const newDegType = toggleDegreeType() ? 'celcius' : 'farenheit'
        showSuccessMsg(`Changed degree type to ${newDegType}`)
    }

    function toggleDarkLightMode() {
        const body = document.body
        body.classList.toggle('light')
    }

    function ToggleMenu(isChecked) {
        isChecked ? setIsMenuOpen(true) : setIsMenuOpen(false)
    }

    return (
        <header className="header-container">
            <img
                onClick={() => changePage('home')}
                src={AbraLogo}
                alt="Abra" />
            <div className={"btns-container " + (isMenuOpen ? 'open' : '')}>
                <div className={'nav-link ' + (checkIsActive('home') ? 'active' : '')} onClick={() => changePage('home')}>Home</div>
                <div className={'nav-link ' + (checkIsActive('favorite') ? 'active' : '')} onClick={() => changePage('favorite')}>Favorites</div>

                <div className="btn-toggle-deg-type">
                    <span>C</span>
                    <Switch
                        checked={!isCelsius}
                        onChange={() => changeDegreeType()}
                        sx={{
                            '& .Mui-checked': {
                                color: '#001E3C', // Color when the switch is checked
                            },
                            '& .MuiSwitch-thumb': {
                                backgroundColor: '#001E3C', // Thumb color
                            },
                            '& .MuiSwitch-track': {
                                backgroundColor: '#001E3C', // Track color
                            }
                        }} />
                    <span>F</span>
                </div>

                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                    onChange={() => toggleDarkLightMode()}

                />

            </div>

            <MenuToggle isMenuOpen={isMenuOpen} ToggleMenu={ToggleMenu}/>
        </header>
    )
}
