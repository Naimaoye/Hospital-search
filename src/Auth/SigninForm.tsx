import React, { useContext, useEffect } from 'react';
import { strings } from './constants';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { auth } from '../firebase';
import passwordIcon from '../assets/images/passwordIcon.svg';
import emailIcon from '../assets/images/emailIcon.svg';
// import { Link } from 'react-router-dom';

import '../App.css';

const {
    SIGN_IN_SUBTITLE,
    SIGN_UP
} = strings;

const Loader = () => (
    <div className="loader">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
    </div>
);

export const SigninForm : React.FC<any> = ({ handleSelectView }) =>{ 
   const context = useContext(AuthContext);
    const { addToast } = useToasts();
    const history = useHistory();
    const [loginInfo, setLoginInfo] = React.useState({ email: '', password: '' });
    const [loading, setLoading] = React.useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLoginInfo({
            ...loginInfo, [e.target.name]: e.target.value,
        });
};
useEffect(() => {

},[]);

const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    auth.signInWithEmailAndPassword(email, password)
      .then((userDetails: any) => {
          console.log("user",userDetails)
        context.login(userDetails.user.uid);
        addToast(`Welcome ${email}`, {
            appearance: 'success',
            autoDismiss: true,
        });
        history.push('/view');
      })
      .catch(function (error) {

        if (error.code.includes("user")) {
          if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
            const emailMessage = "Email not found";
            addToast(emailMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
          } else {
            const emailMessage = error.message;
            addToast(emailMessage, {
                appearance: 'error',
                autoDismiss: true,
            });
          }
        } else {
          if (error.message === "The password is invalid or the user does not have a password.") {
            const Pwdmessage= "Invalid password";
            addToast(Pwdmessage, {
                appearance: 'error',
                autoDismiss: true,
            });
          } else {
            const Pwdmessage= error.message;
            addToast(Pwdmessage, {
                appearance: 'error',
                autoDismiss: true,
            });
          }
        }

      }).then(() => setLoading(false));
  };

    const { email, password } = loginInfo;
    
    return(
    <div className="wrapper">
    <form className="sigininWrapper"
        onSubmit={(e)=>handleFormSubmit(e)}
    >
        <div>
            <h1>{SIGN_IN_SUBTITLE}</h1>
        </div>
        <div className="inputWrap">
        <div className="username">
        <img src={emailIcon} alt="email" />
            <input
                type="email"
                placeholder="email"
                name="email"
                required
                value={email}
                onChange={handleChange}
            />
        </div>
        <div className="username">
        <img src={passwordIcon} alt="password" />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
            />
        </div>
        <button
            type="submit"
            disabled={loading ? true : false}
            className="button"
        >
            {
                !loading ? 'Login' : <Loader />
            }

        </button>
        <div className="signinAndsignup">
            <p>Haven't registered?</p>
            <div className="link" onClick={() => handleSelectView()}>
              {SIGN_UP}
            </div>
        </div>
        </div>
    </form>
    </div>
);
};