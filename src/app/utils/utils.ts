
export const isNumber = (param: any) => {
  return !isNaN(parseFloat(param)) && isFinite(param)
}
