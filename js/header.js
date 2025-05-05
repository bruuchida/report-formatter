/* Dropdown */
function toggleDropdown() {
    let dropdown = document.querySelector("#dropdown").classList
    let arrow = document.querySelector("#dropdown-arrow").classList
    let status = dropdown.contains("invisible")
    if (status) {
        dropdown.remove("invisible")
        arrow.add("upwards")
    } else {
        dropdown.add("invisible")
        arrow.remove("upwards")
    }
}

function resetDropdown() {
    document.querySelector("#dropdown").classList.add('invisible')
    document.querySelector("#dropdown-arrow").classList.remove('upwards')
}


/* Message Popup */
function showMessage(message) {
    document.querySelector('#message').textContent = message
    document.querySelector('#message').classList.add('show')
    setTimeout(()=> {
        document.querySelector('#message').classList.remove('show')
    }, 2000)
}

/* Theme */
function initTheme() {
    const theme = localStorage.getItem('selected-theme')
    if (theme !== null) {
        document.body.classList = theme
        document.querySelector('#theme').src = `./icons/${theme}.svg`
    }
}

function setTheme(theme) {
    localStorage.setItem('selected-theme', theme)
    document.body.classList = theme
    document.querySelector('#theme').src = `./icons/${theme}.svg`
}

function toggleTheme() {
    const theme = localStorage.getItem('selected-theme')
    if (!theme) initTheme()
    if (theme === 'theme-light') setTheme('theme-dark')
    if (theme === 'theme-dark') setTheme('theme-light')
}


/* Show configurations */
function showConfigurations() {
    document.querySelector("#report-form").classList.add('invisible')
    document.querySelector("#settings-form").classList.remove('invisible')

    document.querySelector("#report-option").classList.remove('invisible')
    document.querySelector("#settings-option").classList.add('invisible')
    document.querySelector("#about-option").classList.remove('invisible')

    document.querySelector("#about").classList.add('invisible')
    resetDropdown()
}

/* Show configurations */
function showReport() {
    document.querySelector("#report-form").classList.remove('invisible')
    document.querySelector("#settings-form").classList.add('invisible')

    document.querySelector("#report-option").classList.add('invisible')
    document.querySelector("#settings-option").classList.remove('invisible')
    document.querySelector("#about-option").classList.remove('invisible')

    document.querySelector("#about").classList.add("invisible")
    resetDropdown()
}

/* Show about */
function showAbout() {
    document.querySelector("#report-form").classList.add("invisible")
    document.querySelector("#settings-form").classList.add("invisible")
    document.querySelector("#about").classList.remove("invisible")
    
    document.querySelector("#about-option").classList.add('invisible')
    document.querySelector("#report-option").classList.remove('invisible')
    document.querySelector("#settings-option").classList.remove('invisible')
    resetDropdown()
}
