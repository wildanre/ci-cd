import '../assets/css/loginPage.css'
import { useState } from 'react';
import { Input, PasswordInput } from '../components/input';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
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

    return (
        <div className='login-container'>
            <div className='border-container'>
                <div className='login-box'>
                    <h3>SIGN UP</h3>
                    <form className='input-container' >
                        <div className='dual-input'>
                            <Input setState={setData} state={data} value={'firstName'} placeHolder={'First Name'} />
                            <Input setState={setData} state={data} value={'lastName'} placeHolder={'Last Name'} />
                        </div>
                        <div className='dual-input'>
                            <Input setState={setData} state={data} value={'address'} placeHolder={'Address'} />
                            <div className='dual-input'>
                                <Input setState={setData} state={data} value={'posCode'} placeHolder={'Pos Code'} />
                                <Input setState={setData} state={data} value={'city'} placeHolder={'City'} />
                            </div>
                        </div>
                        <Input setState={setData} state={data} value={'email'} placeHolder={'Email'} />
                        <PasswordInput setState={setData} state={data} value={'password'} placeHolder={'Password'} suggest={true} strength={true}/>

                        <button type='submit' className='basic-button'>Register</button>
                        <p className='sign-up'>Already a user ? <b onClick={() => navigate('/login')}>Sign In</b></p>
                    </form>
                </div>
            </div>
        </div>
    )
}