import React from 'react';
import {useNavigate} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import {addGroup} from "../../redux/groups";
import { nanoid } from 'nanoid'
import Group from "./Group/Group"
import "./Groups.scss"


export default function Groups() {
    const [newGroup, setNewGroup] = React.useState("")

    const groups = useSelector(state => state.groups)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    function getGroupList() {
        console.log(groups)
        return groups ? groups.map(group => (
            <Group
                name={group.name}
                students={group.students}
                id={group.id}
                key={group.id}
            />)
        ) : (
            <div className="groups__free">
                <h3 className="group__heading">Не было создано ни одной группы</h3>
            </div>
        )
    }

    const handleSend = () => {
        if (newGroup === "") {
            toast.error("Название группы не введено")
        } else if (groups && groups.find(elem => elem.name === newGroup)) {
            toast.error("Такая группа уже существует")
        } else {
            dispatch(addGroup(newGroup, nanoid()))
            setNewGroup('')
        }
    }

    return (
        <main className="page-main">
            <div className="page-wrapper">
                <div className="page-head">
                    <span className="page-head__link-back" onClick={goBack}>Назад</span>
                    <h1>Мои группы</h1>
                </div>
                <div className="page-body">
                    {getGroupList()}
                </div>
                <div className="groups__add">
                        <p>Для добавления группы введите название в поле ниже:</p>
                        <div className="groups__wrapper">
                            <input
                                className="add-field"
                                type="text"
                                placeholder="Имя группы"
                                value={newGroup}
                                onChange={(event) => {
                                    setNewGroup(event.target.value);
                                }} />
                            <button className="button button--bigger" onClick={handleSend}>Добавить группу</button>
                        </div>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
};

