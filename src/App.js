//REACT
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//PAGES
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

//COMPONENTS
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

//IMPORTS
import { ToastContainer } from 'react-toastify';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Explore />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/profile" element={<PrivateRoute />} >
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
            <Navbar />
            <ToastContainer />
        </Router>
    );
}

export default App;
