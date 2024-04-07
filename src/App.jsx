import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/styles/main.scss'

import { Header } from './cmps/Header'
import { WeatherDetails } from './pages/WeatherDetails'
import { FavoritePage } from './pages/FavoritePage'
import { UserMsg } from './cmps/UserMsg'

export function App() {

  return (
    <Provider store={store}>
      <Router>
        <UserMsg />
        <Header />
        <Routes>
          <Route element={<WeatherDetails />} path="/" />
          <Route element={<FavoritePage />} path="/favorite" />
        </Routes>
      </Router>
    </Provider>
  )
}

