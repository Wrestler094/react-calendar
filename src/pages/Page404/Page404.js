import React from "react";
import {Link} from "react-router-dom";
import "./Page404.scss"
import notFound from "../../images/404.png"

export default function() {
    return (
        <main className="not-found">
            <img src={notFound} alt="Картинка ошибки 404"/>
            <h2>Запрашиваемая страница удалена или не существует</h2>
            <Link className="not-found__link" to='/'>На главную</Link>
        </main>
    )
}
