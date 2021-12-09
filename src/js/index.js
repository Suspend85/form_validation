const form = document.querySelector('.formSubmiting'),
  birthday = form.querySelector('.date'),
  firstName = form.querySelector('.firstName'),
  lastName = form.querySelector('.lastName'),
  email = form.querySelector('.email'),
  password = form.querySelector('.password'),
  passwordConfirm = form.querySelector('.passwordConfirm'),
  fields = form.querySelectorAll('.field');

// datepicker attr "max" set to today
birthday.addEventListener('click', () => {
  birthday.setAttribute('max', new Date().toISOString().substring(0, 10));
});

/** Error generation
 * @param {string} text - text of error from other functions
 */
const generateError = (text) => {
  const error = document.createElement('div');
  error.className = 'error';
  error.style.color = 'red';
  error.style.fontSize = '13px';
  error.innerHTML = text;
  return error;
};

/** cleaning messages from errors */
const clearErrorMessages = () => {
  const errors = form.querySelectorAll('.error');
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove();
  }
};

/** checking input fields for missing data  */
const checkFieldsPresence = () => {
  for (let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      const error = generateError(`Заполните это поле`);
      form[i].parentElement.appendChild(error, fields[i]);
    }
  }
};

/** Checking for age by year (month and day are not checked) */
const checkBirthday = () => {
  const today = new Date(),
    bDayYear = birthday.value.split('-')[0],
    todayYear = today.getFullYear(),
    age = parseInt(todayYear) - parseInt(bDayYear);
  if (birthday.value && age < 18) {
    const error = generateError(`Регистрация только с 18 лет`);
    birthday.parentElement.appendChild(error, birthday);
  }
};

/** Checking the first name for validity */
const checkFirstName = () => {
  const reg = /^[A-Za-zА-Яа-яЁё ,.'-]{1,}$/;
  if (firstName.value && !reg.test(firstName.value)) {
    const error = generateError(`Имя может содержать только буквы и символы ' - , .`);
    firstName.parentElement.appendChild(error, firstName);
  }
  if (firstName.value && firstName.value.length < 2) {
    const error = generateError(`Длина должна быть не менее 2 символов`);
    firstName.parentElement.appendChild(error, firstName);
  }
};

/** Checking the last name for validity */
const checkLastName = () => {
  const reg = /^[A-Za-zА-Яа-яЁё ,.'-]{1,}$/;
  if (lastName.value && !reg.test(lastName.value)) {
    const error = generateError(`Фамилия может сожержать только буквы и символы ' - , .`);
    lastName.parentElement.appendChild(error, lastName);
  }
  if (lastName.value && lastName.value.length < 2) {
    const error = generateError(`Длина должна быть не менее 2 символов`);
    lastName.parentElement.appendChild(error, lastName);
  }
};

/** checking the email for validation */
const checkEmail = () => {
  const reg = /.+@.+\..+/i;
  if (email.value && !reg.test(String(email.value).toLowerCase())) {
    const error = generateError(`Введите корректный email`);
    email.parentElement.appendChild(error, email);
  }
};

/** checking the password for validation */
const checkPass = () => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{1,}$/,
    passLen = 8;
  if (password.value && !reg.test(String(password.value))) {
    const error = generateError(`Пароль должен содержать минимум 1 цифру, спецсимвол, заглавную, строчную букву.`);
    password.parentElement.appendChild(error, password);
  }
  if (password.value && password.value.length < passLen) {
    const error = generateError(`Пароль должен быть не менее ${passLen} символов`);
    password.parentElement.appendChild(error, password);
  }
};

/** checking password and passwordConfirm for match */
const checkPassMatch = () => {
  if (password.value !== passwordConfirm.value) {
    const error = generateError(`Пароли не совпадают`);
    passwordConfirm.parentElement.appendChild(error, passwordConfirm);
  }
};

/** main function for validation inputs on 'submit' event */
form.addEventListener('submit', (event) => {
  event.preventDefault();

  clearErrorMessages();
  checkFieldsPresence();
  checkBirthday();
  checkFirstName();
  checkLastName();
  checkEmail();
  checkPass();
  checkPassMatch();
});
