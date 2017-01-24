import { Card, CardHeader, CardText } from 'material-ui/Card';
import React from 'react';
import styled from 'styled-components';

import PlayerCard from '../PlayerCard';

const FlexCard = styled(Card)`
  flex-grow: 1
  flex-basis: 370px
  margin: 10px
`;

export default class TeamCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const t = this.props.team;

    return (
      <FlexCard>
        <CardHeader
          title={t.name}
          subtitle={`Average: ${t.average}`}
          avatar={`${CDN_URL}/teams/${t.id}.png`}
        />
        <CardText>
          {t.players.map((p) => (
            <PlayerCard key={`${p.platform}/${p.id}`} player={p} />
          ))}
        </CardText>
      </FlexCard>
    );
  }
}

TeamCard.propTypes = {
  team: React.PropTypes.object.isRequired,
};
