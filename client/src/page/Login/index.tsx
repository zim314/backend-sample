import { loginAPI } from '../../API/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserInfoContext } from '../../component/Provider';

const initialForm = {
    email: '',
    password: '',
};

const Login = () => {
    const [emailAndPassword, setEmailAndPassword] = useState({
        ...initialForm,
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const user = useContext(UserInfoContext);

    const changeEmailOrPassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmailAndPassword((pre) => ({
            ...pre,
            [event.target.id]: event.target.value,
        }));
    };

    const handleLogin = async () => {
        if (emailAndPassword.email === '') return setMessage('信箱不得為空');
        if (emailAndPassword.password === '') return setMessage('請輸入密碼');

        const res = await loginAPI(emailAndPassword);
        const data = await res?.json();

        if (res?.status !== 200) return setMessage(data.message);
        localStorage.setItem('user', JSON.stringify(data));
        user?.setUserInfo(data);
        alert('登入成功，現在幫您跳轉到個人資訊頁面！');
        navigate('/profile');
    };

    return (
        <div style={{ padding: '3rem' }} className="col-md-12">
            <div>
                {message && <div className="alert alert-danger">{message}</div>}
                <div className="form-group">
                    <label htmlFor="username">電子信箱：</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={emailAndPassword.email}
                        onChange={changeEmailOrPassword}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">密碼：</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={emailAndPassword.password}
                        onChange={changeEmailOrPassword}
                    />
                </div>
                <br />
                <div className="form-group">
                    <button
                        className="btn btn-primary btn-block"
                        onClick={handleLogin}
                    >
                        <span>登入系統</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
