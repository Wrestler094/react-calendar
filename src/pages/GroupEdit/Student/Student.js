import React from 'react';
import {deleteStudent} from "../../../redux/groups";
import {useDispatch} from "react-redux";

export default function Group(props) {
    const dispatch = useDispatch()

    return (
        <div className="student">
            <h3 className="student__heading">{props.name} {props.lastname}</h3>
            <button
                className="button button--red"
                onClick={() => dispatch(deleteStudent(props.id, props.groupId))}>
                Удалить
            </button>
        </div>
    );
};