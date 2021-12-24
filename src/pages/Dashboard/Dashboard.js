import React from "react";
import "./Dashboard.scss"
import DashboardDay from "./DashboardDay/DashboardDay"
import {useNavigate} from "react-router-dom";
import {nanoid} from "nanoid";

export default function Dashboard() {
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDayOfWeek = new Date(currentYear, currentMonth, 1).getDay()
    const [dashboardMonth, setDashboardMonth] = React.useState(currentMonth)
    const [dashboardYear, setDashboardYear] = React.useState(currentYear)
    const [dashboardDayOfWeek, setDashboardDayOfWeek] = React.useState(currentDayOfWeek)
    const navigate = useNavigate()

    const days = new Date(2021, dashboardMonth + 1, 0).getDate()

    function daysOfPrevMonth() {
        const daysOfPrevMonth = []
        for (let i =0; i < dashboardDayOfWeek - 1; i++) {
            daysOfPrevMonth.push(<div key={`prev-${i}`} className="calendar__prev-day"></div>)
        }
        return daysOfPrevMonth;
    }

    function getDaysOfMonth() {
        const daysOfMonth = []
        for (let i =0; i < days; i++) {
            daysOfMonth.push(
                    <div
                        className="calendar__day"
                        key={nanoid()}
                        onClick={() => navigate(`/dashboard/day/${dashboardYear}-${dashboardMonth + 1}-${i + 1}`)}>
                        <span className="calendar__date">{i + 1}</span>
                        <DashboardDay
                            year={dashboardYear}
                            month={dashboardMonth + 1}
                            day={i + 1}
                        />
                    </div>
            )
        }
        return daysOfMonth;
    }

    function prevMonth() {
        setDashboardMonth(prevState => prevState === 0 ? (changeYear(false), 11) : prevState - 1)
        setDashboardDayOfWeek(new Date(dashboardYear, dashboardMonth - 1, 1).getDay())
    }

    function nextMonth() {
        setDashboardMonth(prevState => prevState === 11 ? (changeYear(true), 0) : prevState + 1)
        setDashboardDayOfWeek(new Date(dashboardYear, dashboardMonth + 1, 1).getDay())
    }

    function changeYear(action) {
        action === true ?
        setDashboardYear(prevState => prevState + 1) :
        setDashboardYear(prevState => prevState - 1)
    }

    return (
        <main className="page-main">
            <div className="calendar">
                <div className="calendar__head">
                    <span
                        className="calendar__month-change"
                        onClick={prevMonth}>
                        {dashboardMonth === 0 ? months[11] : months[dashboardMonth - 1]}
                    </span>
                    <h1>{months[dashboardMonth]} {dashboardYear}</h1>
                    <span
                        className="calendar__month-change"
                        onClick={nextMonth}>
                        {dashboardMonth === 11 ? months[0] : months[dashboardMonth + 1]}
                    </span>
                </div>
                <div className="calendar__day-name">Понедельник</div>
                <div className="calendar__day-name">Вторник</div>
                <div className="calendar__day-name">Среда</div>
                <div className="calendar__day-name">Четверг</div>
                <div className="calendar__day-name">Пятница</div>
                <div className="calendar__day-name">Суббота</div>
                <div className="calendar__day-name">Воскресенье</div>
                {daysOfPrevMonth()}
                {getDaysOfMonth()}
            </div>
        </main>
    );
};