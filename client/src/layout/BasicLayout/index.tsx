import { Outlet } from 'react-router-dom';
import Navber from '../../component/Navber';

const BasicLayout = () => {
    return (
        <>
            <Navber />
            <Outlet />
        </>
    );
};

export default BasicLayout;
