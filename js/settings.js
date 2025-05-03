function saveSettings() {
  let presetHours = document.querySelector("#preset-hours-settings").value
  let customProjects = document.querySelector("#custom-projects-settings").value

  if (presetHours) {
    let hoursFormatted = presetHours.split(";")
    localStorage.setItem('hours', JSON.stringify(hoursFormatted))
    setCustomField("#deploy-time-anytime", "#preset-hours", hoursFormatted)
  }

  if (customProjects) {
    let projectsFormatted = customProjects.split(";")
    localStorage.setItem('projects', JSON.stringify(projectsFormatted))
    setCustomField("#projects", "#custom-projects", projectsFormatted)
  }

  showMessage('Configurações salvas!')
}

function setCustomField(oldIdField, newIdField, newValues) {
  document.querySelector(oldIdField).classList.add('invisible')
  document.querySelector(newIdField).classList.remove('invisible')

  updateField(newIdField, newValues)
}


function updateField(fieldId, newValues) {
  let field = document.querySelector(fieldId)

  for (i=0; i < newValues.length; i++) {
    var option = document.createElement("option")
    option.text = newValues[i]
    field.add(option)
  }
}