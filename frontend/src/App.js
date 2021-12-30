import React from 'react';
import axios from 'axios';
import List from './List';
import SearchForm from './SearchForm';

const baseURL = "http://localhost:7000/api/getFromName?name=";

const App = () => {

    const [url, setUrl] = React.useState(`${baseURL}`);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchedPlayers, setPlayers] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);


        // invalid url will trigger an 404 error
        axios.get(url).then((response) => {
            setPlayers(response.data)
            setIsLoading(false)
            console.log(url)
        }).catch(() => {
            setIsError(true);
        });
    }, [url]);

    const handleSearchInput = event => {
        setSearchTerm(event.target.value);
        console.log(searchTerm);
    };

    const handleSearchSubmit = event => {
        setUrl(`${baseURL}${searchTerm}`);
        console.log(searchedPlayers);

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

            {isError && <p>Something went wrong ...</p>}

            {url}

            {isLoading ? (<p>Loading ...</p>) : ( <List list={searchedPlayers}/>)}
        </div>
    );
}

export default App;