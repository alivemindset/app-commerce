export class NotIsNumber extends Error {}
export class ConflictEmail extends Error {}
export class ConflictDocument extends Error {}

export class ClientNotFound extends Error {}
export class ProductNotFound extends Error {}
export class OrderNotFound extends Error {}

export class InvalidProduct extends Error {
  constructor (message: string) {
    super()
    this.message = message
  }
}

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

export const notSetOrArrayEmpty = (input: any[]) => {
  return (!input || input.length === 0)
}
