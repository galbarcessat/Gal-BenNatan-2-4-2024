import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FormControlLabel, Switch } from "@mui/material"
import { toggleDegreeType } from "../store/actions/weather.action"
import { useSelector } from "react-redux"
import { MaterialUISwitch } from "./MaterialUISwitch"
import AbraLogo from '../assets/imgs/AbraLogo.png'

export function Header() {
    const [currPage, setCurrPage] = useState('home')
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)
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
            <div className="btns-container">
                <div className={'nav-link ' + (checkIsActive('home') ? 'active' : '')} onClick={() => changePage('home')}>Home</div>
                <div className={'nav-link ' + (checkIsActive('favorite') ? 'active' : '')} onClick={() => changePage('favorite')}>Favorites</div>

                <div className="btn-toggle-deg-type">
                    <span>C</span>
                    <Switch
                        checked={!isCelsius}
                        onChange={() => toggleDegreeType()}
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

                {/* <span
                    onClick={() => {
                        () => toggleDegreeType()}}
                    className="btn-toggle-deg-type">
                    {isCelsius ? 'C' : 'F'}
                </span> */}

                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                />

            </div>
        </header>
    )
}
