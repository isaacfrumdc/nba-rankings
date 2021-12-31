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
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case 'ADD_TO_RANKING':
            return {
                ...state,
                isLoading: false,
                isError: false,
                top10: action.payload,
            };
        default:
            throw new Error();
    }
};

export default playersReducer;