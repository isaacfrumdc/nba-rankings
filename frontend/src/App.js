import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';
import SORTS from './SORTS';
import playersReducer from './PlayersReducer';
import RankList from './RankList';

const API_BASE = "http://localhost:7000/api/get";
const API_SEARCH = "/getFromName";
//const API_RANK = "http://localhost:7000/api/rank/";
let arr10 = [];
let fullError = false;

const App = () => {

    const [searchUrl, setSearchUrl] = React.useState(`${API_BASE}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, dispatchPlayers] = React.useReducer(
        playersReducer,
        { data: [], top10: [], isLoading: false, isError: false, fullError }
    );
    const [sort, setSort] = React.useState({
        sortKey: 'NONE',
        isReverse: false
    });

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
        console.log("B: Add");
        if (arr10.length > 9) {
            return null;
        }
        console.log(event.player_slug);
        let alreadyAdded = false;
        for (let i = 0; i < arr10.length; i++) {
            if (arr10[i].player_slug === event.player_slug) {
                alreadyAdded = true;
            }
        }

        if (!alreadyAdded) {
            arr10.push(event);
        }

        dispatchPlayers({
            type: 'UPDATE_RANKING',
            payload: arr10,
        });
    };

    const handleMoveUp = event => {
        let startPos = arr10.indexOf(event);
        let prevPos = startPos - 1 ;
        if (startPos > 0) {
            let temp = arr10[startPos];
            arr10[startPos] = arr10[startPos - 1]
            arr10[prevPos] = temp;
            dispatchPlayers({
                type: 'UPDATE_RANKING',
                payload: arr10,
            });
        }
    }

    const handleMoveDown = event => {
        let startPos = arr10.indexOf(event);
        let nextPos = startPos + 1 ;
        if (startPos < 9) {
            let temp = arr10[startPos];
            arr10[startPos] = arr10[startPos + 1]
            arr10[nextPos] = temp;
            dispatchPlayers({
                type: 'UPDATE_RANKING',
                payload: arr10,
            });
        }
    }

    const handleRemovePlayer = event => {
        let pos = arr10.indexOf(event);
        arr10.splice(pos, 1);

        dispatchPlayers({
            type: 'UPDATE_RANKING',
            payload: arr10,
        });
    }

    const handleRankingSubmit = event => {
        
        
        event.preventDefault();
    };


    React.useEffect(() => {
        // axios.post('http://localhost:7000/api/rank/top10', {
        //     user_id: '1',
        //     top10: `${top10}`
        // });
    }, [handleRankingSubmit]);


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
            <RankList list = {searchedPlayers.top10} onRemovePlayer={handleRemovePlayer}
            onMoveUp={handleMoveUp} onMoveDown={handleMoveDown}/>

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