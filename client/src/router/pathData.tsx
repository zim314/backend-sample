import BasicLayout from '../layout/BasicLayout';
import Home from '../page/Home';
import Register from '../page/Register';
import Login from '../page/Login';
import Profile from '../page/Profile';
import Course from '../page/Coure';
import PostCourse from '../page/PostCourse';
import Enroll from '../page/Enroll';

const pathData = [
    {
        element: <BasicLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'course',
                element: <Course />,
            },
            {
                path: 'postCourse',
                element: <PostCourse />,
            },
            {
                path: 'enroll',
                element: <Enroll />,
            },
        ],
    },
];

export default pathData;
