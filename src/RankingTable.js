import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import axios from 'axios';


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
    axios.get('http://192.241.250.100:5000/player', {responseType: 'json'})
      .then((response) => {
        let ranking = response.data.players;
        ranking = ranking.map( x => {
          let unwantedIndexes = [4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18];
          x.push(x[3] + x[7] + x[11] + x[15]);
          return x.filter((e, i, a) => unwantedIndexes.indexOf(i) == -1);
        });
        this.setState({'ranking': ranking});
        this.sortRanks(7);
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
                    return <TableRowColumn key={index}><img src={"http://hugo.grochau.com/sam-ranking/images/" + (cell == 0 ? "steam" : "ps4") + ".svg" } width="15px" height="15px"/> </TableRowColumn>
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