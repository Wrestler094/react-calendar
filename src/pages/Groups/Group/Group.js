import React from 'react';
import {Link} from "react-router-dom";
import groupIcon from "../../../images/group-icon.png";
import {useDispatch} from "react-redux";
import {deleteGroup} from "../../../redux/groups";

export default function Group(props) {
    const dispatch = useDispatch()

    return (
        <div className="group">
            <img src={groupIcon} className="group__image" width="80" height="80" alt="Logotype of group"/>
            <div className="wrapper">
                <h3 className="group__heading">{props.name}</h3>
                <p className="group__students-number">
                    {props.students.length ?
                        `Студентов в группе: ${props.students.length}` :
                        "Студенты ещё не были добавлены"}</p>
                <Link className="button button--yellow" key={props.id} to={`/groups/edit/${props.id}`}>Редактировать</Link>
                <button className="button button--red" onClick={() => dispatch(deleteGroup(props.id))}>Удалить</button>
            </div>
        </div>
    );
};