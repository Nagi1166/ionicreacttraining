const setUser = (user: any) => {
    localStorage.setItem("training_user", JSON.stringify(user));
};

const getUser = () => {
    return localStorage.getItem("training_user") ? JSON.parse(String(localStorage.getItem("training_user"))) : null;
};

const removeUser = () => {
    localStorage.removeItem("training_user");
};

export default {
    setUser,
    getUser,
    removeUser
}
