import { ValidationError } from 'class-validator'

export function getErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      return JSON.stringify(error.constraints)
    })
    .toString()
}
