export const isNumber = (param: any) => {
  return !isNaN(parseFloat(param)) && isFinite(param)
}

export const isBRLCurrency = (param: any) => {
  const regex = /[A-Za-z@!#$%^&*()/\\]/
  if (param.indexOf('R$') <= -1 || param.indexOf(',') <= -1 || regex.test(param.split('R$')[1].trim())) return false
  else return true
}

export const notSetOrEmpty = (input: string) => {
  return (!input || input.trim() === '')
}
