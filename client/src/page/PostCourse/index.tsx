import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getCurrentUser from 'utils/getCurrentUser';
import { createCourseAPI } from 'API/course';

const initialForm = {
    title: '',
    description: '',
    price: '',
};

const PostCourse = () => {
    const [course, setCourse] = useState(initialForm);
    const [message, setMessage] = useState('');

    const user = getCurrentUser().user;
    const navigate = useNavigate();

    const changeCourseForm = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCourse((pre) => ({
            ...pre,
            [event.target.id]: event.target.value,
        }));
    };

    const sumbitCourse = async () => {
        if (course.title === '') return setMessage('請填寫課程標題');
        if (course.description === '') return setMessage('請填寫內容');
        if (course.price === '') return setMessage('請填寫價格');

        const res = await createCourseAPI(course);
        const data = await res?.json();
        if (res?.status === 400) return setMessage(data.message);
        window.alert('新課程創建成功!');
        navigate('/course');
    };

    return (
        <div style={{ padding: '3rem' }}>
            {!user && (
                <div>
                    <p>在發布新課程之前，您必須先登錄。</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        帶我進入登錄頁面。
                    </button>
                </div>
            )}
            {user.role !== 'instructor' && (
                <div>
                    <p>只有講師可以發布新課程。</p>
                </div>
            )}
            {message && (
                <div className="alert alert-warning" role="alert">
                    {message}
                </div>
            )}
            {user.role === 'instructor' && (
                <div className="form-group">
                    <label htmlFor="title">課程標題：</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        onChange={changeCourseForm}
                    />
                    <br />
                    <label htmlFor="description">內容：</label>
                    <textarea
                        id="description"
                        className="form-control"
                        aria-describedby="emailHelp"
                        onChange={changeCourseForm}
                    />
                    <br />
                    <label htmlFor="price">價格：</label>
                    <input
                        id="price"
                        type="number"
                        className="form-control"
                        onChange={changeCourseForm}
                    />
                    <br />
                    <button className="btn btn-primary" onClick={sumbitCourse}>
                        交出表單
                    </button>
                    <br />
                    <br />
                </div>
            )}
        </div>
    );
};

export default PostCourse;
