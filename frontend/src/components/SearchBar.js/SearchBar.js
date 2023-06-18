import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            navigate(`/posts?search=${e.target.value}`);
        }
    }

    return (
        <div id='searchbar-wrapper'>
            <input placeholder='Search...' onKeyDown={handleSearch} id='searchbar'></input>
        </div>
    )
}

export default SearchBar;
