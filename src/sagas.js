import playersSaga from './containers/Players/sagas'

export default function* rootSaga() {
  yield [
    playersSaga(),
  ]
}
