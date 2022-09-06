//REACT
import { useState } from "react"
import { Link } from "react-router-dom"

//FIREBASE
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

//IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//COMPONENTS
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

function ForgotPassword() {

    const [email, setEmail] = useState('');

    const onChange = (e) => {
        setEmail(e.target.value);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email)
            toast.success('Email was sent');
        } catch (error) {
            toast.error('Cound not send reset email');
        }
    }

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input type="email" className="emailInput" id="email" value={email} placeholder="Email" onChange={onChange} />
                    <Link className="forgotPasswordLink" to='/sign-in'>Sign in</Link>
                    <div className="signInBar">
                        <div className="signInText">Send Reset Link</div>
                        <button type="submit" className="signInButton">
                            <ArrowRightIcon fill='#fff' width='34px' height='34px' />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword