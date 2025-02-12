import api from "../services/api";
import getUsers from '../hooks/useGetUsers';
const useDeleteUsers = () => { 
    
    async function deleteUsers(id: number) {
        try {
          await api.delete(`/user/${id}`);
            getUsers();
        } catch (error) {
          console.log("Erro ao deletar usuário", error);
        }
      }  
    return { deleteUsers }; 
};

export default useDeleteUsers;