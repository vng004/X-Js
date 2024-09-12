export const showSuccessDialog = (message) => {
    const dialog = document.getElementById('success-dialog');
    const dialogMessage = document.getElementById('success-message');
    dialogMessage.textContent = message;
    dialog.classList.remove('hidden');

    setTimeout(() => {
        hideDialog('success-dialog');
    }, 2000);
};

export const showErrorDialog = (message) => {
    const dialog = document.getElementById('error-dialog');
    const dialogMessage = document.getElementById('error-message');
    dialogMessage.textContent = message;
    dialog.classList.remove('hidden');

    setTimeout(() => {
        hideDialog('error-dialog');
    }, 2000);
};

const hideDialog = (dialogId) => {
    const dialog = document.getElementById(dialogId);
    dialog.classList.add('hidden');
};