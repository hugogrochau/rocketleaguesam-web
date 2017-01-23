import { Card, CardHeader, CardText } from 'material-ui/Card';
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

export default class PlayerCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const p = this.props.player;

    return (
      <Card>
        <CardHeader
          title={p.name}
          subtitle={p.sum}
          actAsExpander
          showExpandableButton
        />
        <CardText expandable>
          <ChipWrapper>
            {ranks.map((r) =>
            p[r] && (
              <MarginedChip key={r}>
                {`${r}: ${p[r]}`}
              </MarginedChip>
            )
          )}
          </ChipWrapper>
        </CardText>
      </Card>
    );
  }
}

PlayerCard.propTypes = {
  player: React.PropTypes.object.isRequired,
};
