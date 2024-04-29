export default function getCurrentUser() {
    return localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user') || '{}')
        : null;
}
