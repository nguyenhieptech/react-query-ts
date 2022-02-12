import { Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from './components/Navbar';
import Users from './views/User/Users';
import InfiniteQuery from './views/User/InfiniteQuery';
import PaginatedQuery from './views/User/PaginatedQuery';
import CreateUser from './views/User/CreateUser';
import EditUser from './views/User/EditUser';
import SearchUser from './views/User/SearchUser';

Modal.setAppElement('#modal-root');

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container p-4 mx-auto mt-8 lg:w-screen-lg">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/search" element={<SearchUser />} />
          <Route path="/paginated" element={<PaginatedQuery />} />
          <Route path="/infinite" element={<InfiniteQuery />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
