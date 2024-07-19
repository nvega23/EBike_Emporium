import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = async (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.length > 1) {
            try {
                const response = await fetch(`/api/posts/search-suggestions?query=${value}`);
                const data = await response.json();

                if (Array.isArray(data)) {
                    setSuggestions(data);
                    setShowSuggestions(true);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/posts?search=${searchValue}`);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchValue(suggestion.title);
        setShowSuggestions(false);
        navigate(`/posts?search=${suggestion.title}`);
    };

    return (
        <div className='page-container'>
            <div id='searchbar-wrapper'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    className='search-bar'
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className='suggestions-dropdown'>
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.imageUrl && <img src={suggestion.imageUrl} alt={suggestion.title} className='suggestion-image' />}
                                <span>{suggestion.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
