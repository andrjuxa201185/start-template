export const validate = (validator, fields) => {
  if (validator) {
    let errors = {};
    const unfilled = validator.required.filter(field => !fields[field]);
    if (validator.custom) {
      const result = validator.custom
        .map(({error, validate, fields: validationFields}) => {
          const valid = validate(...validationFields.map(field => fields[field]));
          const errors = {};
          validationFields.forEach(item => {
            errors[item] = error;
          });
          return valid ? null : errors;
        });
      const customErrors = result.filter(Boolean);
      if (customErrors.length) {
        customErrors.forEach(error => {
          errors = Object.assign(errors, error);
        });
      }
    }
    if (unfilled.length) {
      unfilled.forEach(field => {
        errors[field] = 'Please fill required field';
      });
    }
    return {errors};
  }
  return {errors: null};
};

export const email = fields => ({
  error: 'Incorrect email format',
  validate: validateEmail,
  fields,
});

export const samePasswords = fields => ({
  error: 'Passwords must be same',
  validate: (password, repeat) => password === repeat,
  fields,
});

export const checkDates = fields => ({
  error: 'The date of finish cannot be less than date of start.',
  validate: (startDate, endDate) => new Date(startDate) < new Date(endDate),
  fields,
});

export const password = fields => ({
  error: 'Passwords must contain at least 8 characters',
  validate: validatePassword,
  fields,
});

export const phone = fields => ({
  error: 'Incorrect phone format',
  validate: validatePhone,
  fields,
});

const validatePassword = password => {
  const re = /^.*.{8,20}$/;
  return re.test(password);
};

const validateEmail = email => {
  /* eslint-disable no-useless-escape */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePhone = phone => {
  /* eslint-disable no-useless-escape */
  const re = /^\(\d{3}\) \d{3}-\d{4}$/;
  return re.test(phone);
};

