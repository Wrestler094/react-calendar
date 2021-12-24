import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase-config";
import {userAuth} from "./redux/userAuth";
import "./App.scss"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Class from "./pages/Class/Class";
import Group from "./pages/Groups/Groups";
import Day from "./pages/Day/Day";
import GroupEdit from "./pages/GroupEdit/GroupEdit";
import Page404 from "./pages/Page404/Page404";

export default function App() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    onAuthStateChanged(auth, (currentUser) => {
        dispatch(userAuth(currentUser))
        currentUser
            ? localStorage.setItem('authUser', JSON.stringify(currentUser))
            : localStorage.removeItem('authUser')
    })

    function Layout() {
        return (
            <div className="dashboard">
                <Header />
                <Sidebar />
                <Outlet />
            </div>
        )
    }

    if (user) {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="groups" element={<Group />} />
                    <Route path="groups/edit/:group" element={<GroupEdit />} />
                    <Route path="dashboard/day/:day" element={<Day />} />
                    <Route path="dashboard/day/:day/group/:group" element={<Class />} />
                </Route>
                <Route path="/login" element={<Navigate to="/dashboard" />} />
                <Route path="/register" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        )
    }
    return (
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/groups/*" element={<Navigate to="/login" />} />
                <Route path="/dashboard/*" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
    )
}