import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { api } from 'src/api/api';
import { userKeys } from './queryKeys';

export interface Props {
  setFlashMessage: any;
  hideModal: () => void;
}

export function useDeleteUser({ setFlashMessage, hideModal }: Props) {
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
      hideModal();
    },
  });

  return mutation;
}
