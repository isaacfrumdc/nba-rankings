import React from 'react';
import { IconButton } from '@chakra-ui/react'
import { AddIcon, ArrowDownIcon, ArrowUpIcon, CloseIcon, StarIcon } from '@chakra-ui/icons'

const Item = ({ item, onAddPlayer, onRemovePlayer, onMoveUp, onMoveDown, listType }) => (
    <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>{item.player_first_name} {item.player_last_name}</span>&nbsp;
        <span style={{ width: '30%' }}>{item.team_city} {item.team_name}</span>&nbsp;
        <span style={{ width: '10%' }}>{item.position}</span>&nbsp;
        {listType === 'All' && <span>
            {/* <button type="button" onClick={() => onAddPlayer(item)}>
                Add to Ranking
            </button> */}
            <IconButton aria-label='Add to Ranking' icon={<AddIcon />} colorScheme='green'
                type="button" onClick={() => onAddPlayer(item)} />
        </span>}
        {listType === 'Rank' && <span>
            {/* <button type="button" onClick={() => onMoveUp(item)}>
                Up
            </button> */}
            <IconButton aria-label='Move Up' icon={<ArrowUpIcon />}
                type="button" size='sm' onClick={() => onMoveUp(item)} />
        </span>}
        {listType === 'Rank' && <span>
            {/* <button type="button" onClick={() => onMoveDown(item)}>
                Down
            </button> */}
            <IconButton aria-label='Move Down' icon={<ArrowDownIcon />}
                type="button" size='sm' onClick={() => onMoveDown(item)} />
        </span>}
        {listType === 'Rank' && <span>
            {/* <button type="button" onClick={() => onRemovePlayer(item)}>
                Remove
            </button> */}
            <IconButton aria-label='Remove Player' icon={<CloseIcon />} colorScheme='red'
                type="button" size='sm' onClick={() => onRemovePlayer(item)} />
        </span>}
        {listType === 'Consensus' && <span>
        <IconButton aria-label='Remove Player' icon={<StarIcon />} colorScheme='yellow'
                type="button" isDisabled size='sm' />            </span>}
    </div>
);

export default Item;