const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search tasks..."
      className="w-full p-2 border rounded text-black"
    />
  );
};

export default SearchBar;
