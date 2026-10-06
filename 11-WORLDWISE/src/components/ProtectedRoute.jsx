import { useNavigate } from "react-router-dom";
import { useFakeAuthContext } from "../contexts/FakeAuthContext"
import { useEffect } from "react";

export default function ProtectedRoute({children}) {
    const {isAuthenticated} = useFakeAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated) navigate("/login");
    }, [isAuthenticated]);

    return children
}