import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function dataFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null
    const data = new Date(control.value)
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    return data < hoje ? { dataFutura: true } : null
  }
}
