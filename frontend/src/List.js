import React from 'react';

const List = React.memo(
    ({ list, onSelectItem }) =>
        list.map(item => (
            <Item key={item.objectID} item={item} onSelectItem={onSelectItem} />
        ))
);


const Item = ({ item, onSelectItem }) => (
    <div>
        <span>{item.player_first_name}</span>&nbsp;
        <span>{item.player_last_name}</span>&nbsp;
        <span>{item.team_name}</span>&nbsp;
        <span>
            <button type="button" onClick={() => onSelectItem(item)}>
                Add to Ranking
        </button>
        </span>
    </div>
);

export default List;