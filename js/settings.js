function saveSettings() {
  let presetHours = document.querySelector("#preset-hours-settings").value
  let customProjects = document.querySelector("#custom-projects-settings").value

  if (presetHours) {
    let hoursFormatted = presetHours.split(",")
    localStorage.setItem('hours', JSON.stringify(hoursFormatted))
    setCustomField("#deploy-anytime", "#preset-hours", hoursFormatted)
  }

  if (customProjects) {
    let projectsFormatted = customProjects.split(",")
    localStorage.setItem('projects', JSON.stringify(projectsFormatted))
    setCustomField("#project", "#custom-projects", projectsFormatted)
  }
  
  resetFields()
  showMessage('Configurações salvas!')
}

function setCustomField(oldIdField, newIdField, newValues) {
  document.querySelector(oldIdField).classList.add('invisible')
  document.querySelector(newIdField).classList.remove('invisible')
  document.querySelector(oldIdField).value = ""

  updateField(newIdField, newValues)
}


function updateField(fieldId, newValues) {
  let field = document.querySelector(fieldId)
  field.innerHTML = ''

  for (i=0; i < newValues.length; i++) {
    var option = document.createElement("option")
    option.text = newValues[i]
    field.add(option)
  }
}

function resetSettings() {
  document.querySelector("#preset-hours-settings").value = ""
  document.querySelector("#custom-projects-settings").value = ""
  localStorage.removeItem('hours')
  localStorage.removeItem('projects')
  document.querySelector("#deploy-anytime").classList.remove('invisible')
  document.querySelector("#deploy-anytime").value = ""
  document.querySelector("#preset-hours").classList.add('invisible')
  document.querySelector("#preset-hours").value = ""
  document.querySelector("#project").classList.remove('invisible')
  document.querySelector("#project").value = ""
  document.querySelector("#custom-projects").classList.add('invisible')
  document.querySelector("#custom-projects").value = ""
  showMessage('Configurações excluídas!')
}

function setSettingsValue () {
  const hours = localStorage.getItem('hours')
  const projects = localStorage.getItem('projects')

  if (hours) {
    const hoursFormatted = hours.replaceAll('"', '').replace('[', '').replace(']', '')
    document.querySelector('#preset-hours-settings').textContent = hoursFormatted
  }

  if (projects) {
    const projectsFormatted = projects.replaceAll('"', '').replace('[', '').replace(']', '')
    document.querySelector('#custom-projects-settings').textContent = projectsFormatted
  }
}