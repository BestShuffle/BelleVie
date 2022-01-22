import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

function checkFields(group: FormGroup, controlName: string, confirmControlName: string, errorMessage: string): any {
  let control = group.get(controlName);
  let confirmControl = group.get(confirmControlName);
  // let errorMessage = "Les codes de suppression de personnage ne correspondent pas";

  if (control && confirmControl &&
    control.value !== confirmControl.value) {
    return addMatchError(controlName, {errorType: controlName, errorMessage: errorMessage});
  }
  if (confirmControl && confirmControl.errors && !confirmControl.errors.notSame) {
    // Si une autre validateur a fait son boulot ne pas afficher de message
    return;
  }
  return;
}

function addMatchError(fieldName: string, error: { errorType: string; errorMessage: string }): any {
  let errors = {notSame: {}};
  errors.notSame[fieldName] = error;
  return errors;
}

export function checkMatch(group: FormGroup): any {
  let errors = {};

  // Mots de passe
  let errorPassword = checkFields(group, 'password', 'confirmPassword', 'Les mots de passe ne correspondent pas');
  if (group.get('confirmPassword')) {
    let control = group.get('confirmPassword');
    if (control && control.errors && !control.errors.notSame) {
      // Autre type d'erreur
    } else {
      control.setErrors(errorPassword);
      if (errorPassword) {
        errors['password'] = errorPassword;
      }
    }
  }

  // Emails
  let errorMail = checkFields(group, 'email', 'confirmEmail', 'Les adresses mail ne correspondent pas');
  if (group.get('confirmEmail')) {
    let control = group.get('confirmEmail');
    if (control && control.errors && !control.errors.notSame) {
      // Autre type d'erreur
    } else {
      control.setErrors(errorMail);
      if (errorMail) {
        errors['mail'] = errorMail;
      }
    }
  }

  // Code de suppression de personnage
  let errorCodeDelete = checkFields(group, 'codeDelete', 'confirmCodeDelete', 'Les codes de suppression de personnage de correspondent pas');
  if (group.get('confirmCodeDelete')) {
    let control = group.get('confirmCodeDelete');
    if (control && control.errors && !control.errors.notSame) {
      // Autre type d'erreur
    } else {
      control.setErrors(errorCodeDelete);
      if (errorCodeDelete) {
        errors['codeDelete'] = errorCodeDelete;
      }
    }
  }

  if (errors['password'] || errors['mail'] || errors['codeDelete']) {
    return errors;
  }

  return;
}
