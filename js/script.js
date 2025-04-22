const date = new Date()

window.onload = () => {
    initTheme()
    getTodayDate()
    document.getElementById('task-description').placeholder = 'Um item por linha'
    checkDeployTime()
    checkCustomProject()
}

function getReport() {
    let report = ""
    document.querySelector("#report-formatted").innerHTML = report
    let squad = document.querySelector("#squad").value
    let date = document.querySelector("#date").value
    let project

    if (document.querySelector("#project").value == 'outro') {
        project = document.querySelector('#project-custom').value
    } else {
        project = document.querySelector("#project").value
    }

    let deployTime

    if (project === 'fm-site-br') {
        deployTime = document.querySelector("#deploy-time").value
    } else {
        deployTime = document.querySelector("#deploy-time-anytime").value
    }

    let feature = document.querySelector("#feature").value
    let taskName = document.querySelector("#task-name").value
    let taskLink = document.querySelector("#task-link").value
    let taskDescription = getListFormat(document.querySelector("#task-description").value)
    let taskArea = document.querySelector("#task-area").value

    report = `
        <b>Time ${squad}</b><br>
        <b><i>Data: ${date}</i></b><br>
        <b>Ambiente: </b>${project}<br>
        <b>Hora: ${deployTime}</b><br>
        <b>Épico: </b>${feature}<br>
        <b>Nome da tarefa e link: </b><a href='${taskLink}'>${taskName}</a><br>
        <hr/>
    `;

    if (taskDescription) {
        report += `
            <b>Descrição: </b>
            <ul>${taskDescription}</ul>
        `;
    }

    if (taskArea) {
        report += `
            <b>Área: </b>${taskArea}<br></br>
        `
    }    

    document.querySelector("#report-formatted").innerHTML = report
    document.querySelector("#report-content").innerHTML = report
}

function visualizeReport() {
    getReport();
    document.querySelector('#form').style.display = "none"
    document.querySelector('#squad-field').style.display = "none"
    document.querySelector('#result').style.display = "block"
}

function copyContent() {
    const range = document.createRange();
    range.selectNode(document.querySelector("#report-content"))
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()

    document.querySelector('#copied-message').classList.add('show')
    setTimeout(()=> {
        document.querySelector('#copied-message').classList.remove('show')
    }, 2000)
}

function getReportAndCopy() {
    getReport()
    copyContent()
}

function checkDeployTime() {
    document.querySelector("#project").addEventListener("input", () => {
        let project = document.querySelector("#project").value
        if (project === "fm-site-br") {
            document.querySelector("#deploy-time-field").classList.remove("invisible")
            document.querySelector("#deploy-time-anytime-field").classList.add("invisible")
        } else {
            document.querySelector("#deploy-time-field").classList.add("invisible")
            document.querySelector("#deploy-time-anytime-field").classList.remove("invisible")

            if (project === "outro") {
                document.querySelector("#project-custom-field").classList.remove("invisible")
            } else {
                document.querySelector("#project-custom-field").classList.add("invisible")
            }
        }
    })
}

/* Theme */
function initTheme() {
    const theme = localStorage.getItem('selected-theme')
    setTheme(theme !== null ? theme : 'theme-light')
}

function setTheme(theme) {
    localStorage.setItem('selected-theme', theme);
    document.body.classList = theme
    document.querySelector('#theme').src = `./icons/${theme}.svg`
}


/* Toggles */
function toggleTheme() {
    const theme = localStorage.getItem('selected-theme')
    if (!theme) initTheme()
    if (theme === 'theme-light') setTheme('theme-dark')
    if (theme === 'theme-dark') setTheme('theme-light')
}

function backToReport() {
    document.querySelector('#squad-field').style.display = "flex"
    document.querySelector('#form').style.display = "grid"
    document.querySelector('#result').style.display = "none"
}

/* Formats */
function getTodayDate() {
    let temp =  date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear()
    document.querySelector('#date').value = temp
}

function getListFormat(text) {
    var lines = text.split('\n')
    return lines.filter(line => line.trim() !== '').map(line => `<li>${line}</li>`).join('')
}