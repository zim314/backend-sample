import basicFatch from 'API/basic';

const path = 'http://localhost:4545/api/user/';

export interface UserInfo extends EmailAndPassword {
    username: string;
    role: string;
}

interface EmailAndPassword {
    email: string;
    password: string;
}

export const registerAPI = async (user: UserInfo) => {
    const url = path + 'register';
    const params = {
        method: 'POST',
        body: JSON.stringify(user),
    };
    const res = await basicFatch(url, params);
    return res;
};

export const loginAPI = async (emailAndPassword: EmailAndPassword) => {
    const url = path + 'login';
    const params = {
        method: 'POST',
        body: JSON.stringify(emailAndPassword),
    };
    const res = await basicFatch(url, params);
    return res;
};
