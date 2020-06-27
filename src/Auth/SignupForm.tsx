import React from 'react';
import { useToasts } from 'react-toast-notifications';
// import { useHistory } from 'react-router-dom';

// import { AuthContext } from '../context/auth';
import { strings } from './constants';
// import userIcon from '../assets/images/userIcon.svg';
import passwordIcon from '../assets/images/passwordIcon.svg';
import emailIcon from '../assets/images/emailIcon.svg';
import { auth, firestore } from '../firebase';
// import { firestore } from '../firebase';
// import { Link } from 'react-router-dom';

import '../App.css';

const {
    SIGN_UP_SUBTITLE,
    SIGN_IN
} = strings;


const Loader = () => (
    <div className="loader">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
    </div>
);

export const  SignupForm : React.FC<any> = ({ handleSelectView }) => {
    //const context = useContext(AuthContext);
    const { addToast } = useToasts();
   // const history = useHistory();
    const [signupInfo, setSignupInfo] = React.useState({ email: '', password: '' });
    const [loading, setLoading] = React.useState<boolean>(false);
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSignupInfo({
            ...signupInfo, [e.target.name]: e.target.value,
        });
    };
    const { email, password } = signupInfo;
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        auth.createUserWithEmailAndPassword(email, password)
          .then((new_user: any) => {
            console.log("new user", new_user);
            firestore
            .collection('users')
            .add({
              email: new_user.user.email,
              userId: new_user.user.uid
            })
                addToast(`Registration successful, proceed to login`, {
                    appearance: 'success',
                    autoDismiss: true,
                });
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
            addToast(errorMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
          }).then(() => setLoading(false))
      };


    return (
    <div className="wrapper">
    <form className="sigininWrapper"
        onSubmit={(e)=>handleFormSubmit(e)}
    >
        <div>
            <h1>{SIGN_UP_SUBTITLE}</h1>
        </div>
        <div className="inputWrap">
        <div className="username">
        <img src={emailIcon} alt="email" />
            <input
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={handleInputChange}
            />
        </div>
        <div className="username">
        <img src={passwordIcon} alt="password" />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
            />
        </div>
        <button
            type="submit"
            disabled={loading ? true : false}
            className="button"
        >
            {
                !loading ? 'Register' : <Loader />
            }

        </button>
        <div className="signinAndsignup">
            <p>Already have an account?</p>
            <div className="link" onClick={() => handleSelectView()}>
                {SIGN_IN}
            </div>
        </div>
        </div>
    </form>
    </div>
)
 };