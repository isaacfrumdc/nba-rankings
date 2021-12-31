import React from 'react';

const Item = ({ item, onAddPlayer, listType }) => (
    <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>{item.player_first_name} {item.player_last_name}</span>&nbsp;
        <span style={{ width: '30%' }}>{item.team_city} {item.team_name}</span>&nbsp;
        <span style={{ width: '10%' }}>{item.position}</span>&nbsp;
        <span>
            <button type="button" disabled={listType==='Rank'} onClick={() => onAddPlayer(item)}>
                Add to Ranking
        </button>
        </span>
    </div>
);

export default Item;