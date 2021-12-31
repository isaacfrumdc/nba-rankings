import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';
import { sortBy } from 'lodash';


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
        case 'SORT_PLAYERS':
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        default:
            throw new Error();
    }
};

const API_BASE = "http://localhost:7000/api/get";
const API_SEARCH = "/getFromName";

const SORTS = {
    NONE: list => list,
    PLAYER: list => sortBy(list, 'player_last_name'),
    TEAM: list => sortBy(list, 'team_city'),
    POSITION: list => sortBy(list, 'position'),
};

const App = () => {

    const [url, setUrl] = React.useState(`${API_BASE}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, dispatchPlayers] = React.useReducer(
        playersReducer,
        { data: [], isLoading: false, isError: false }
    );


    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false
    });

    // React.useEffect(() => {
    //     handleSort();
    //     console.log("effect");
    // }, [sort]);

    const handleSort = key => {
        const isReverse = sort.sortKey === key && !sort.isReverse;
        setSort({ sortKey: key, isReverse: isReverse });
    };

    React.useEffect(() => {
        const sortFunction = SORTS[sort.sortKey];
        const sortedList = sort.isReverse
            ? sortFunction(searchedPlayers.data).reverse()
            : sortFunction(searchedPlayers.data);

        dispatchPlayers({
            type: 'SORT_PLAYERS',
            payload: sortedList,
        });
    }, [sort]);



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
        setUrl(`${API_BASE}${API_SEARCH}?name=${searchTerm}`);

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

            {searchedPlayers.isLoading ? (<p>Loading ...</p>) : (<List list={searchedPlayers.data} onSort={handleSort}/>)}
        </div>
    );
}

export default App;