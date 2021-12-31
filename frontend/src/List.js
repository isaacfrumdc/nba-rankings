import React from 'react';
import Item from './Item';

const List = React.memo(({ list, onAddPlayer, onRemovePlayer, onSort }) => {

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
                <Item key={item.objectID} item={item} onAddPlayer={onAddPlayer} onRemovePlayer={onRemovePlayer} listType='All'/>
            ))}
        </div>
    );
});

export default List;