function saveSettings() {
  let presetHours = getFieldValue("#preset-hours-settings")
  let customProjects = getFieldValue("#custom-projects-settings")

  if (presetHours) {
    let hoursFormatted = presetHours.split(",")
    localStorage.setItem('hours', JSON.stringify(hoursFormatted))
    setCustomField("#deploy-anytime", "#preset-hours", hoursFormatted)
    document.querySelector("#dynamic-hours-field").classList.remove('invisible')
    document.querySelector("#is-preset").checked = true
  }

  if (customProjects) {
    let projectsFormatted = customProjects.split(",")
    localStorage.setItem('projects', JSON.stringify(projectsFormatted))
    setCustomField("#project", "#custom-projects", projectsFormatted)
  }
    
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
  field.innerHTML = ""

  for (i=0; i < newValues.length; i++) {
    var option = document.createElement("option")
    option.text = newValues[i]
    field.add(option)
  }
}

function resetSettings() {
  localStorage.removeItem('hours')
  localStorage.removeItem('projects')

  setEmptyValue("#preset-hours-settings")
  setEmptyValue("#custom-projects-settings")
  document.querySelector("#dynamic-hours-field").classList.add('invisible')

  document.querySelector("#deploy-anytime").classList.remove('invisible')
  setEmptyValue("#deploy-anytime")

  document.querySelector("#preset-hours").classList.add('invisible')
  setEmptyValue("#preset-hours")

  document.querySelector("#project").classList.remove('invisible')
  setEmptyValue("#project")

  document.querySelector("#custom-projects").classList.add('invisible')
  setEmptyValue("#custom-projects")

  showMessage('Configurações excluídas!')
}

function setSettingsValue () {
  const hours = localStorage.getItem('hours')
  const projects = localStorage.getItem('projects')

  if (hours) {
    document.querySelector('#preset-hours-settings').textContent = stringifyArrayValue(hours)
    document.querySelector('#is-preset').checked = true
  }

  if (projects) {
    document.querySelector('#custom-projects-settings').textContent = stringifyArrayValue(projects)
  }
}
