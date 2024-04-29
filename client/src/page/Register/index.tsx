import React, { useState } from 'react';
import { registerAPI } from '../../API/auth';
import { useNavigate } from 'react-router-dom';

const initialForm = {
    username: '',
    password: '',
    email: '',
    role: 'student',
};

const Register = () => {
    const [userInfo, setUserInfo] = useState({ ...initialForm });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const changeUserInfo = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setUserInfo((pre) => ({
            ...pre,
            [event.target.id]: event.target.value,
        }));
    };

    const submitUserInfo = async () => {
        if (userInfo.username === '') return setMessage('請輸入用戶名稱');
        if (userInfo.email === '') return setMessage('請輸入信箱');
        if (userInfo.password === '') return setMessage('請輸入密碼');

        const res = await registerAPI(userInfo);
        const data = await res?.json();

        if (res?.status !== 200) return setMessage(data.message);

        alert('恭喜註冊成功，現在幫您跳轉到登入頁面！');
        navigate('/login');
    };

    return (
        <div style={{ padding: '3rem' }} className="col-md-12">
            <div>
                {message && <div className="alert alert-danger">{message}</div>}
                <div>
                    <label htmlFor="username">用戶名稱:</label>
                    <input
                        type="text"
                        value={userInfo.username}
                        className="form-control"
                        id="username"
                        onChange={changeUserInfo}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="email">電子信箱：</label>
                    <input
                        type="text"
                        value={userInfo.email}
                        className="form-control"
                        id="email"
                        onChange={changeUserInfo}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">密碼：</label>
                    <input
                        type="password"
                        value={userInfo.password}
                        className="form-control"
                        id="password"
                        placeholder="長度至少超過6個英文或數字"
                        onChange={changeUserInfo}
                    />
                </div>
                <br />
                <div className="form-group">
                    <label htmlFor="password">身份：</label>
                    <select
                        className="form-control"
                        id="role"
                        onChange={changeUserInfo}
                        value={userInfo.role}
                    >
                        <option value="student">學生</option>
                        <option value="instructor">導師</option>
                    </select>
                </div>
                <br />
                <button onClick={submitUserInfo} className="btn btn-primary">
                    <span>註冊會員</span>
                </button>
            </div>
        </div>
    );
};

export default Register;
