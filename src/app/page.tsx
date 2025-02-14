"use client";

import React, { useState, useEffect } from 'react';
import { Edit, Trash } from 'lucide-react';
import api from './services/api';
import useUsers from './hooks/useGetUsers';
import useDeleteUsers from './hooks/useDeleteUsers';

type User = {
  id: number;
  name: string;
  email: string;
  age: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { users, getUsers } = useUsers();
  const { deleteUsers } = useDeleteUsers();

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setAge(editingUser.age);
    }
  }, [editingUser]);

  function reseatForm() {
    setName("");
    setEmail("");
    setAge("");
    setEditingUser(null);
  }

  async function createOrUpdateUser() {
    if (!name.trim() || !email.trim() || !age.trim()) {
      alert('Todos os campos são obrigatórios');
      return
    }

    try {
      if (editingUser) {
        await api.put(`/user/${editingUser.id}`, {
          name,
          email,
          age
        });
        getUsers();
        reseatForm();
      } else {
        await api.post("/user", {
          name,
          email,
          age
        });
        getUsers();
        reseatForm();
      }
    } catch (error) {
      console.log(error);
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createOrUpdateUser();
  }

  function handleEditUser(user: User) {
    setEditingUser(user);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-4 rounded shadow-md w-1/3"
        onSubmit={handleSubmit}
      >
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="age"
            className="block font-medium text-sm text-gray-700"
          >
            Idade:
          </label>
          <input
            id='age'
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 required"
          />
        </div>
        <div className="mb-2 text-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md transition-all ${editingUser
              ? "bg-yellow-500 text-white hover:bg-yellow-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
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
                onClick={() => { handleEditUser(user) }}
              >
                <Edit size={18} />
              </button>
              <button
                type='button'
                className='text-red-500 hover:text-red-700'
                onClick={() => deleteUsers(user.id, getUsers)}
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