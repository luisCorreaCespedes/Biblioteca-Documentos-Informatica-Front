import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedAdmin() {
    const {loading, user} = useAuth();

    if (loading) return <div></div>;
    if (!loading && (user.usertype !== "admin")) return <Navigate to='/inicio' replace />
    return(
        <Outlet />
    )
};

export default ProtectedAdmin;