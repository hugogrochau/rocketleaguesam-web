import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineEpics } from 'redux-observable';
import apiClient from 'rocketleaguesam-api-client';
import appEpics from './containers/App/epics';

// add non async epics here
const epicRegistry = [...appEpics];
const epic$ = new BehaviorSubject(combineEpics(...epicRegistry));
const api = apiClient({ host: API_URL });

export const registerEpic = (epic) => {
  // don't add an epic that is already registered/running
  if (epicRegistry.indexOf(epic) === -1) {
    epicRegistry.push(epic);
    epic$.next(epic);
  }
};

export const rootEpic = (action$, store) =>
  epic$.mergeMap((epic) =>
    // inject api
    epic(action$, store, api)
  );

