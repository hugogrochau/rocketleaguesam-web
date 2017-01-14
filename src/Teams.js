import React from 'react';

export default class RankingTable extends React.Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount = () => {
  //   fetch('http://192.241.250.100:8080/api/v1/player')
  //     .then(response => {
  //       response.json().then(json => {
  //         let ranking = json.data;
  //         ranking = ranking.map( x => {
  //           let sum = x.attributes['1v1'] + x.attributes['2v2'] + x.attributes['3v3s'] + x.attributes['3v3'];
  //           return [x.id, x.attributes.name, x.attributes.platform, x.attributes['1v1'], x.attributes['2v2'], x.attributes['3v3s'], x.attributes['3v3'], sum];
  //         });
  //         this.setState({'ranking': ranking});
  //         this.sortRanks(7);
  //       });
  //     });
  // };

  render() {
    return (
      <div>
        <h2>BD</h2>
        <h2>NOX</h2>
      </div>
    );
  }
}