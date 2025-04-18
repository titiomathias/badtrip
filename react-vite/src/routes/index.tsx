import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { IpLoggerPage } from "../pages/Iplogger";
import { BadtripsPage } from "../pages/Badtrips";
import { CreateIpLoggerPage } from "../pages/Create";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<CreateIpLoggerPage/>}/>
            <Route path="/domain/:id" element={<IpLoggerPage/>}/>
            <Route path="/badtrips" element={<BadtripsPage/>}/>
        </Routes>
    );
}