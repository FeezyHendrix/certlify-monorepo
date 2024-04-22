import { Outlet } from "react-router-dom";
import React from "react";

const UnauthenticatedLayout:  React.FC = () => {
    return (
        <div>
        <Outlet />
        </div>
    );
}

export default UnauthenticatedLayout;