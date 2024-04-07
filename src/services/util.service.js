

export const utilService = {
    makeId,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    debounce,
    getDayOfWeek,
    celsiusToFahrenheit,
    getDegrees,
    getBlessingByTime
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function getDayOfWeek(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date(dateString)
    return days[date.getDay()]
}


function celsiusToFahrenheit(degCelsius) {
    return Math.trunc((degCelsius * 9 / 5) + 32)
}

function getDegrees(isCelsius, day) {
    const minDegInC = day.Temperature.Minimum.Value
    const maxDegInC = day.Temperature.Maximum.Value
    if (isCelsius) {
        return Math.trunc(minDegInC) + '°C' + ' - ' + Math.trunc(maxDegInC) + '°C'
    } else {
        return Math.trunc(celsiusToFahrenheit(minDegInC)) + '°F' + ' - ' + Math.trunc(celsiusToFahrenheit(maxDegInC)) + '°F'
    }
}

export function getBlessingByTime() {
	const date = new Date()
	const currentHour = date.getHours()

	if (currentHour >= 5 && currentHour < 12) {
		return 'Good morning!'
	} else if (currentHour >= 12 && currentHour < 18) {
		return 'Good afternoon!'
	} else if (currentHour >= 18 && currentHour < 21) {
		return 'Good evening!'
	} else {
		return 'Good night!'
	}
}