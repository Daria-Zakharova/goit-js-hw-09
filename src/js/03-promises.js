import Notiflix from 'notiflix';

Notiflix.Notify.init({
  cssAnimationStyle: 'from-right',
});

const refs = {
  form: document.querySelector('form'),
}

let position = 1;

refs.form.addEventListener('submit', onSubmit);
  
function onSubmit(evt) {
  evt.preventDefault();

  const formData = {};
  createObjFromKeysArr(evt.currentTarget.elements, formData);
  const {delay, step, amount} = formData;

  repeatPromise(delay, step, amount);
}

function createObjFromKeysArr(basicArr, result) {
  Object.keys(basicArr).forEach(key => {
    if(Number.isNaN(Number(key))){
      result[key] = Number(basicArr[key].value);
    }
  });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } 
      else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
});
}

function repeatPromise(delay, step, amount) {
  if(position > amount) {
    refs.form.reset();
    position = 1;
    return;
  }

  else if (position === 1) {
    createPromise(position, delay)
    .then(Notiflix.Notify.success)
    .catch(Notiflix.Notify.failure);
  }
  else {
    delay += step;
    createPromise(position, delay)
    .then(Notiflix.Notify.success)
    .catch(Notiflix.Notify.failure);
  }
  position += 1;

  repeatPromise(delay, step, amount);
}

