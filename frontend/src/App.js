import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';

const playersReducer = (state, action) => {
    switch (action.type) {
        case 'PLAYERS_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case 'PLAYERS_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'PLAYERS_FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const baseURL = "http://localhost:7000/api/getFromName?name=";

const App = () => {

    const [url, setUrl] = React.useState(`${baseURL}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, dispatchPlayers] = React.useReducer(
        playersReducer,
        { data: [], isLoading: false, isError: false }
    );



    const handleFetchPlayers = React.useCallback(() => {
        // if (!searchTerm) return;

        dispatchPlayers({ type: 'PLAYERS_FETCH_INIT' });

        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                dispatchPlayers({
                    type: 'PLAYERS_FETCH_SUCCESS',
                    payload: response.data,
                });
            })
            .catch(() => {
                dispatchPlayers({ type: 'PLAYERS_FETCH_FAILURE' })
            });
    }, [url]);

    React.useEffect(() => {
        handleFetchPlayers();
    }, [handleFetchPlayers]);

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
        console.log(searchTerm);
    };

    const handleSearchSubmit = event => {
        setUrl(`${baseURL}${searchTerm}`);

        event.preventDefault();
    };

    return (
        <div>
            <h1>NBA Rankings</h1>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />

            <hr />

            {searchedPlayers.isError && <p>Something went wrong ...</p>}

            {searchedPlayers.isLoading ? (<p>Loading ...</p>) : (<List list={searchedPlayers.data} />)}
        </div>
    );
}

export default App;