import fs from 'node:fs'
import path from 'node:path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export function calculateAge(dateOfBirthStr: string): number {
  const dateParts = dateOfBirthStr.split('/')
  const birthDay = Number.parseInt(dateParts[0], 10)
  const birthMonth = Number.parseInt(dateParts[1], 10)
  const birthYear = Number.parseInt(dateParts[2], 10)

  const currentDate: Date = new Date()
  const birthDate: Date = new Date(birthYear, birthMonth - 1, birthDay)

  let age: number = currentDate.getFullYear() - birthDate.getFullYear()

  const hasBirthdayPassed =
    birthDate.getMonth() < currentDate.getMonth() ||
    (birthDate.getMonth() === currentDate.getMonth() &&
      birthDate.getDate() <= currentDate.getDate())

  age = hasBirthdayPassed ? age : age - 1

  return age
}

export function getTranslationFile(locale = 'es') {
  const data = fs.readFileSync(
    path.join(__dirname, '..', `langs/${locale.slice(0, 2)}.json`),
    'utf-8',
  )
  return data
}

export function t(key: string): string | undefined {
  const keys = key.split('.')
  const object = JSON.parse(getTranslationFile())

  return keys.reduce((result, key) => {
    return result?.[key]
  }, object)
}
