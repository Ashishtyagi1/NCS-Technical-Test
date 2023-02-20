import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

const ErrorPage = () => {
    const history = useNavigate();

    const handleBackToLogin = () => {
        history('/login');
    }

    return(
        <div className="error-page">
            <Button onClick={handleBackToLogin} style={{width:'20%'}} variant="contained"> Go to Login Page </Button>
        </div>
    )
}
export default ErrorPage;