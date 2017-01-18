import React from 'react';

export default class Teams extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teams: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/api/v1/team')
      .then(response => {
        response.json().then(json => {
          this.setState({ teams: json.data});
        });
      });
  };

  render() {
    return (
      <div>
        {this.state.teams.map((team, index) => (
          <div key={index}>
            <h2>{team.name}</h2>
            {team.players.map((player, index) => (
              <div key={index}>
                <h3>{player.name}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}