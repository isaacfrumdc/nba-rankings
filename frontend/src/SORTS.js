import { sortBy } from 'lodash';

const SORTS = {
    NONE: list => list,
    PLAYER: list => sortBy(list, 'player_last_name'),
    TEAM: list => sortBy(list, 'team_city'),
    POSITION: list => sortBy(list, 'position'),
};

export default SORTS;