import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
// const email = document.querySelector('input');
// const message = document.querySelector('textarea');

const { email, message } = form;
console.log(form);

form.addEventListener(
  'input',
  throttle(event => {
    //   event.preventDefault();

    const formData = {
      email: email.value,
      message: message.value,
    };

    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const data = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (email.value === '' || message.value === '') {
    alert('Fill all inputs!');
    return;
  }

  console.log(data);
  event.target.reset();
  localStorage.removeItem('feedback-form-state');
}

function getDataFromStorage() {
  try {
    const qurentData = JSON.parse(localStorage.getItem('feedback-form-state'));
    if (qurentData !== null) {
      email.value = qurentData.email;
      message.value = qurentData.message;
    }
  } catch (error) {
    console.log(error);
  }
}

getDataFromStorage();
