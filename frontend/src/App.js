import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';
import SORTS from './SORTS';
import playersReducer from './PlayersReducer'

const API_BASE = "http://localhost:7000/api/get";
const API_SEARCH = "/getFromName";
const API_RANK = "http://localhost:7000/api/rank/";
let arr10 = new Array();

const App = () => {

    const [searchUrl, setSearchUrl] = React.useState(`${API_BASE}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, dispatchPlayers] = React.useReducer(
        playersReducer,
        { data: [], isLoading: false, isError: false }
    );
    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false
    });
    const [top10, setTop10] = React.useState([]);

    const handleSort = key => {
        const isReverse = sort.sortKey === key && !sort.isReverse;
        setSort({ sortKey: key, isReverse: isReverse });
    };

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = event => {
        setSearchUrl(`${API_BASE}${API_SEARCH}?name=${searchTerm}`);

        event.preventDefault();
    };

    const handleAddPlayer = event => {
        //console.log(event);
        let newAdd = arr10.push(event);
        console.log("arr10: " + arr10);
    };

    const handleRankingSubmit = event => {
        setTop10(arr10);
        
        event.preventDefault();
    };

    React.useEffect(() => {
        console.log("top10: " + top10);
        axios.post('http://localhost:7000/api/rank/top10', {
            user_ID: '1',
            top10: `${top10}`
        });
    }, [top10]);


    const handleFetchPlayers = React.useCallback(() => {
        // if (!searchTerm) return;

        dispatchPlayers({ type: 'PLAYERS_FETCH_INIT' });

        axios
            .get(searchUrl)
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
    }, [searchUrl]);

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

    React.useEffect(() => {
        handleFetchPlayers();
    }, [handleFetchPlayers]);

    return (
        <div>
            <h1>NBA Rankings</h1>
            <RankList list = {top10}/>

            <button onClick={handleRankingSubmit}>Submit Rankings</button>

            <hr />

            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />

            <hr />

            {searchedPlayers.isError && <p>Something went wrong ...</p>}

            {searchedPlayers.isLoading ? (<p>Loading ...</p>) : (<List list={searchedPlayers.data} onAddPlayer={handleAddPlayer} onSort={handleSort}/>)}
        </div>
    );
}

export default App;