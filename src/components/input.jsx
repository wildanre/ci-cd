
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useEffect, useState } from 'react';

function passwordStrengthParameter(password) {
    // Define a regular expression to match common patterns
    var patterns = {
        medium: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@!%-+=_)(*?&^';":/.{},?><\[\]]).{10,}$/
    };

    // Check the password against the defined patterns
    if (patterns.strong.test(password)) {
        return {status: "strong", color: '#33c770'};
    } else if (patterns.medium.test(password)) {
        return {status: "medium", color: '#ceb532'};
    } else if (password.length > 5) {
        return {status: "weak", color: '#ff2929'};
    } else {
        return {status: "very weak", color: 'gray'};
    }
}

export function PasswordInput({ state, setState, value, placeHolder, strength }) {
    const [isHide, setIsHide] = useState(true)
    const [password, setPassword] = useState({desc: '', color: ''})
    function handleIsHide() {
        setIsHide(!isHide)
    }

    function handleChangeState(e) {
        if (!value) setState(e.target.value)
        else setState({ ...state, [value]: e.target.value })
    }

    useEffect(() => {
        let temp = {}
        if (!value) temp = passwordStrengthParameter(state)
        else temp = passwordStrengthParameter(state[value])
        setPassword(temp)
    }, [state])

    return (
        <div className='inputBox'>
            <input type={isHide ? 'password' : 'text'} required value={value ? state[value] : state} onChange={handleChangeState} />
            <span>{placeHolder}</span>
            {strength && <p style={{border: `1px solid ${password.color}`, color: password.color}} className='strength'>{password.status}</p>}
            {isHide ?
                <VisibilityOutlinedIcon onClick={handleIsHide} /> :
                <VisibilityOffOutlinedIcon onClick={handleIsHide} />
            }
        </div>
    )
}

export function Input({ state, setState, value, placeHolder }) {
    function handleChangeState(e) {
        if (!value) setState(e.target.value)
        else setState({ ...state, [value]: e.target.value })
    }

    return (
        <div className='inputBox'>
            <input type='text' required value={value ? state[value] : state} onChange={handleChangeState} />
            <span>{placeHolder}</span>
        </div>
    )
}