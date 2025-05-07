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
    let squad = getFieldValue("#squad")
    let date = getFieldValue("#date")

    let project = getFieldValue("#project")
    let customProject = getFieldValue("#custom-projects")
    if (customProject) {
        project = customProject
    }

    let deployTime = getFieldValue("#deploy-anytime")
    
    let isPresetHours = document.querySelector("#is-preset").checked
    let presetHours = getFieldValue("#preset-hours")

    let hours = deployTime

    if (isPresetHours) hours = presetHours

    let feature = getFieldValue("#feature")
    let taskName = getFieldValue("#task-name")
    let taskLink = getFieldValue("#task-link")
    let taskDescription = getListFormat(getFieldValue("#task-description"))
    let taskArea = getFieldValue("#task-area")

    report = `
        <b>Time ${squad}</b><br>
        <b><i>Data: ${date}</i></b><br>
        <b>Ambiente: </b>${project}<br>
        <b>Hora: ${hours}</b><br>
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
    getReport()
    document.querySelector('#form').style.display = "none"
    document.querySelector('#squad-field').style.display = "none"
    document.querySelector('#result').classList.remove('invisible')
}

function copyContent() {
    const range = document.createRange()
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
    document.querySelector('#result').classList.add('invisible')
}

function toggleHoursFields() {
    const preset = document.querySelector('#preset-hours').classList
    const dynamic = document.querySelector('#deploy-anytime').classList
    if (preset.contains('invisible')) {
        preset.remove('invisible')
        dynamic.add('invisible')
        document.querySelector("#is-preset").checked = true
    } else {
        preset.add('invisible')
        dynamic.remove('invisible')
        document.querySelector("#is-preset").checked = false
    }
}

/* Squad */
function saveSquad() {
    let squad = getFieldValue("#squad")
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
        let inputValue = getFieldValue("#squad")
        if (saved == inputValue) document.querySelector("#button-save").classList.add("invisible")
    })
}


/* Customization report */
function checkCustomizations() {
    const customHours = localStorage.getItem('hours')
    if (customHours) {    
        setCustomField("#deploy-anytime", "#preset-hours", JSON.parse(customHours))
        document.querySelector("#is-preset").checked = true
        document.querySelector("#dynamic-hours-field").classList.remove('invisible')
    }

    const customProjects = localStorage.getItem('projects')
    if (customProjects) {
        setCustomField("#project", "#custom-projects", JSON.parse(customProjects))
    }
}

/* Erase all fields */
function resetFields() {
    document.querySelector("#report-formatted").innerHTML = ""
    setEmptyValue("#project")
    setEmptyValue("#custom-projects")
    setEmptyValue("#deploy-anytime")
    document.querySelector("#is-preset").checked = false
    setEmptyValue("#preset-hours")
    setEmptyValue("#feature")
    setEmptyValue("#task-name")
    setEmptyValue("#task-link")
    setEmptyValue("#task-description")
    setEmptyValue("#task-area")
    showMessage("Campos limpos!")
}