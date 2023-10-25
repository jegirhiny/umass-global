const $form = $('#form');
const $container = $('#number-facts');
const $numbers = $('#numbers');

$form.on('submit', (e) => {
    e.preventDefault();

    fetchNumbers($numbers.val());

    $form.trigger('reset');
})

async function fetchNumbers(numbers) {
    if(!numbers) {
        return;
    }

    try {
        const response = await fetch(`http://numbersapi.com/${numbers}?json`);
        const data = await response.json();

        if(numbers.includes(',')) {
            for (const key in data) {
                $container.append('<h3>', `${key}: ${data[key]}`);
            }
        } else {
            $container.append('<h3>', `${data.number}: ${data.text}`);
        }
      } catch (error) {
        console.error(error);
      }
}