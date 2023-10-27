$(document).ready(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;

    // 创建一个对象来保存每个输入框的验证状态
    const validationStatus = {
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
    };

    function showError(inputId, message) {
        $(`#${inputId}-error`).text(message);
        $(`#${inputId}`).css('border-color', 'red');
        validationStatus[inputId] = false;
    }

    function clearError(inputId) {
        $(`#${inputId}-error`).text('');
        $(`#${inputId}`).css('border-color', '');
    }

    function validateEmail(email) {
        if (!emailRegex.test(email)) {
            showError('email', 'Invalid email format. Use a Northeastern email address.');
            return false;
        }
        return true;
    }

    function validateUserName(username) {
        if (username.length < 3 || username.length > 20) {
            showError('username', 'User Name must be between 3 and 20 characters.');
            return false;
        }
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            showError('username', 'User Name can only contain letters and numbers.');
            return false;
        }
        return true;
    }

    function validatePassword(password) {
        if (password.length < 8 || password.length > 20) {
            showError('password', 'Password must be between 8 and 20 characters.');
            return false;
        }
        if (!/^[a-zA-Z0-9!@#$%^&*]+$/.test(password)) {
            showError('password', 'Password can only contain letters, numbers, and special characters: !@#$%^&*');
            return false;
        }
        return true;
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match.');
            return false;
        }
        return true;
    }

    function enableLoginButton() {
        if (Object.values(validationStatus).every(status => status)) {
            $('#loginButton').prop('disabled', false);
        }
    }

    function disableLoginButton() {
        $('#loginButton').prop('disabled', true);
    }

    function validateField(inputId) {
        clearError(inputId);

        const inputValue = $(`#${inputId}`).val();

        if (inputValue === '') {
            validationStatus[inputId] = false;
        } else {
            if (inputId === 'email' && validateEmail(inputValue)) {
                validationStatus[inputId] = true;
            }
            if (inputId === 'username' && validateUserName(inputValue)) {
                validationStatus[inputId] = true;
            }
            if (inputId === 'password' && validatePassword(inputValue)) {
                validationStatus[inputId] = true;
            }
            if (inputId === 'confirmPassword' && validateConfirmPassword($('#password').val(), inputValue)) {
                validationStatus[inputId] = true;
            }
        }

        enableLoginButton();
    }

    disableLoginButton();

    // 绑定输入框的事件处理程序
    $('#email, #username, #password, #confirmPassword').on('input', function () {
        const inputId = $(this).attr('id');
        validateField(inputId);
    });

    $('#loginButton').on('click', function (e) {
        e.preventDefault();

        // 验证所有输入框
        for (const inputId in validationStatus) {
            validateField(inputId);
        }

        // 只有在所有输入框都验证成功且非空时才会进行重定向
        if (Object.values(validationStatus).every(status => status)) {
            const username = $('#username').val();
            window.location.href = `second.html?username=${username}`;
        }
    });
});
