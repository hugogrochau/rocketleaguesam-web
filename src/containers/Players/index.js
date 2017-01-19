import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import OrderableTable from '../../components/OrderableTable'
import * as Actions from './actions'
import { DECRESCENT } from './constants'

class Players extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    players: PropTypes.array,
    sortPlaylist: PropTypes.string,
    sortOrder: PropTypes.bool,
  }

  static defaultProps = {
    players: [],
    sortPlaylist: 'sum',
    sortOrder: DECRESCENT,
    failed: false,
  }

  componentDidMount = () => {
    this.props.actions.fetchPlayers()
  }

  render() {
    const columns = [
      { name: '#' },
      { name: 'name', type: 'link', linkColumn: 'profileLink'},
      { name: 'platform', type: 'image', imageColumn: 'platformImage' },
      { name: '1v1', sortable: true },
      { name: '2v2', sortable: true },
      { name: '3v3s', sortable: true },
      { name: '3v3', sortable: true },
      { name: 'sum', sortable: true },
      { name: 'profileLink', link: true },
      { name: 'platformImage', image: true },
    ]
    const data = this.props.players.map((p, i) =>
      Object.assign({}, _.omit(p, 'id'), {
        '#': i + 1,
        profileLink: `/player/${p.platform}/${p.id}`,
        platformImage: `http://hugo.grochau.com/sam-ranking/images/${p.platform}.svg`,
      })
    )

    return (
      <OrderableTable
        {...{ columns, data, limit: 2, sortColumn: 'sum' }}
      />
    )
  }

  sortArrow = (playlist) => {
    if (this.props.sortPlaylist === playlist) {
      return this.props.sortOrder ? '▼' : '▲'
    }
    return ''
  }
}

const mapStateToProps = (state) => (
  {
    players: state.players.players,
    sortPlaylist: state.players.sortPlaylist,
    sortOrder: state.players.sortOrder,
  })

const mapDispatchToProps = (dispatch) => (
  {
    actions: bindActionCreators(Actions, dispatch),
  })

export default connect(mapStateToProps, mapDispatchToProps)(Players)
