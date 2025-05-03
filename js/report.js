const date = new Date()

window.onload = () => {
    initTheme()
    getSquad()
    getTodayDate()
    initSquad()
    checkCustomizations()
    setSettingsValue()
}


/* Report */
function getReport() {
    let report = ""
    document.querySelector("#report-formatted").innerHTML = report
    let squad = document.querySelector("#squad").value
    let date = document.querySelector("#date").value

    let project = document.querySelector("#project").value
    let customProject = document.querySelector("#custom-projects")
    if (customProject.value) {
        project = customProject.value
    }

    let deployTime = document.querySelector("#deploy-anytime").value
    let presetHours = document.querySelector("#preset-hours")
    if (presetHours.value) {
        deployTime = presetHours.value
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
    showMessage('Copiado!')
}

function getReportAndCopy() {
    getReport()
    copyContent()
}

function backToReport() {
    document.querySelector('#squad-field').style.display = "flex"
    document.querySelector('#form').style.display = "grid"
    document.querySelector('#result').style.display = "none"
}

/* Squad */
function saveSquad() {
    let squad = document.querySelector("#squad").value
    localStorage.setItem('squad', squad)
    document.querySelector("#button-save").classList.add("invisible")
    showMessage("Salvo!")
}

function getSquad() {
    const squad = localStorage.getItem('squad')
    document.querySelector("#squad").value = squad
}

function initSquad() {
    document.querySelector("#squad").addEventListener("focus", () => {
        document.querySelector("#button-save").classList.remove("invisible")
    })
    document.querySelector("#squad").addEventListener("blur", () => {
        let saved = localStorage.getItem('squad')
        let inputValue = document.querySelector("#squad").value
        if (saved == inputValue) document.querySelector("#button-save").classList.add("invisible")
    })
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

/* Customization report */
function checkCustomizations() {
    const customHours = localStorage.getItem('hours')
    if (customHours) {    
        setCustomField("#deploy-anytime", "#preset-hours", JSON.parse(customHours))
    }

    const customProjects = localStorage.getItem('projects')
    if (customProjects) {
        setCustomField("#project", "#custom-projects", JSON.parse(customProjects))
    }
}

/* Erase all fields */
function resetFields() {
    document.querySelector("#report-formatted").innerHTML = ""
    document.querySelector("#project").value = ""
    document.querySelector("#custom-projects").value = ""
    document.querySelector("#deploy-anytime").value = ""
    document.querySelector("#preset-hours").value = ""
    document.querySelector("#feature").value = ""
    document.querySelector("#task-name").value = ""
    document.querySelector("#task-link").value = ""
    document.querySelector("#task-description").value = ""
    document.querySelector("#task-area").value = ""
    showMessage("Campos limpos!")
}