import React from 'react';

const TeamView = ({ team }) =>
  <div>
    <ul>
      <li>ID: {team.id}</li>
      <li>Name: {team.name}</li>
    </ul>
  </div>
;

TeamView.propTypes = {
  team: React.PropTypes.object.isRequired,
};

export default TeamView;
