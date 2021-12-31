import React from 'react';
import { sortBy } from 'lodash';

const List = React.memo(({ list, onSelectItem, onSort }) => {

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>
                    <button type="button" onClick={() => onSort('PLAYER')}>
                        Player
                    </button>
                </span>
                <span style={{ width: '30%' }}>
                    <button type="button" onClick={() => onSort('TEAM')}>
                        Team
                    </button>
                </span>
                <span style={{ width: '10%' }}>
                    <button type="button" onClick={() => onSort('POSITION')}>
                        Position
                    </button>
                </span>
            </div>

            {list.map(item => (
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