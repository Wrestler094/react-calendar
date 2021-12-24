import React from 'react';
import "./Class.scss"
import {useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {checkClass, checkVisit} from "../../redux/classes";

export default function Class() {
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    const { day, group } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const classList = useSelector(state => state.dates)
    const year= day.split('-')[0]
    const month = day.split('-')[1]
    const date = day.split('-')[2]

    const goBack = () => {
        navigate(-1)
    }

    function getClassStudents() {
        return (classList && classList[day] && classList[day].find(elem => elem.id === group).students.length) ?
            classList[day].find(elem => elem.id === group).students.map(item => (
                <h3
                    className="students-check"
                    key={item.id}
                    onClick={() => dispatch(checkVisit(item.id, day, group))}>
                    <span>{item.name} {item.lastname}</span>
                    <span className={`students-checkbox--before ${item.isVisited ?
                        "students-checkbox--after" : 
                        null}`}>
                    </span>
                </h3>
            )) :
            <p className="students-free">Не было добавлено ни одного ученика</p>
    }

    return (
        <main className="page-main">
            <div className="page-wrapper">
                <div className="page-head">
                    <span className="page-head__link-back" onClick={goBack}>Назад</span>
                    <h1 className="class-heading">Занятие группы {(
                        classList &&
                        classList[day] &&
                        classList[day].find(elem => elem.id === group).name) ?
                        classList[day].find(elem => elem.id === group).name :
                        null} - {date} {months[`${month - 1}`]} {year} {(
                        classList &&
                        classList[day] &&
                        classList[day].find(elem => elem.id === group).isFinished) ?
                        "🗸" :
                        null}</h1>
                </div>
                <div className="class-page">
                    {getClassStudents()}
                </div>
                <div className="class__add class-page__check-class">
                    <p className={(
                        classList &&
                        classList[day] &&
                        classList[day].find(elem => elem.id === group).isFinished) ?
                        "button button--yellow class-button" :
                        "button button--green class-button"} onClick={() => dispatch(checkClass(day, group))}>
                            Отметить занятие как {(
                                classList &&
                                classList[day] &&
                                classList[day].find(elem => elem.id === group).isFinished) ?
                                "не проведенное" :
                                "проведенное"}
                    </p>
                </div>
            </div>
        </main>
    );
};

