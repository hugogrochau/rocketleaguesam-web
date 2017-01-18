const sumPlayerRanks = (player) =>
  player['1v1'] + player['2v2'] + player['3v3'] + player['3v3s']

const sortPlayers = (players, playlist, order) => {
  const sortedPlayers = players.slice()
  sortedPlayers.sort((a, b) =>
    order ? b[playlist] - a[playlist] : a[playlist] - b[playlist]
  )
  return sortedPlayers
}

export { sumPlayerRanks, sortPlayers }
