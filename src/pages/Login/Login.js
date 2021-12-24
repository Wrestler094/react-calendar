import React from "react"
import {Link} from "react-router-dom";
import {auth} from "../../firebase-config";
import {signInWithEmailAndPassword} from "firebase/auth";
import "./Login.scss"
import logo from "../../images/logo.png";
import {ToastContainer, toast} from "react-toastify";

export default function Login(){
    const [loginEmail, setLoginEmail] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const login = async (evt) => {
        evt.preventDefault();
        let validation = true

        if (loginEmail === "" && loginPassword === "") {
            toast.error("Поля email и пароль обязательны для заполнения")
            return null
        }

        if (loginEmail === "") {
            toast.error("Поле email обязательно для заполнения")
            validation = false
        } else if (!validateEmail(loginEmail)) {
            toast.error("Неверный email")
            validation = false
        }

        if (loginPassword === "") {
            toast.error("Поле с паролем обязательно для заполнения")
            validation = false
        }

        if (!validation) {
            return null
        }

        let validationError = false
        const loader = toast.loading('Проверка данных...')
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
        } catch (error) {
            validationError = true
            if (error.message === "Firebase: Error (auth/user-not-found).") {
                toast.error("Пользователь не найден")
            } else if (error.message === "Firebase: Error (auth/wrong-password).") {
                toast.error("Неверный пароль")
            } else {
                toast.error(`${error.message}`)
                console.log(error.message)
            }
        } finally {
            if (validationError) {
                toast.update(loader, { render: "Что-то пошло не так...", type: "error", autoClose: 5000, isLoading: false});
            } else {
                toast.update(loader, { render: "Успешный вход", type: "success", autoClose: 5000, isLoading: false});
            }
        }
    };

    return (
        <div className="auth">
            <form className="auth__form">
                <Link to="/" className="auth__logo-link"><img src={logo} className="auth__logo" alt="Логотип" /></Link>
                <h2 className="auth__heading">Авторизация</h2>
                <input
                    type="email"
                    className="auth__field"
                    placeholder="Введите email"
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                />
                <input
                    type="password"
                    className="auth__field"
                    placeholder="Введите пароль"
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                />
                <button className="auth__button" onClick={login}>Войти</button>
                <p className="auth__reverse-text">Нет аккаунта? <Link className="auth__reverse-link" to="/register">Зарегистрироваться</Link></p>
            </form>
            <ToastContainer />
        </div>
    )
}

