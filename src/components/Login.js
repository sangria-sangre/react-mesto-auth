import React, { useState } from 'react';
import * as auth from '../utils/apiAuth.js';
import { useNavigate } from 'react-router-dom';
import Header from './Header.js'
import InfoTooltrip from './InfoTooltip.js';
import { validationConfigAuth } from '../utils/const.js';
import FormValidator from '../utils/FormValidator.js';

function Login(props) {
    const [isLoginPopupOpen, setLoginPopupOpen] = React.useState(false);
    const navigate = useNavigate();
    const formValidators = {}
    const [isLoading, setIsLoading] = React.useState(false);
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    React.useEffect(() => {
        enableValidation(validationConfigAuth);
    }, []);

    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector))
        formList.forEach((formElement) => {
            const validator = new FormValidator(config, formElement);
            const formName = formElement.getAttribute('name');
            formValidators[formName] = validator;
            validator.enableValidation();
        });
    };

    function onLogin(token) {
        localStorage.setItem('jwt', token);
    }

    function closePopupLogin() {
        setLoginPopupOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formValue.email || !formValue.password) {
            setLoginPopupOpen(true);
            return;
        }

        setIsLoading(true);

        auth.authorize(formValue.email, formValue.password)
            .then((data) => {
                if (data.token) {
                    onLogin(data.token);
                    return data;
                }
            })
            .then((data) => {
                if (data.token) {
                    setFormValue({ email: '', password: '' });
                    props.login();
                    navigate('/', { replace: true });
                }
            })
            .catch(err => {
                setLoginPopupOpen(true);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <Header headerStaus="login" />

            <form className="login__form" action="get" name="form-login" noValidate onSubmit={handleSubmit} >
                <h1 className="login__title">Вход</h1>
                <input className="login__input login__input_email" id="email-input" type="email" name="email" noValidate
                    placeholder="Email" required value={formValue.email} onChange={handleChange} />
                <span className="login__input-error email-input-error"></span>

                <input className="login__input login__input_password" id="password-input" type="text" name="password" noValidate
                    placeholder="Пароль" required value={formValue.password} onChange={handleChange} minLength="5" maxLength="40" />
                <span className="login__input-error password-input-error"></span>
                <button className="login__btn" type="submit">{isLoading ? "Выполняется вход..." : "Вход"}</button>
            </form>

            <InfoTooltrip isOpen={isLoginPopupOpen} status={false} isClose={closePopupLogin} name="login" />
        </>
    );

}

export default Login;