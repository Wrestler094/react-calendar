import React from "react"
import {Link} from "react-router-dom"
import {auth} from "../../firebase-config"
import {createUserWithEmailAndPassword} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import "./Register.scss"
import logo from "../../images/logo.png";

export default function Register(){
    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const registration = async (evt) => {
        evt.preventDefault();
        let validation = true

        if (registerEmail === "" && registerPassword === "") {
            toast.error("Поля email и пароль обязательны для заполнения")
            return null
        }

        if (registerEmail === "") {
            toast.error("Поле email обязательно для заполнения")
            validation = false
        } else if (!validateEmail(registerEmail)) {
            toast.error("Неверный email")
            validation = false
        }

        if (registerPassword === "") {
            toast.error("Поле с паролем обязательно для заполнения")
            validation = false
        } else if (registerPassword.length < 6) {
            toast.error("Пароль слишком короткий")
            validation = false
        }

        if (!validation) {
            return null
        }

        let validationError = false
        const loader = toast.loading('Проверка данных...')
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            validationError = true
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                toast.error("Пользователь с таким email уже существует")
            } else {
                toast.error(`${error.message}`)
                console.log(error.message)
            }
        } finally {
            if (validationError) {
                toast.update(loader, { render: "Что-то пошло не так...", type: "error", autoClose: 5000, isLoading: false});
            } else {
                toast.update(loader, { render: "Регистрация успешна", type: "success", autoClose: 5000, isLoading: false});
            }
        }
    };

    return (
        <div className="register">
            <form className="register__form">
                <Link to="/" className="register__logo-link"><img src={logo} className="register__logo" alt="Логотип" /></Link>
                <h2 className="auth__heading">Регистрация</h2>
                <input
                    type="email"
                    className="register__field"
                    placeholder="Введите email"
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    type="password"
                    className="register__field"
                    placeholder="Введите пароль"
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                />
                <button className="register__button" onClick={registration}>Зарегистрироваться</button>
                <p className="register__reverse-text">Уже есть аккаунт? <Link className="register__reverse-link" to="/login">Войти</Link></p>
            </form>
            <ToastContainer />
        </div>
    )
}

