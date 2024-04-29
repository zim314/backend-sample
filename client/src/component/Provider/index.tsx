import { createContext, useState } from 'react';
import getCurrentUser from '../../utils/getCurrentUser';

interface Props {
    children: React.ReactNode;
}

export const UserInfoContext = createContext<{
    userInfo: any;
    setUserInfo: React.Dispatch<any>;
} | null>(null);

const Provider = ({ children }: Props) => {
    const [userInfo, setUserInfo] = useState(getCurrentUser());

    return (
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export default Provider;
