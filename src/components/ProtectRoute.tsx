import {
    Navigate
} from "react-router-dom";


export default function ProtectedRoute({

    children

}: {

    children: React.ReactNode

}) {


    const admin =
        localStorage.getItem("admin");



    if (!admin) {

        return (

            <Navigate
                to="/login"
            />

        );

    }


    return children;


}