import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { api } from 'src/api/api';
import { userKeys } from './queryKeys';

export function useUser() {
  // https://reactrouter.com/docs/en/v6/api#useparams
  const { id }: any = useParams();

  // https://react-query.tanstack.com/guides/query-functions#query-function-variables
  const getUser = async () => {
    const response = await axios.get(`${api}/${id}`);
    return response.data;
  };

  const user = useQuery(userKeys.detail(id), getUser, {
    retry: 1,
  });

  return user;
}

export function useEditUser() {
  const { id }: any = useParams();
  const queryClient = useQueryClient();

  // https://react-query.tanstack.com/guides/optimistic-updates#updating-a-single-todo
  const editUser = async (updatedUser: any) => {
    return await axios.put(`${api}/${id}`, updatedUser);
  };

  const mutation = useMutation(editUser, {
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries(userKeys.detail(id));
      const previousUser = queryClient.getQueryData(userKeys.detail(id));
      queryClient.setQueryData(userKeys.detail(id), updatedUser);
      return { previousUser: previousUser, updatedUser: updatedUser };
    },
    onError: (err, updatedUser, context?: any): Promise<unknown> | void => {
      queryClient.setQueryData(userKeys.detail(id), context.previousUser);
    },
    onSettled: () => {
      queryClient.invalidateQueries(userKeys.all);
    },
  });

  return mutation;
}
