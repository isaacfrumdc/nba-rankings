import React from 'react';
import InputWithLabel from './InputWithLabel';
import { IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import styles from './App.module.css';


const SearchForm = ({
    searchTerm,
    onSearchInput,
    onSearchSubmit,
}) => (
        <form onSubmit={onSearchSubmit} className={styles.searchForm}>
            <InputWithLabel
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}
            >
                <strong>Search:</strong>
            </InputWithLabel>
            {/* <button type="submit" disabled={!searchTerm}>
                Submit
         </button> */}
            <IconButton
                type="submit" disabled={!searchTerm}
                aria-label='Search database'
                icon={<SearchIcon />}
            />
        </form>
    );

export default SearchForm;