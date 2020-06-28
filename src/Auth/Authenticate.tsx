import React from "react";
// import {
//     StyledSection,
// } from './styles';
import { SigninForm } from './SigninForm';
import { SignupForm } from './SignupForm';
// import { AuthContext } from '../../../context/auth';
import '../App.css';

export const Authenticate: React.FC = () => {
//   // const context = useContext(AuthContext);
//     // const { addToast } = useToasts();
//     const history = useHistory();
//     const [loginInfo, setLoginInfo] = React.useState({ username: '', password: '' });
//     const [signupInfo, setSignupInfo] = React.useState({ signupusername: '', signuppassword: '', fullname:''});
//     const [loading, setLoading] = React.useState(false);
        const [selectedItemId, setSelectedItemId] = React.useState(true);


//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//         setLoginInfo({
//             ...loginInfo, [e.target.name]: e.target.value,
//         });
// };

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     setSignupInfo({
//         ...signupInfo, [e.target.name]: e.target.value,
//     });
// };

const handleSelectView = (): void => {
    setSelectedItemId(!selectedItemId);
};

    // const { username, password } = loginInfo;
    // const { signupusername, signuppassword, fullname } = signupInfo;

    // const signinUser = async () => {
    // let myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // let raw = JSON.stringify({"username": username,"password":password});
    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };
    // try {
    //  let fetchRes = await fetch("https://sms-monitor-backend.digitalpulseapi.com/v1/signin", requestOptions);
    //         if(fetchRes.ok){
    //             const data = await fetchRes.json();
    //             context.login(data);
    //             addToast(`Welcome ${username}`, {
    //                 appearance: 'success',
    //                 autoDismiss: true,
    //             });
    //             history.push('/dashboard');
    //         }else{
    //         throw fetchRes;
    //         }
    // } catch (e){
    //    // let err = await e.json();
    //     let msg = 'Login failed';
    //         setLoading(false);
    //         addToast(msg, {
    //             appearance: 'error',
    //             autoDismiss: true,
    //         });
    //     };
    
    // };
    // const handleFormSubmit = e => {
    //     const { username, password } = loginInfo;
    //     if (username !== '' || password !== '') {
    //         e.preventDefault();
    //         setLoading(true);
    //         signinUser();
    //     }
    // };

    return (
        <section className="main">
            <div className="header">
                <p className="title">Hospitals search</p>
                <p className="title-bottom">Know the hospitals around you in case of emergency</p></div>
            <section className="page-body">
            <div className="left-side">
              <div className="visited-search">
                {/* return a list of visited search here */}
              </div>
            </div>
            <div className="right-side">
            <div className="authsection">
                { selectedItemId ? (
                <div>
                <SigninForm
                    handleSelectView={handleSelectView}
                />
                </div>
                ): (
                <div>
                    <SignupForm 
                        handleSelectView={handleSelectView}
                    />
                </div>
                )
                }
            </div>
            </div>
            </section>
            </section>
    );
};

export default Authenticate