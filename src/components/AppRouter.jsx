import React, { useContext } from "react";
import { AuthContext } from "../context/context";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Game from "../pages/Game";

const AppRouter = () => {
    const { isAuth/* , setIsAuth */ } = useContext(AuthContext);

    return (
        <Routes>
            {isAuth 
            ? <>
                <Route path="/gamename" element={<Game/>}/>
                <Route path="*" element={<Navigate replace to="/gamename"/>}/>
            </>
            : 
            <> 
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<Navigate replace to="/login"/>}/>
            </>
            }
        </Routes>
    );
};

export default AppRouter;
