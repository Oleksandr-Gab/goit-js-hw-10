import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const delayInput = form.querySelector('input[name="delay"]');
      const stateInputs = form.querySelectorAll('input[name="state"]');
  
      const delay = parseInt(delayInput.value, 10);
  
      const selectedStateInput = Array.from(stateInputs).find(input => input.checked);
  
      if (!selectedStateInput) {
        iziToast.error({
          title: 'Error',
          message: 'Please select a state (Fulfilled or Rejected).',
          position: 'topRight',
        });
        return;
      }
  
      const state = selectedStateInput.value;
  
      const promise = new Promise((resolve, reject) => {
        if (state === 'fulfilled') {
          setTimeout(() => {
            resolve(delay);
          }, delay);
        } else {
          setTimeout(() => {
            reject(delay);
          }, delay);
        }
      });
  
      try {
        const result = await promise;
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${result}ms`,
          position: 'topRight',
        });
      } catch (error) {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${error}ms`,
          position: 'topRight',
        });
      }
    });
  });