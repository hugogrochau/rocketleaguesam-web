// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectEpics } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: '/',
      onEnter: (nextState, replace) => {
        replace('/players');
      },
    },
    {
      path: '/players',
      name: 'players',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Players/reducer'),
          import('containers/Players/epics'),
          import('containers/Players'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, epics, component]) => {
          injectReducer('players', reducer.default);
          injectEpics(epics.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/teams',
      name: 'teams',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Teams/reducer'),
          import('containers/Teams/epics'),
          import('containers/Teams'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, epics, component]) => {
          injectReducer('teams', reducer.default);
          injectEpics(epics.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
