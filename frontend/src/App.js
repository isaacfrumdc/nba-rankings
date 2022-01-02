import React from 'react';
import axios from 'axios';
import AllList from './List';
import SearchForm from './SearchForm';
import SORTS from './SORTS';
import playersReducer from './PlayersReducer';
import RankList from './RankList';
import { Container, VStack, Flex, Heading, Text, StackDivider, Spacer, Icon } from '@chakra-ui/react';
import styles from './App.module.css';
import ConsensusList from './ConsensusList';
import NumberGroup from './NumberGroup';

const API_BASE = "http://localhost:7000/api/get";
const API_SEARCH = "/getFromName";
const API_CONSENSUS = "/consensus/top10";
//const API_RANK = "http://localhost:7000/api/rank/";
let consensus = [];
const getConsensus = () => {
    console.log("get consensus");
    axios.get(`${API_BASE}${API_CONSENSUS}`)
    .then((response) => {
        consensus = response.data;
    })
    .catch(() => {
        console.log("error: getConsensus");
    });
};

const App = () => {

    getConsensus();

    const [searchUrl, setSearchUrl] = React.useState(`${API_BASE}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, dispatchPlayers] = React.useReducer(
        playersReducer,
        { data: [], top10: [], isLoading: false, isError: false }
    );
    const [sort, setSort] = React.useState({ sortKey: 'NONE', isReverse: false });

    const handleSort = React.useCallback(key => {
        const isReverse = sort.sortKey === key && !sort.isReverse;
        setSort({ sortKey: key, isReverse: isReverse });
    }, []);

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = event => {
        console.log("submit");
        setSearchUrl(`${API_BASE}${API_SEARCH}?name=${searchTerm}`);

        event.preventDefault();
    };

    const handleAddPlayer = React.useCallback(event => {
        console.log("add");
        dispatchPlayers({
            type: 'ADD_TO_RANKING', payload: event, });
        //console.log("top10: "+searchedPlayers.top10);
    }, []);

    const handleMoveUp = React.useCallback(event => {
        let arr10 = searchedPlayers.top10;
        let startPos = arr10.indexOf(event);
        let prevPos = startPos - 1 ;
        if (startPos > 0) {
            let temp = arr10[startPos];
            arr10[startPos] = arr10[startPos - 1]
            arr10[prevPos] = temp;
            dispatchPlayers({ type: 'UPDATE_RANKING', payload: arr10, });
        }
    }, []);

    const handleMoveDown = React.useCallback(event => {
        let arr10 = searchedPlayers.top10;
        let startPos = arr10.indexOf(event);
        let nextPos = startPos + 1 ;
        if (startPos < arr10.length - 1) {
            let temp = arr10[startPos];
            arr10[startPos] = arr10[startPos + 1]
            arr10[nextPos] = temp;
            dispatchPlayers({ type: 'UPDATE_RANKING', payload: arr10, });
        }
    }, []);

    const handleRemovePlayer = React.useCallback(event => {
        let arr10 = searchedPlayers.top10;
        let pos = arr10.indexOf(event);
        arr10.splice(pos, 1);

        dispatchPlayers({ type: 'UPDATE_RANKING', payload: arr10, });
    }, []);

    const handleRankingSubmit = event => {
        let arr10 = searchedPlayers.top10;
        if (arr10.length !== 10) {
            console.log("exit");
            return;
        }
        let submitArr = [];
        for (let i = 0; i < arr10.length; i++) {
            submitArr[i] = arr10[i].player_slug;
        }

        axios.post('http://localhost:7000/api/rank/top10', {
            user_id: '1',
            top10_list: JSON.stringify(submitArr),
        });

        console.log("submit");
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
                dispatchPlayers({ type: 'PLAYERS_FETCH_SUCCESS', payload: response.data, });
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
    
        dispatchPlayers({ type: 'SORT_PLAYERS', payload: sortedList, }); }, [sort]);

    React.useEffect(() => {
        handleFetchPlayers();
    }, [handleFetchPlayers]);

    console.log("B: App");

    return (

        <Container maxW="container.xl" p={0}>
            <VStack w="full" h="full" p={10} spacing={5} alignItems="flex-start"
                divider={<StackDivider borderColor='gray.200' />}>
                <VStack spacing={3} alignItems="flex-start">
                    <Heading size="2xl">NBA Rankings</Heading>
                    <Text>See How Your Rankings Stack up with the World</Text>
                </VStack>

                <Flex direction="row">
                    <Flex w='640px' direction="column" pr={5}>
                        <Heading size="xl">Your Top 10</Heading>
                        <Flex direction="row" p={2}>
                            <NumberGroup />
                            <Flex w='600px' mt={1} direction="column">
                                <RankList list={searchedPlayers.top10} onRemovePlayer={handleRemovePlayer}
                                    onMoveUp={handleMoveUp} onMoveDown={handleMoveDown} />
                            </Flex>
                        </Flex>
                        <button className={`${styles.button} ${styles.buttonLarge}`} 
                            onClick={handleRankingSubmit}>Submit Rankings</button>
                    </Flex>
                    <Spacer/>
                    <Flex w='640px' direction="column" pl={5} bg="gray.100">
                        <Heading size="xl">Consensus Top 10</Heading>
                        <Flex direction="row" p={2}>
                            <NumberGroup/>
                            <Flex w='600px' mt={1} direction="column">
                                <ConsensusList list={consensus}/>
                            </Flex>
                        </Flex>
                        <Text as='i'>Ranking determined by aggregating all users' responses</Text>
                    </Flex>
                </Flex>

                <Flex w='1000px' direction="column" spacing={3}>
                    <Heading size="xl">All Players</Heading>
                    <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit}/>
                    {searchedPlayers.isError && <p>Something went wrong ...</p>}
                    {searchedPlayers.isLoading ? (<p>Loading ...</p>) : (<AllList list={searchedPlayers.data} onAddPlayer={handleAddPlayer} onSort={handleSort} />)}
                </Flex>


            </VStack>
        </Container>

        // <div>
        //     <RankList list = {searchedPlayers.top10} onRemovePlayer={handleRemovePlayer}
        //     onMoveUp={handleMoveUp} onMoveDown={handleMoveDown}/>

        //     <button onClick={handleRankingSubmit}>Submit Rankings</button>

        //     <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} onSearchSubmit={handleSearchSubmit}/>

        //     <hr />

        //     {searchedPlayers.isError && <p>Something went wrong ...</p>}
        //     {searchedPlayers.isLoading ? (<p>Loading ...</p>) : (<List list={searchedPlayers.data} onAddPlayer={handleAddPlayer} onSort={handleSort}/>)}
        // </div>
    );
}

export default App;