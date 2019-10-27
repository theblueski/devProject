function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export function formatDate (cellValue) {
  if (!cellValue) return
  cellValue = cellValue instanceof Date ? cellValue : new Date(cellValue)
  const year = cellValue.getFullYear()
  const month = padLeftZero(cellValue.getMonth() + 1 + '')
  const date = padLeftZero(cellValue.getDate() + '')
  return `${year}-${month}-${date}`
}
