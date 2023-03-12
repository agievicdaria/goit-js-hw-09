import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayRef = document.querySelector('input[name="delay"]');
const stepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');
const formRef = document.querySelector('form');

formRef.addEventListener('submit', makePromiseElements);

function makePromiseElements(e) {
  e.preventDefault();
  let firstDelay = Number(delayRef.value);
  let stepDelay = Number(stepRef.value);

  for (let index = 0; index < amountRef.value; index += 1) {
    createPromise(index + 1, firstDelay + index * stepDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
