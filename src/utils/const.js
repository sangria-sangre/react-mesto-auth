const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_inactive',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__input-error_active'
}

const validationConfigAuth = {
    formSelector: '.login__form',
    inputSelector: '.login__input',
    submitButtonSelector: '.login__btn',
    inactiveButtonClass: 'login__btn_inactive',
    inputErrorClass: 'login__input_error',
    errorClass: 'login__input-error_active'
}

export { validationConfig, validationConfigAuth };