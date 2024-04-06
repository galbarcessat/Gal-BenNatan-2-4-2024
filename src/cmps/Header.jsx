import { useNavigate } from "react-router-dom"
import { FormControlLabel, Switch } from "@mui/material"
import { setCurrPage, setFavoriteCity, toggleDegreeType } from "../store/actions/weather.action"
import { useSelector } from "react-redux"
import { MaterialUISwitch } from "./MaterialUISwitch"
import AbraLogo from '../assets/imgs/AbraLogo.png'

export function Header() {
    const currPage = useSelector(state => state.weatherModule.currPage)
    const isCelsius = useSelector(state => state.weatherModule.isCelsius)
    const navigate = useNavigate()

    function changePage(page) {
        setCurrPage(page)
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

    return (
        <header className="header-container">
            <img
                onClick={() => changePage('home')}
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

                <FormControlLabel
                    control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                />

            </div>
        </header>
    )
}
