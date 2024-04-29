import React, { useEffect, useState, useContext } from 'react';
import { UserInfoContext } from '../../component/Provider';
import { useNavigate } from 'react-router-dom';
import { useKeywordSreachCourseAPI, enrollCourseAPI } from '../../API/course';

interface Course {
    title: string;
    description: string;
    price: number;
    instructor: string;
    students: string[];
    __v: number;
    _id: string;
}

const Enroll = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [coursesList, setCoursesList] = useState<Course[] | null>(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const user = useContext(UserInfoContext);

    const handleChangeSearchBar = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchKeyword(event.target.value);
    };

    const searchCourse = async (searchKeyword: string) => {
        setMessage('');
        const res = await useKeywordSreachCourseAPI(searchKeyword);
        const coursesData = await res?.json();
        if (coursesData.courseFound.length === 0) {
            setMessage('沒有查到課程！');
            setCoursesList(null);
            return;
        }
        setCoursesList(coursesData.courseFound);
    };

    const clearSearch = () => {
        setSearchKeyword('');
        searchCourse('');
    };

    const enrollCourse = async (event: any) => {
        const res = await enrollCourseAPI(event.target.id);
        const data = await res?.json();
        if (res?.status !== 200) return setMessage(data.message);
        alert('註冊成功');
        searchCourse('');
    };

    useEffect(() => {
        searchCourse('');
    }, []);

    return (
        <div style={{ padding: '3rem' }}>
            {!user?.userInfo && (
                <div>
                    <p>必須登入後才能看到課程！</p>
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => navigate('/login')}
                    >
                        回到登入頁面
                    </button>
                </div>
            )}
            {user?.userInfo?.user.role !== 'student' && (
                <div>
                    <h1>只有學生才能註冊課程！</h1>
                </div>
            )}
            {user?.userInfo?.user.role === 'student' && (
                <div className="search input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchKeyword}
                        onChange={handleChangeSearchBar}
                    />
                    <button
                        onClick={() =>
                            searchKeyword
                                ? searchCourse(searchKeyword)
                                : searchCourse('')
                        }
                        className="btn btn-primary"
                    >
                        搜尋
                    </button>
                    <button onClick={clearSearch} className="btn btn-primary">
                        清除
                    </button>
                </div>
            )}
            {message && <div className="alert alert-danger">{message}</div>}
            {coursesList && (
                <>
                    {coursesList.map((course: Course) => (
                        <div
                            key={course._id}
                            className="card"
                            style={{ width: '18rem' }}
                        >
                            <div className="card-body">
                                <h5 className="card-title">
                                    課程名稱：{course.title}
                                </h5>
                                <p className="card-text">
                                    {course.description}
                                </p>
                                <p>價格: {course.price}</p>
                                <p>目前的學生人數: {course.students.length}</p>
                                <button
                                    onClick={enrollCourse}
                                    className="card-text btn btn-primary"
                                    id={course._id}
                                >
                                    註冊課程
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Enroll;
