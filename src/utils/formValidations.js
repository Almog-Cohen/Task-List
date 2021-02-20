export function validateEmail(email) {
  const errors = {};
  const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!email) {
    errors.email = "Required";
  } else if (!validEmailRegex.test(email)) {
    errors.email = "Invalid email address";
  }

  return errors;
}

export function validatePassword(password) {
  const errors = {};

  const containsOneCapitalLetterAndNumbers = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  if (!password) {
    errors.password = "Required";
  } else if (!containsOneCapitalLetterAndNumbers.test(password)) {
    errors.password =
      "Must contain at least one capital letter, one number and at least 8 letters";
  }

  return errors;
}
