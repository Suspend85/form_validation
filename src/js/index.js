const form = document.querySelector('.formSubmiting'),
  birthday = form.querySelector('.date'),
  firstName = form.querySelector('.firstName'),
  lastName = form.querySelector('.lastName'),
  email = form.querySelector('.email'),
  emailError = document.querySelector('#mail + div.error'),
  password = form.querySelector('.password'),
  passwordConfirm = form.querySelector('.passwordConfirm'),
  fields = form.querySelectorAll('.field');

let today = new Date();

/** Error generation
 * @param {string} text - text of error from other functions
 */
let generateError = (text) => {
  const error = document.createElement('div');
  error.className = 'error';
  error.style.color = 'red';
  error.style.letterSpacing = '0.5px';
  error.style.fontSize = '13px';
  error.innerHTML = text;
  return error;
};

/** cleaning messages from errors */
let removeValidation = () => {
  const errors = form.querySelectorAll('.error');
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
};

/** checking input fields for missing data  */
let checkFieldsPresence = () => {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      let error = generateError(`Заполните это поле`);
      form[i].parentElement.appendChild(error, fields[i]);
    }
  }
};

/** Checking for age by year (month and day are not checked) */
let checkBirthday = () => {
  const bDayYear = birthday.value.split('-')[0],
    todayYear = today.getFullYear(),
    age = parseInt(todayYear) - parseInt(bDayYear);
  if (birthday.value && age < 18) {
    let error = generateError(`Регистрация только от 18 лет`);
    birthday.parentElement.appendChild(error, birthday);
  }
};

/** Checking the first name for validity */
let checkFirstName = () => {
  const reg = /^[A-Za-zА-Яа-яЁё ,.'-]{1,}$/;
  if (firstName.value && !reg.test(firstName.value)) {
    let error = generateError(`Имя должно состоять только из букв и символов ' - , .`);
    firstName.parentElement.appendChild(error, firstName);
  }
  if (firstName.value && (firstName.value.length < 2 || firstName.value.length > 31)) {
    let error = generateError(`Длина должна быть от 2 до 31 символов`);
    firstName.parentElement.appendChild(error, firstName);
  }
};

/** Checking the last name for validity */
let checkLastName = () => {
  const reg = /^[A-Za-zА-Яа-яЁё ,.'-]{1,}$/;
  if (lastName.value && !reg.test(lastName.value)) {
    let error = generateError(`Фамилия должна состоять только из букв и символов ' - , .`);
    lastName.parentElement.appendChild(error, lastName);
  }
  if (lastName.value && (lastName.value.length < 2 || lastName.value.length > 31)) {
    let error = generateError(`Длина должна быть от 2 до 31 символов`);
    lastName.parentElement.appendChild(error, lastName);
  }
};

/** checking the email for validation */
let checkEmail = () => {
  const reg = /.+@.+\..+/i;
  if (email.value && !reg.test(String(email.value).toLowerCase())) {
    let error = generateError(`Введите корректный email`);
    email.parentElement.appendChild(error, email);
  }
};

/** checking the password for validation */
const checkPass = () => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{1,}$/;
  const passLen = 8;
  if (password.value && !reg.test(String(password.value))) {
    let error = generateError(`Должен содержать 1 цифру, спецсимвол, заглавную или строчную букву`);
    password.parentElement.appendChild(error, password);
  }
  if (password.value && password.value.length < passLen) {
    let error = generateError(`Должен быть не менее ${passLen} символов`);
    password.parentElement.appendChild(error, password);
  }
};

/** checking password and passwordConfirm for match */
const checkPassMatch = () => {
  if (password.value !== passwordConfirm.value) {
    let error = generateError(`Пароли не совпадают`);
    passwordConfirm.parentElement.appendChild(error, passwordConfirm);
  }
};

/** main function for validation inputs on 'submit' event */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  removeValidation();
  checkFieldsPresence();
  checkBirthday();
  checkFirstName();
  checkLastName();
  checkEmail();
  checkPass();
  checkPassMatch();
});
