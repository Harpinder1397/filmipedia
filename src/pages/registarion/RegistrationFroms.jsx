import SignIn from "../../pages/sign-in";
import { Link, useLocation } from "react-router-dom";
import RegistrationStep1 from "./RegistrationStep1"

const RegistrationForms = () => {
    const location = useLocation(); // React Hook

    const renderForm = () => {
        if(location.pathname.includes('register')){
           return <RegistrationStep1 />
        }else {
           return <SignIn />
        }
    }

    return (
        <div className="registarion-container">
            <div className="left-side-container">
            {renderForm()}
            <Link to="/database" className="homepage-link">
                Return to Homepage
            </Link>
            </div>
            <div className="guidance-container">
                <div>
                    <h1 className="heading-h1">Join the filmipedia!</h1>
                    <ul className="about-application">
                        <li>Lorem Ipsum is simply dummy industry.</li>
                        <li>Lorem Ipsum is simply dummy text typesetting industry.</li>
                        <li>Lorem Ipsum is simply dummy text and typesetting industry.</li>
                    </ul>
                </div>
            </div>
                
        </div>
    )
}

export default RegistrationForms;