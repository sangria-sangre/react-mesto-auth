import React, { useState } from 'react';
import InfoTooltrip from './InfoTooltip.js';
import * as auth from '../utils/apiAuth.js';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header.js';
import { validationConfigAuth } from '../utils/const.js';
import FormValidator from '../utils/FormValidator.js';

function Register() {
    const [isRegisterPopupOpen, setRegisterPopupOpen] = React.useState(false);
    const [isRegisterStatus, setRegisterStatus] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const formValidators = {}

    React.useEffect(() => {
        enableValidation(validationConfigAuth);
    }, [])

    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector))
        formList.forEach((formElement) => {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.getAttribute('name');
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    };

    enableValidation(validationConfigAuth);

    function closePopupRegister() {
        if (isRegisterStatus) {
            navigate('/sign-in', { replace: true });
        }
        setRegisterPopupOpen(false);
    }

    const [formValue, setFormValue] = useState({
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const onRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { password, email } = formValue;
        auth.register(password, email)
            .then(() => {
                setRegisterStatus(true);
                setRegisterPopupOpen(true);
            })
            .catch(err => {
                console.log(err);
                setRegisterStatus(false);
                setRegisterPopupOpen(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <Header headerStaus="register" />

            <form className="login__form" action="get" name="form-register" noValidate onSubmit={onRegister}>
                <h1 className="login__title">Регистрация</h1>
                <input className="login__input " id="email-register" value={formValue.email} type="email" name="email"
                    placeholder="Email" required onChange={handleChange} noValidate />
                <span className="login__input-error email-register-error"></span>

                <input className="login__input" id="password-register" type="text" name="password" value={formValue.password}
                    placeholder="Пароль" required onChange={handleChange} noValidate minLength="5" maxLength="40" />
                <span className="login__input-error password-register-error"></span>
                <button className="login__btn" type="submit">{isLoading ? "Выполняется регистрация..." : "Зарегистрироваться"}</button>
                <p className="login__signature">
                    Уже зарегистрированы?
                    <Link to="/sign-in" className="login__signature_link"> Войти</Link>
                </p>
            </form>

            <InfoTooltrip isOpen={isRegisterPopupOpen} status={isRegisterStatus} isClose={closePopupRegister} name="register" />
        </>
    );
}

export default Register;