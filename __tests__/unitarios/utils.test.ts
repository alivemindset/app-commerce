/* eslint-disable no-undef */
import { isNumber, isBRLCurrency, notSetOrEmpty, notSetOrArrayEmpty } from '../../src/app/utils/utils'

describe('isNumber', () => {
  it('should return true when received a number (3)', () => {
    const actual = isNumber(3)
    const expected = true

    expect(actual).toBe(expected)
  })

  it('should return false when received a string with letters (abc)', () => {
    const actual = isNumber('abc')
    const expected = false

    expect(actual).toBe(expected)
  })

  it('should return true when received a string with numbers (123)', () => {
    const actual = isNumber('123')
    const expected = true

    expect(actual).toBe(expected)
  })

  it('should return false when received a string with number and letter (123abc)', () => {
    const actual = isNumber('123abc')
    const expected = false

    expect(actual).toBe(expected)
  })

  it('should return false when received a string with number and symbols', () => {
    const actual = isNumber('123@')
    const expected = false

    expect(actual).toBe(expected)
  })
})

describe('isBRLCurrency', () => {
  it('should return false when receive a string without R$', () => {
    const actual = isBRLCurrency('10.70')
    const expected = false

    expect(actual).toBe(expected)
  })

  it('should return false when receive a string without ","', () => {
    const actual = isBRLCurrency('R$0')
    const expected = false

    expect(actual).toBe(expected)
  })

  it('should return false when receive any letter that not be R$', () => {
    const actual = isBRLCurrency('R$ A,0')
    const expected = false

    expect(actual).toBe(expected)
  })
})

describe('notSetOrEmpty', () => {
  it('should return true when receive " " ', () => {
    const actual = notSetOrEmpty(' ')
    const expected = true

    expect(actual).toBe(expected)
  })
})

describe('notSetOrArrayEmpty', () => {
  it('should return true when receive []', () => {
    const actual = notSetOrArrayEmpty([])
    const expected = true

    expect(actual).toBe(expected)
  })
})
