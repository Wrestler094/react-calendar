import React from 'react';
import {useParams, useNavigate}  from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {addStudent} from "../../redux/groups";
import {toast, ToastContainer} from 'react-toastify';
import { nanoid } from 'nanoid'
import Student from "./Student/Student"
import "./GroupEdit.scss"

export default function GroupEdit() {
    const [name, setName] = React.useState("");
    const [lastname, setLastname] = React.useState("");

    const groups = useSelector(state => state.groups)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { group } = useParams()

    const goBack = () => {
        navigate(-1)
    }

    const getGroupData = groups ? groups.find(elem => elem.id === group) : null

    function getStudents() {
        if (getGroupData !== null && getGroupData.students.length) {
            return getGroupData.students.map(student => <Student
                name={student.name}
                lastname={student.lastname}
                key={student.id}
                id={student.id}
                groupId={group}
            />)
        } else {
            return <h3 className="group-edit__heading">Не было добавлено ни одного студента</h3>
        }
    }

    const handleSend = () => {
        if (name === "" && lastname === "") {
            toast.error("Имя и фамилия не введены")
        } else if (name === "" ) {
            toast.error("Имя не введено")
        } else if (lastname === "") {
            toast.error("Фамилия не введена")
        } else {
            dispatch(addStudent(name, lastname, group, nanoid()))
            setName('')
            setLastname('')
        }
    }

    return (
        <main className="page-main">
            <div className="page-wrapper">
                <div className="page-head">
                    <span className="page-head__link-back" onClick={goBack}>Назад</span>
                    <h1>Группа {getGroupData ? getGroupData.name : "не найдена"}</h1>
                </div>
                <div className="page-body">
                    {getStudents()}
                </div>
                <div className="group-edit__add">
                    <p>Для добавления нового студента введите его имя и фамилию в поле ниже:</p>
                    <label htmlFor="">
                        <input
                            className="add-field group-edit__field"
                            value={name}
                            type="text"
                            onChange={(evt) => setName(evt.target.value)}/>
                        Имя
                    </label>
                    <br/>
                    <label htmlFor="">
                        <input
                            className="add-field group-edit__field"
                            value={lastname}
                            type="text"
                            onChange={(evt) => setLastname(evt.target.value)} />
                        Фамилия
                    </label>
                    <br/>
                    <button onClick={handleSend} className="button button--bigger">Добавить студента</button>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

