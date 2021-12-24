import React from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {addClass} from "../../redux/classes";
import {ToastContainer, toast} from "react-toastify";
import {nanoid} from "nanoid";
import "./Day.scss"



export default function Day() {
    const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
    const [selectedGroup, setSelectedGroup] = React.useState("no-select")
    const { day } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const groupList = useSelector(state => state.groups)
    const classList = useSelector(state => state.dates)
    const year= day.split('-')[0]
    const month = day.split('-')[1]
    const date = day.split('-')[2]

    const goBack = () => {
        navigate(-1)
    }

    function getClasses() {
        return (classList && classList[day]) ?
            classList[day].map(item => (
                <div className="single-day" key={nanoid()}>
                    <h3 className="single-day__heading">{item.name} {item.isFinished ? "🗸" : null}</h3>
                    <Link
                        className={`${item.isFinished ? "button button--yellow" : "button button--green"}`}
                        to={`/dashboard/day/${day}/group/${item.id}`}>
                        {item.isFinished ? "Редактировать посещаемость" : "Отметить посещаемость"}
                    </Link>
                </div>)) :
            <p>В этот день не было добавлено ни одного занятия</p>
    }

    const handleSend = () => {
        if (selectedGroup === "no-select") {
            toast.error("Группа не выбрана")
        } else {
            const group = groupList.find(elem => elem.id === selectedGroup)
            dispatch(addClass(day, group))
            setSelectedGroup('no-select')
        }
    }

    function getGroups() {
        return groupList ?
            <div className="day__add">
                <p>Выберите группу, для которой вы хотите добавить занятие</p>
                <div className="single-day__wrapper">
                    <select
                        className="add-field add-field--day"
                        value={selectedGroup}
                        onChange={(evt) => setSelectedGroup(evt.target.value)}>
                            <option value="no-select">Выберите группу</option>
                            {groupList.map(item => <option key={nanoid()} value={item.id}>{item.name}
                            </option>)}
                    </select>
                    <button
                        className="button button--bigger"
                        onClick={handleSend}>
                        Добавить занятие
                    </button>
                </div>
            </div> :
            <p className="day__add">Вы не создали ещё ни одной группы. Чтобы добавлять занятия нужно создать хотя бы одну группу.</p>
    }

    return (
        <main className="page-main">
            <div className="page-wrapper">
                <div className="page-head">
                    <span className="page-head__link-back" onClick={goBack}>Назад</span>
                    <h1>{date} {months[`${month - 1}`]} {year}</h1>
                </div>
                <div className="page-body">
                    {getClasses()}
                </div>
                    {getGroups()}
            </div>
            <ToastContainer />
        </main>
    );
};

