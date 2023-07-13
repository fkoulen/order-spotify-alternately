export const env = (name: string): string => {
  let variable = process.env[name]
  if (variable === undefined || variable === null) throw `Missing Environment Variable (${name})`
  return variable
}
