import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Input = ({ handleSearch, query, setQuery }) => {
  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search city by name..."
        value={query}
      />
      <button>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default Input;
