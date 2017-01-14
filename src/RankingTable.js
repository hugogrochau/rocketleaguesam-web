import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

export default class RankingTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      'ranking': [[]],
      'sortIndex': -1,
      'sortOrder': 0,
    };
  }

  componentDidMount = () => {
    fetch('http://192.241.250.100:8080/api/v1/player')
      .then(response => {
        response.json().then(json => {
          let ranking = json.data;
          ranking = ranking.map( x => {
            let sum = x.attributes['1v1'] + x.attributes['2v2'] + x.attributes['3v3s'] + x.attributes['3v3'];
            return [x.id, x.attributes.name, x.attributes.platform, x.attributes['1v1'], x.attributes['2v2'], x.attributes['3v3s'], x.attributes['3v3'], sum];
          });
          this.setState({'ranking': ranking});
          this.sortRanks(7);
        });
      });
  };

  sortRanks = (index) => {
    let newTableData = this.state.ranking.slice();
    let order = index == this.state.sortIndex ? !this.state.sortOrder : 1;
    newTableData.sort((a, b) => {
      return order ? b[index] - a[index] : a[index] - b[index];
    });
    this.setState({
      'ranking': newTableData,
      'sortIndex': index,
      'sortOrder': order
    });
  };

  sortArrow = (index) => {
    if (this.state.sortIndex == index) {
      return this.state.sortOrder ? "▼" : "▲";
    }
    return '';
  };

  render() {
    return (
      <div>
        <Table
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="Steam or PS4">Platform</TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.sortRanks(3)} >1v1 {this.sortArrow(3)}</TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.sortRanks(4)} >2v2 {this.sortArrow(4)}</TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.sortRanks(5)} >3v3 Solo {this.sortArrow(5)}</TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.sortRanks(6)} >3v3 {this.sortArrow(6)}</TableHeaderColumn>
              <TableHeaderColumn onMouseUp={() => this.sortRanks(7)} tooltip="All the ranks added together">Sum {this.sortArrow(7)}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={this.state.stripedRows}
          >
            {this.state.ranking.map((row, index) => (
              <TableRow key={index}>
                {/* position */}
                <TableRowColumn>{row[0] == "76561198278242542" ? 251 : index + 1}</TableRowColumn>
                {row.map((cell, index) => {
                  if (index == 0) {
                  } else if (index == 1) { // name
                    if (row[2] == 0 ) { // steam
                      return <TableRowColumn key={index}><a href={"http://steamcommunity.com/profiles/" + row[0]}>{cell}</a></TableRowColumn>
                    } else {
                      return <TableRowColumn key={index}>{cell}</TableRowColumn>
                    }
                  } else if (index == 2) { // platform
                    return <TableRowColumn key={index}><img src={"http://hugo.grochau.com/sam-ranking/images/" + cell  + ".svg" } width="15px" height="15px"/> </TableRowColumn>
                  } else { // everything else
                    return <TableRowColumn key={index}>{cell}</TableRowColumn>
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();