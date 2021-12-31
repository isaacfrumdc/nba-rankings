import React from 'react';
import { sortBy } from 'lodash';

const SORTS = {
    NONE: list => list,
    PLAYER: list => sortBy(list, 'player_last_name'),
    TEAM: list => sortBy(list, 'team_city'),
    POSITION: list => sortBy(list, 'position'),
};

const List = React.memo(({ list, onSelectItem }) => {
    const [sort, setSort] = React.useState('NONE');

    const handleSort = sortKey => {
        setSort(sortKey);
    };

    const sortFunction = SORTS[sort];
    const sortedList = sortFunction(list);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>
                    <button type="button" onClick={() => handleSort('PLAYER')}>
                        Player
                    </button>
                </span>
                <span style={{ width: '30%' }}>
                    <button type="button" onClick={() => handleSort('TEAM')}>
                        Team
                    </button>
                </span>
                <span style={{ width: '10%' }}>
                    <button type="button" onClick={() => handleSort('POSITION')}>
                        Player
                    </button>
                </span>
            </div>

            {sortedList.map(item => (
                <Item key={item.objectID} item={item} onSelectItem={onSelectItem} />
            ))}
        </div>
    );
});


const Item = ({ item, onSelectItem }) => (
    <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>{item.player_first_name} {item.player_last_name}</span>&nbsp;
        <span style={{ width: '30%' }}>{item.team_city} {item.team_name}</span>&nbsp;
        <span style={{ width: '10%' }}>{item.position}</span>&nbsp;
        <span>
            <button type="button" onClick={() => onSelectItem(item)}>
                Add to Ranking
        </button>
        </span>
    </div>
);

export default List;