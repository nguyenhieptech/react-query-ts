import { useState } from 'react';
import PaginatedQuery from './PaginatedQuery';

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');

  function handleChange(e: any) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <input type="text" value={searchQuery} onChange={handleChange} />
      This is search User. I haven't implemented it yet.
      {/* <PaginatedQuery /> */}
    </>
  );
}

export default SearchUser;
