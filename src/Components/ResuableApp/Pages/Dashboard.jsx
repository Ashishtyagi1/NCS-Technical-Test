import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ReusableComponents/ErrorPage";
import ProfileCard from "../ReusableComponents/ProfileCard";
import { Grid } from '@mui/material';
import NavBar from "../ReusableComponents/NavBar";
import Signup from "./Signup";
import ChartPage from "./ChartPage";

const Dashboard = () => {
    const [loginData, setLoginData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [page, setPage] = useState("dashboard");
    const [deletePopup, setDeletePopup] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState('');
    const history = useNavigate();

    // handling delete confirmation popup
    const handleDeletePopup = (index) => {
        setDeletePopup(!deletePopup);
        setDeleteIndex(index);
    }

    useEffect(() => {
        // setting a parameter for login authentication
        const getuser = localStorage.getItem('user_login');
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user);
        }

        // setting data of users after login to a variable
        const loginuser = localStorage.getItem('loginuser')
        if (loginuser && loginuser.length) {
            let info = JSON.parse(loginuser)
            setUserData(info);
        }
    }, [])

    // handling removing a user after confirmation
    const removeUser = () => {
        const _users = userData.filter((item, userIndex) => {
            return deleteIndex !== userIndex
        })
        setUserData(_users);
        localStorage.setItem('loginuser', JSON.stringify(_users));
    }

    // setting a parameter in localstorage for saving index of user to be edited
    const handleEdit = (idx) => {
        setPage('edit');
        localStorage.setItem('editIndex', idx);
    }

    const cardGrid = (
        <Grid container spacing={2}>
            {
                userData && userData.map((item, index) => {
                    return (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <ProfileCard
                                carduser={item.values}
                                removeUser={removeUser}
                                _index={index}
                                gender={item.gender}
                                startDate={item.startDate}
                                handleEdit={handleEdit}
                                handleDeletePopup={handleDeletePopup}
                                deletePopup={deletePopup}
                            />
                        </Grid>
                    )
                })
            }
        </Grid>
    )

    const handleLogOut = () => {
        localStorage.removeItem('user_login');
        history('/login');
    }

    const handlePageSwitch = (value) => {
        setPage(value);
    }
    return (
        <>
            {loginData.length === 0 ? <ErrorPage /> :
                <>
                    <NavBar handleLogOut={handleLogOut} handlePageSwitch={handlePageSwitch} />
                    {(() => {
                        switch (page) {
                            case 'dashboard':
                                return <>{cardGrid}</>;
                            case 'chart':
                                return <ChartPage userData={userData} />;
                            case 'add':
                                return <Signup action='adduser' />;
                            case 'edit':
                                return <Signup action='edituser' />;
                            default:
                                return <> {cardGrid}</>;
                        }
                    })()}
                </>
            }
        </>
    )
}
export default Dashboard;