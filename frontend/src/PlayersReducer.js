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
            const list = state.top10;
            const player = action.payload.player;
            console.log("player:"+player);
            let alreadyAdded = false;
            for (let i = 0; i < list.length; i++) {
                if (list[i].player_slug === player.player_slug) {
                    alreadyAdded = true;
                }
            }
            if (list.length > 9 || alreadyAdded) {
                return {
                    ...state,
                    isLoading: false,
                    isError: false,
                }
            }
            list.push(player);
            console.log("list: "+list);
            return {
                ...state,
                isLoading: false,
                isError: false,
                top10: list,
        };
        case 'UPDATE_RANKING':
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