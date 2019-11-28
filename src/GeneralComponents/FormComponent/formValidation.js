
const validateWithRegex = (field, value, regex) => {
  const isValid = regex.test(value);
  const err = field.parentElement.nextElementSibling;
  if (!isValid) {
    err.classList.add('show')
  }else {
    err.classList.remove('show')
  }
  return isValid
}

const validateLength = (value, max) => {
  if (max) return value.length > 0 && value.length <= max;
  return value.length > 0
}

const formValidation = (target, name, value) => {
  const { type } = target.attributes;
  console.log(type);
  const input_types = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[#\w@_-]{8,20}$/,
    telephone:/^\d{11}$/,
    text: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
  }
  const errorMessage = {
    emailErr: "email should contain '@' and at least one '.'",
    passwordErr: 'password should be alphanumeric',
    textErr: "characters like '<, >, ' should be avoided"
  };

  const { emailErr, passwordErr, textErr } = errorMessage;
  const { email, password, text } = input_types;
  let isValid = null;

  switch(type) {
    case 'email' :
      isValid = validateWithRegex(target, value, email) && validateLength(value)
      break;
    case 'password': 
      isValid = validateWithRegex(target, value, password) && validateLength(value);
      break;
    case 'text':
      isValid = validateWithRegex(target, value, text) && validateLength(value)
      break;
    default:
      break;
  }
  return {isValid, }
}

export default formValidation;