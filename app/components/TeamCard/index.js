import { Card, CardHeader, CardText } from 'material-ui/Card';
import React from 'react';
import styled from 'styled-components';

import PlayerCard from '../PlayerCard';

const FlexCard = styled(Card)`
  flex-grow: 1
  flex-basis: 370px
  margin: 10px
`;

const TeamCard = ({ team }) => (
  <FlexCard>
    <CardHeader
      title={team.name}
      subtitle={`Average: ${team.average}`}
      avatar={`${CDN_URL}/teams/${team.id}.png`}
    />
    <CardText>
      {team.players.map((player) => (
        <PlayerCard key={`${player.platform}/${player.id}`} player={player} />
          ))}
    </CardText>
  </FlexCard>
);

TeamCard.propTypes = {
  team: React.PropTypes.object.isRequired,
};

export default TeamCard;
