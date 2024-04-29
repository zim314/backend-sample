import basicFatch from './basic';
import getCurrentUser from 'utils/getCurrentUser';

const path = 'http://localhost:4545/api/courses';
const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: getCurrentUser() ? getCurrentUser().token : null,
});

interface CourseInfo {
    title: string;
    description: string;
    price: string;
}

export const createCourseAPI = async (courseInfo: CourseInfo) => {
    const url = path + '/create';
    const params = {
        method: 'POST',
        body: JSON.stringify(courseInfo),
        headers,
    };
    const res = await basicFatch(url, params);
    return res;
};

export const enrollCourseAPI = async (courseID: string) => {
    const params = { headers };
    const res = await basicFatch(path + `/enroll/${courseID}`, params);
    return res;
};

export const useIDSreachCourseAPI = async (courseID?: string) => {
    const url = courseID ? path + `/${courseID}` : path;
    const params = { headers };
    const res = await basicFatch(url, params);
    return res;
};

export const useKeywordSreachCourseAPI = async (keyword: string) => {
    const params = {
        method: 'POST',
        body: JSON.stringify({ keyword }),
        headers,
    };
    const res = await basicFatch(path, params);
    return res;
};

export const getInstructorOrStudentACourseAPI = async (
    identities: string,
    ID: string
) => {
    const url = path + `/${identities}/${ID}`;
    const params = { headers };
    const res = await basicFatch(url, params);
    return res;
};
