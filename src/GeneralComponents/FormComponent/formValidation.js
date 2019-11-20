
const validate = (field, value, regex) => {
  const isValid = regex.test(value);
  if (!isValid) {
    field.nextElementSibling.classList.add('show')
  }else {
    field.nextElementSibling.classList.remove('show')
  }
  return isValid
}

const formValidation = (target, value) => {
  const { type } = target.attributes;
  console.log(type);
  const input_types = {
    username: /^[a-z\d]{5,12}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^[#\w@_-]{8,20}$/,
    telephone:/^\d{11}$/,
    text: /^[a-z\d]{5,12}$/i
  }
  const { email, password, text, telephone } = input_types;

  switch(type) {
    case 'email' :
      validate(target, value, email);
      break;
    case 'password': 
      validate(target, value, password);
      break;
    case 'text':
      validate(target, value, text);
      break;
    default:
      break;
  }
}

export default formValidation;