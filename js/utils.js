function getFieldValue(fieldId) {
 return document.querySelector(fieldId).value
}

function stringifyArrayValue(value) {
  return value.replaceAll('"', '').replace('[', '').replace(']', '')
}

function setEmptyValue(fieldId) {
  document.querySelector(fieldId).value = ""
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