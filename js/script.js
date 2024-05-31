const date = new Date();

window.onload = () => {
    initTheme();
    getTodayDate();
    document.getElementById('task-description').placeholder = 'Um item por linha'

    document.addEventListener('click', e => {
        if (e.target.id !== 'palette' && !e.target.classList.contains('theme-choice') 
            && document.querySelector('#themes').classList.contains('show')) togglePalette();
    })
}

function getReport() {
    let squad = document.querySelector("#squad").value;
    let date = document.querySelector("#date").value;
    let project = document.querySelector("#project").value;
    let deployTimeInitial = document.querySelector("#deploy-time-initial").value;
    let deployTimeFinal = document.querySelector("#deploy-time-final").value;
    let feature = document.querySelector("#feature").value;
    let taskName = document.querySelector("#task-name").value;
    let taskLink = document.querySelector("#task-link").value;
    let taskDescription = getListFormat(document.querySelector("#task-description").value);
    let taskArea = document.querySelector("#task-area").value;

    let report = `
        <b>${squad}</b><br>
        <b><i>Data: ${date}</i></b><br>
        <b>Ambiente: </b>${project}<br>
        <b>Hora: ${deployTimeInitial} - ${deployTimeFinal}</b><br>
        <b>Iniciativa: </b>${feature}<br>
        <b>Nome da tarefa e link: </b><a href='${taskLink}'>${taskName}</a><br>
        <b>Descrição: </b><br>
        <ul>${taskDescription}</ul><br>
        <b>Área: </b>${taskArea}<br>
    `;

    document.querySelector("#report-formatted").innerHTML = report;

    document.querySelector('#form').style.display = "none";
    
    document.querySelector('#result').style.display = "block";
}

function copyContent() {
    const range = document.createRange();
    range.selectNode(document.querySelector("#report-formatted"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    document.querySelector('#copied-message').classList.add('show');
    setTimeout(()=> {
        document.querySelector('#copied-message').classList.remove('show');
    }, 2000);
}

/* Theme */
function initTheme() {
    const theme = localStorage.getItem('theme')
    setTheme(theme !== null ? theme : 'theme-dark-default');
}

function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.classList = theme;
}


/* Toggles */
function togglePalette() {
    document.querySelector('#themes').classList.toggle('show');
}

function backToReport() {
    document.querySelector('#form').style.display = "grid";
    document.querySelector('#result').style.display = "none";
}

/* Formats */
function getTodayDate() {
    let temp =  date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear();
    document.querySelector('#date').value = temp;
}

function getListFormat(text) {
    var lines = text.split('\n');
    return lines.filter(line => line.trim() !== '').map(line => `<li>${line}</li>`).join('');
}