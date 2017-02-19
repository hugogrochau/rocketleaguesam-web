import Card from 'material-ui/Card/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import React from 'react';
import Chip from 'material-ui/Chip';
import styled from 'styled-components';

const ranks = ['1v1', '2v2', '3v3', '3v3s'];

const ChipWrapper = styled.section`
  display: flex
  flex-direction: row
  flex-wrap: wrap
`;

const MarginedChip = styled(Chip)`
  margin: 0 5px 5px 5px !important
`;

const PlayerCard = ({ player }) =>
  <Card>
    <CardHeader
      title={player.name}
      subtitle={`Rank sum: ${player.sum}`}
      actAsExpander
      showExpandableButton
    />
    <CardText expandable>
      <ChipWrapper>
        {ranks.map((r) =>
            player[r] && (
              <MarginedChip key={r}>
                {`${r}: ${player[r]}`}
              </MarginedChip>
            )
          )}
      </ChipWrapper>
    </CardText>
  </Card>
;

PlayerCard.propTypes = {
  player: React.PropTypes.object.isRequired,
};

export default PlayerCard;
