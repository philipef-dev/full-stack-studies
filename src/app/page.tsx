"use client";

import { useEffect, useState, useRef } from 'react';
import { Edit, Trash } from 'lucide-react';
import api from './services/api';

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const inputName = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);

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

  async function deleteUsers(id: number) {
    try {
      await api.delete(`/user/${id}`);
      getUsers();
    } catch (error) {
      console.log("Erro ao deletar usuário", error);
    }
  }

  async function createUsers(event: React.FormEvent) {
    event.preventDefault();

    if (!inputName.current?.value || !inputEmail.current?.value || !inputAge.current?.value) {
      alert("Preencha todos os campos");
      return;
    }

    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();
    const age = parseInt(inputAge.current.value);;

    try {
      if (editingUser) {
        await api.put(`/user/${editingUser.id}`, {
          name,
          email,
          age
        });
        getUsers();
        inputName.current.value = "";
        inputEmail.current.value = "";
        inputAge.current.value = "";
        setEditingUser(null);
        return;

      } else {

        await api.post("/user", {
          name,
          email,
          age
        });
        getUsers();
        inputName.current.value = "";
        inputEmail.current.value = "";
        inputAge.current.value = "";

      }
    } catch (error) {
      console.log(error);
    };
  }

  function handleEditUser(user: User) {
    if (!inputName.current || !inputEmail.current || !inputAge.current) {
      return;
    }

    inputName.current.value = user.name;
    inputEmail.current.value = user.email;
    inputAge.current.value = user.age.toString();

    setEditingUser(user);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-4 rounded shadow-md w-1/3">
        <h1 className="text-2xl text-center mb-4 font-semibold">Cadastro de Usuários</h1>
        <div className="mb-2">
          <label
            htmlFor="name"
            className="block font-medium text-sm text-gray-700"
          >
            Nome:
          </label>
          <input
            id="name"
            type="text"
            ref={inputName}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block font-medium text-sm text-gray-700"
          >
            E-mail:
          </label>
          <input
            type="email"
            ref={inputEmail}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="idade"
            className="block font-medium text-sm text-gray-700"
          >
            Idade:
          </label>
          <input
            type="number"
            ref={inputAge}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-2 text-center">
        <button
            type="submit"
            className={`px-4 py-2 rounded-md transition-all ${
              editingUser
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            onClick={createUsers}
          >
            {editingUser ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <div className="bg-white p-4 rounded shadow-md w-1/3 mt-4">
        <h1 className="text-2xl text-center mb-4 font-semibold">Usuários Cadastrados</h1>

        {users.map((user) => (
          <ul key={user.id} className="mb-2 border-b pb-2">
            <li>Nome: {user.name}</li>
            <li>E-mail: {user.email} </li>
            <li>Idade: {user.age}</li>
            <div className='flex justify-end mt-2'>
              <button
                type='button'
                className='text-blue-500 hover:text-blue-700 mr-1'
                onClick={() => {handleEditUser(user)}}
              >
                <Edit size={18} />
              </button>
              <button
                type='button'
                className='text-red-500 hover:text-red-700'
                onClick={() => deleteUsers(user.id)}
              >
                <Trash size={18} />
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  )
}