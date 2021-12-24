import React from "react";
import {nanoid} from "nanoid";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function DashboardDay(props) {
    const {year, month, day} = props
    const navigate = useNavigate()
    const tasksList = useSelector(state => state.dates)

    function getTasks() {
        return (tasksList && tasksList[`${year}-${month}-${day}`]) ?
            tasksList[`${year}-${month}-${day}`].map(item => (
                <div
                    key={nanoid()}
                    onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/dashboard/day/${year}-${month}-${day}/group/${item.id}`)
                    }}
                    className="calendar__task">
                    {item.name} {item.isFinished ? "🗸" : null}
                </div>
            )) :
            null
    }
    return (
        <div>
            {getTasks()}
        </div>
    )
}