import { useQueryClient, useMutation } from 'react-query';
import { useContext } from 'react';
import axios from 'axios';
import { AppContext } from 'src/providers/AppContextProvider';
import { api } from 'src/api/api';
import { userKeys } from './queryKeys';

export function useCreateUser() {
  const { setFlashMessage } = useContext(AppContext);
  const queryClient = useQueryClient();

  // https://react-query.tanstack.com/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo
  const createUser = async (newUser: any) => {
    const response = await axios.post(api, newUser);
    return response.data;
  };

  const mutation = useMutation(createUser, {
    onMutate: async (newUser) => {
      await queryClient.cancelQueries(userKeys.all);
      const previousUsers = queryClient.getQueryData(userKeys.all);
      queryClient.setQueryData(userKeys.all, (oldData: any) => [
        ...oldData,
        newUser,
      ]);
      return { previousUsers };
    },
    onSuccess: (data) => {
      setFlashMessage(
        `New User Created - Id: ${data.id} Name: ${data.first_name} ${data.last_name}`
      );
    },
    onError: (err, newUser, context?: any): Promise<unknown> | void => {
      queryClient.setQueryData(userKeys.all, context.previousUsers);
    },
    onSettled: () => {
      queryClient.invalidateQueries(userKeys.all);
    },
  });

  return mutation;
}
