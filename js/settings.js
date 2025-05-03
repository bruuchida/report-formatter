function saveSettings() {
  let presetHours = document.querySelector("#preset-hours-settings").value
  let customProjects = document.querySelector("#custom-projects-settings").value

  localStorage.setItem('hours', presetHours)
  localStorage.setItem('projects', customProjects)
  showMessage('Configurações salvas!')
}