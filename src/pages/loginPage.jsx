import '../assets/css/loginPage.css'
import { useState } from 'react';
import { Input, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        posCode: '',
        city: '',
        email: '',
        password: '',
    })

    function handleButton () {
        navigate('/')
    }

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box'>
                    <h3>SIGN IN</h3>
                    <form className='input-container' >
                        
                        <Input setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} />
                        {/* <p className='sign-up'>Already a user ? <b>Sign In</b></p> */}

                        <button onClick={handleButton} className='basic-button'>Sign in</button>
                        <p className='sign-up'>New user ? <b onClick={() => navigate('/register')}>Sign Up</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}