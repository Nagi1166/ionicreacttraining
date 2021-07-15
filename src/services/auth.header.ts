export default function getHeader() {
    const user = JSON.parse(String(localStorage.getItem('training_user')));

    if (user && user.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}