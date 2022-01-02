import React from 'react';
import Item from './Item';

const ConsensusList = React.memo(() => {
    var consensus = [];
    consensus[0] = { person_id: 2544, player_first_name: 'Lebron', player_last_name: 'James', team_city: 'Los Angeles', team_name: 'Lakers', position: 'F' };
    consensus[1] = { person_id: 2545, player_first_name: 'Kevin', player_last_name: 'Durant', team_city: 'Brooklyn', team_name: 'Nets', position: 'F' };
    consensus[2] = { person_id: 2546, player_first_name: 'Giannis', player_last_name: 'Antetokounmpo', team_city: 'Milwaukee', team_name: 'Bucks', position: 'F' };
    consensus[3] = { person_id: 2547, player_first_name: 'Stephen', player_last_name: 'Curry', team_city: 'Golden State', team_name: 'Warriors', position: 'G' };
    consensus[4] = { person_id: 2548, player_first_name: 'Kawhi', player_last_name: 'Leonard', team_city: 'Los Angeles', team_name: 'Clippers', position: 'F' };
    consensus[5] = { person_id: 2549, player_first_name: 'James', player_last_name: 'Harden', team_city: 'Brooklyn', team_name: 'Nets', position: 'G' };
    consensus[6] = { person_id: 2541, player_first_name: 'Nikola', player_last_name: 'Jokic', team_city: 'Denver', team_name: 'Nuggets', position: 'C' };
    consensus[7] = { person_id: 2542, player_first_name: 'Joel', player_last_name: 'Embiid', team_city: 'Philadelphia', team_name: '76ers', position: 'C-F' };
    consensus[8] = { person_id: 2543, player_first_name: 'Luka', player_last_name: 'Doncic', team_city: 'Dallas', team_name: 'Mavericks', position: 'F-G' };
    consensus[9] = { person_id: 2533, player_first_name: 'Anthony', player_last_name: 'Davis', team_city: 'Los Angeles', team_name: 'Lakers', position: 'F-C' };
    
    

    return (
        <div>
            {consensus.map(item => (
                <Item key={item.person_id} item={item} listType='Consensus' />
            ))}
        </div>
    );
});

export default ConsensusList;

