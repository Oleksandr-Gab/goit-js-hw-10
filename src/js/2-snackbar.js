import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector('.form');

promiseForm.addEventListener('submit', event => {
  event.preventDefault();
  const getDelay = promiseForm.elements.delay.value;
  const radioIn = promiseForm.elements.state.value;
  event.target.reset();
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioIn === 'fulfilled') {
        resolve(getDelay);
      } else {
        reject(getDelay);
      }
    }, getDelay);
  });

  promise
    .then(value => {
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${getDelay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${getDelay}ms`,
      });
    });
});
