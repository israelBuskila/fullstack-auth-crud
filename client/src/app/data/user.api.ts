import { UserInterface } from "../types/userInterface";
import { api } from "./api";

const UserApi = {
    getUsers: async () => {
        const res = await api.get('/users');
        return res;
    },

    getUserById: async (id: number) => {
        const res = await api.get(`/users/${id}`);
        return res.data;
    },

    getUserByEmail: async (email: string) => {
        const res = await api.get(`/users?email=${email}`);
        return res.data;
    },

    createUser: async (user: Omit<UserInterface, 'id'>) => {
        const res = await api.post('/register', user);
        console.log(res)
        return res;
    },

    updateUser: async (user: UserInterface) => {
        const res = await api.put(`/users/${user.id}`, user);
        return res.data;
    },

    deleteUser: async (id: string) => {
        const res = await api.delete(`/users/${id}`);
        return res.data;
    },

    loginUser: async (credentials: { email: string; password: string }) => {
        const res = await api.post('/login', credentials);
        return res;
    },

    logoutUser: async () => {
        await api.post('/logout');
    },
};

export default UserApi;
