import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { api } from 'src/api/api';
import { userKeys } from './queryKeys';

export interface Props {
  setFlashMessage: any;
  closeModal: () => void;
}

export function useDeleteUser({ setFlashMessage, closeModal }: Props) {
  const queryClient = useQueryClient();

  const deleteUser = async (id: number) => {
    return await axios.delete(`${api}/${id}`);
  };

  const mutation = useMutation(deleteUser, {
    onError: () => {
      queryClient.invalidateQueries(userKeys.all);
    },
    onSettled: () => {
      queryClient.invalidateQueries(userKeys.all);
      setFlashMessage('Delete Successful!');
      closeModal();
    },
  });

  return mutation;
}
