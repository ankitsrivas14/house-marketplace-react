//REACT
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'

//ICONS
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData;

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>

                <form action="">
                    <input 
                        type="email" 
                        className="emailInput" 
                        placeholder="Email" 
                        id="email" 
                        value={email} 
                        onChange={onChange} 
                    />
                    <div className="passwordInputDiv">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            className="passwordInput" 
                            placeholder="Password" 
                            id="password" 
                            value={password} 
                            onChange={onChange} 
                        />
                        <img className="showPassword" src={visibilityIcon} onClick={() => setShowPassword((prev) => !prev) } />
                    </div>
                    <Link to='/forgot-password' className="forgotPasswordLink">Forgot Password?</Link>
                    <div className="signInBar">
                        <p className="signInText">Sign In</p>
                        <button className="signInButton">
                            <ArrowRightIcon fill="#fff" width='34px' height='34px' />
                        </button>
                    </div>
                </form>
                <Link to='/sign-up' className="registerLink">Sign up instead</Link>
            </div>
        </>
    )
}

export default SignIn