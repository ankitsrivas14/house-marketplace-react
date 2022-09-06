//REACT
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'

//ICONS
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

//FIREBASE
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

//IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//COMPONENTS
import OAuth from "../components/OAuth"


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

    const onSubmit = async (e) => {
        e.preventDefault()
        try{
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential.user){
                navigate('/')
            }
        }
        catch(error){
            toast.error('Bad User Credentials')
        }

    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>

                <form onSubmit={onSubmit}>
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
                <OAuth />
                <Link to='/sign-up' className="registerLink">Sign up instead</Link>
            </div>
        </>
    )
}

export default SignIn