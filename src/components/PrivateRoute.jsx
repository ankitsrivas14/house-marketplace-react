//REACT
import { Navigate, Outlet } from "react-router-dom"

//CUSTOM HOOKS
import useAuthStatus from "../hooks/useAuthStatus";

//COMPONENTS
import Spinner from "./Spinner";

function PrivateRoute() {
    const { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus){
        return <Spinner />
    }

    return (
        loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
    )
}

export default PrivateRoute