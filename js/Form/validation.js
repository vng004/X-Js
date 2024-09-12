export const validateForm = () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const city = document.getElementById('city').selectedOptions[0].text.trim();
    const district = document.getElementById('district').selectedOptions[0].text.trim();
    const ward = document.getElementById('ward').selectedOptions[0].text.trim();
    const homeNumber = document.getElementById('home-number').value.trim();

    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    let isValid = true;

    if (!firstName) {
        document.getElementById('first-name-error').textContent = 'Họ không được để trống.';
        isValid = false;
    }

    if (!lastName) {
        document.getElementById('last-name-error').textContent = 'Tên không được để trống.';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('email-error').textContent = 'Email không được để trống.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Email không đúng định dạng.';
        isValid = false;
    }

    if (!phone) {
        document.getElementById('phone-error').textContent = 'Số điện thoại không được để trống.';
        isValid = false;
    } else if (isNaN(phone)) {
        document.getElementById('phone-error').textContent = 'Số điện thoại chỉ được chứa số.';
        isValid = false;
    } else if (phone.length !== 10) {
        document.getElementById('phone-error').textContent = 'Số điện thoại phải gồm đúng 10 chữ số.';
        isValid = false;
    }


    if (!city || city === '--Chọn Tỉnh/Thành Phố--') {
        document.getElementById('city-error').textContent = 'Bạn phải chọn tỉnh/thành phố.';
        isValid = false;
    }

    if (!district || district === '--Chọn Huyện/Quận--') {
        document.getElementById('district-error').textContent = 'Bạn phải chọn huyện/quận.';
        isValid = false;
    }

    if (!ward || ward === '--Chọn Xã/Phường--') {
        document.getElementById('ward-error').textContent = 'Bạn phải chọn phường/xã.';
        isValid = false;
    }

    if (!homeNumber) {
        document.getElementById('home-number-error').textContent = 'Số nhà không được để trống.';
        isValid = false;
    }

    return isValid;
};

const clearValidationError = (inputId, errorId) => {
    document.getElementById(inputId).addEventListener('input', () => {
        document.getElementById(errorId).textContent = '';
    });
};

clearValidationError('first-name', 'first-name-error');
clearValidationError('last-name', 'last-name-error');
clearValidationError('email', 'email-error');
clearValidationError('phone', 'phone-error');
clearValidationError('city', 'city-error');
clearValidationError('district', 'district-error');
clearValidationError('ward', 'ward-error');
clearValidationError('home-number', 'home-number-error');
