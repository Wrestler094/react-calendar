import React from "react";
import {Link} from "react-router-dom";
import "./Sidebar.scss";
import user from "../../images/user.png";

export default function Sidebar() {
    return (
        <aside className="page-sidebar">
            <section className="page-sidebar__user">
                <img src={user} className="page-sidebar__user-img" width="100" height="100" alt=""/>
                <p className="page-sidebar__username">Wrestler094</p>
                <p className="page-sidebar__email">kovalev094@gmail.com</p>
                <Link className="page-sidebar__profile-link" to="/groups">Мои группы</Link>
            </section>
        </aside>
    );
};