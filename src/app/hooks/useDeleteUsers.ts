import api from "../services/api";

const useDeleteUsers = () => {    
    async function deleteUsers(id: number, getUsers:() => void) {
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