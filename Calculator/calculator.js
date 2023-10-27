
$(document).ready(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        $('#usernameDisplay').text(`Logged-in User: ${username}`);
    } else {
        $('#usernameDisplay').text('No user logged in.');
    }
    const numberRegex = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
    const showError = (inputId, message) => {
        $(`#${inputId}-error`).text(message);
        $(`#${inputId}`).css('border-color', 'red');
    };

    const clearError = (inputId) => {
        $(`#${inputId}-error`).text('');
        $(`#${inputId}`).css('border-color', '');
    };

    const validateNumberInput = (inputId) => {
        clearError(inputId);

        const inputValue = $(`#${inputId}`).val();

        if (inputValue === '') {
            showError(inputId, 'This field cannot be empty.');
            return false;
        }

        if (!numberRegex.test(inputValue)) {
            showError(inputId, 'Invalid input. Please enter a valid number.');
            return false;
        }

        if (!isFinite(Number(inputValue))) {
            showError(inputId, 'Input value is too large or too small.');
            return false;
        }

        return true;
    };

    const performOperation = (operation) => {
        if (validateNumberInput('number1') && validateNumberInput('number2')) {
            const num1 = parseFloat($('#number1').val());
            const num2 = parseFloat($('#number2').val());

            let result;

            switch (operation) {
                case 'add':
                    result = num1 + num2;
                    break;
                case 'subtract':
                    result = num1 - num2;
                    break;
                case 'multiply':
                    result = num1 * num2;
                    break;
                case 'divide':
                    if (num2 === 0) {
                        showError('number2', 'Division by zero is not allowed.');
                        return;
                    }
                    result = num1 / num2;
                    break;
                default:
                    break;
            }

            $('#result').val(result);
        }
    };

    $('#addButton').on('click', () => performOperation('add'));
    $('#subtractButton').on('click', () => performOperation('subtract'));
    $('#multiplyButton').on('click', () => performOperation('multiply'));
    $('#divideButton').on('click', () => performOperation('divide'));
});
