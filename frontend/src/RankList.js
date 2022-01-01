import React from 'react';
import Item from './Item';

const RankList = ({ list, onRemovePlayer, onMoveUp, onMoveDown }) => {
    console.log("B: RankList");
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>Player</span>
                <span style={{ width: '30%' }}>Team</span>
                <span style={{ width: '10%' }}>Position</span>
            </div>

            {list.map(item => (
                <Item key={item.person_id} item={item} listType='Rank'
                    onRemovePlayer={onRemovePlayer} onMoveUp={onMoveUp} onMoveDown={onMoveDown} />
            ))}
        </div>
    );
};

export default RankList;