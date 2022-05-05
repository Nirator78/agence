import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Headers from "../component/Headers";


function Interface(props) {
    // add footer and menu here too add it to every pages
    return (
        <div sx={{ flexDirection: "column", minHeight: "100vh" }}>
            <Headers />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Interface;