import { useNavigate } from 'react-router-dom';
import './SearchBar.css'
// import searchIcon from '../../assets/searchBar.png'

const SearchBar = () => {
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            navigate(`/posts?search=${e.target.value}`);
        }
    }

    return (
        <div id='searchbar-wrapper'>
                {/* <button><img src={searchIcon} alt='search' className='searchIcon'/> */}
            <input placeholder='Search...' onKeyDown={handleSearch} className='search-bar'/>
                {/* </button> */}
        </div>
    )
}

export default SearchBar;
