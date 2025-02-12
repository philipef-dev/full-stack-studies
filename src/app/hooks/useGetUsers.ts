import { useState, useEffect } from "react";
import api from "../services/api";

type User = {
    id: number;
    name: string;
    email: string;
    age: number;
}

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    async function getUsers() {
        try {
            const userFromApi = await api.get("/users");

            if (!userFromApi.data) {
                console.log("Nenhum usuário cadastrado");
                return;
            }

            setUsers(userFromApi.data);
        } catch (error) {
            console.log("Erro ao buscar usuários", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return { users, getUsers };

}

export default useUsers;