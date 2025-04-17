import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { CreateIpLoggerPage } from "../pages/Create";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<CreateIpLoggerPage/>}/>
        </Routes>
    );
}