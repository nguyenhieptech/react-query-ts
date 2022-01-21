import UserTable from 'src/components/UserTable';
import { useUsers } from './hooks/useUsers';

function Users() {
  const getUsers = useUsers();

  return (
    <div>
      <h2 className="mb-4">Basic Query Example</h2>
      <div>
        {getUsers.isLoading && <div>Loading...</div>}

        {getUsers.isFetching && <div>Fetching...</div>}

        {getUsers.error instanceof Error && <div>{getUsers.error.message}</div>}

        {getUsers.isSuccess && (
          <div>
            <UserTable users={getUsers.data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
