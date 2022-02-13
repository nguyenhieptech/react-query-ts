import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteUser } from 'src/views/User/hooks/useDeleteUser';
import { AppContext } from 'src/providers/AppContextProvider';
import DeleteIcon from 'src/icons/delete';
import EditIcon from 'src/icons/edit';
import FlashAlert from './FlashAlert';
import DeleteModal from './DeleteModal';
import './table.css';

function UserTable({ users }: any) {
  const { flashMessage, setFlashMessage } = useContext(AppContext);

  // Delete Modal Show State
  const [deleteId, setDeleteId] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function showDeleteModal(id: number) {
    setDeleteId(id);
    setIsModalOpen(true);
  }

  const deleteMutation = useDeleteUser({ setFlashMessage, closeModal });
  const onDelete = async (id: any) => {
    deleteMutation.mutateAsync(id);
  };

  return (
    <>
      <DeleteModal
        id={deleteId}
        isModalOpen={isModalOpen}
        cancelAction={closeModal}
        deleteAction={onDelete}
        isLoading={deleteMutation.isLoading}
      />

      <div className="flex justify-between items-center mb-4">
        <Link
          to="/user/create"
          className="py-1 px-4 font-semibold text-teal-900 rounded border-2 border-teal-700 hover:text-white hover:bg-teal-800 hover:border-none"
        >
          Create User
        </Link>
        {flashMessage && <FlashAlert message={flashMessage} />}
      </div>
      <table className="table-fixed">
        <thead className="text-white bg-cyan-900">
          <tr className="py-4">
            <th className="w-1/12">Id</th>
            <th className="w-3/12">First Name</th>
            <th className="w-3/12">Last Name</th>
            <th className="w-3/12">Email</th>
            <th className="w-1/12">Gender</th>
            <th className="w-1/12">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user: any) => (
              <tr
                className="bg-white border border-cyan-800 hover:bg-lime-100 active:text-lime-100 active:bg-lime-700"
                key={user.id}
              >
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td className="hover:underline">{user.email}</td>
                <td>{user.gender}</td>
                <td className="inline-flex border-none">
                  <Link
                    className="p-2 text-cyan-800 hover:text-cyan-500"
                    to={`/user/edit/${user.id}`}
                  >
                    <EditIcon />
                  </Link>
                  <button
                    className="p-2 text-cyan-800 hover:text-cyan-500"
                    onClick={() => showDeleteModal(user.id)}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default UserTable;
