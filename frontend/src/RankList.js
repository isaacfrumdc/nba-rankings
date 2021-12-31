import React from 'react';
import Item from './Item';

const RankList = ({ list }) => {
    console.log("B: RankList");
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <span style={{ width: '40%' }}>Player</span>
                <span style={{ width: '30%' }}>Team</span>
                <span style={{ width: '10%' }}>Position</span>
            </div>

            {list.map(item => (
                <Item key={item.objectID} item={item} listType='Rank' />
            ))}
        </div>
    );
};

export default RankList;