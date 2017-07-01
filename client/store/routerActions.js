import {performAction} from 'performAction';
import Immutable from 'immutable';
import stateContainer from 'stateStore';

const Router = {
  routes: [],
  register: () => {},
  RouteBack: () => {},
  RoutePrimary: () => {},
  RouteSecondary: () => {},
  RouteNotify: () => {},
};

window.router = Router;

Router.routes = [];
///Specify the path name and the pathType 1 = primary, 2 = secondary, 3 = notify
Router.register = (path, pathType) => {
  /// Type must be primary, secondary or notification
  Router.routes.push({path, pathType});
};

Router.RoutePrimary = (newPath, parameter) => {
  let history = stateContainer.store.getIn(['routing', 'history']);
  let path = stateContainer.store.getIn(['routing', 'path']);

  ///Add previous routerPath to history
  history = history.push(path);

  //Setting new primary path
  !parameter
    ? path = path.set('primary', newPath)
    : path = path.set('primary', newPath + '?' + parameter);
  //Clearing secondary path
  path = path.set('secondary', '');

  performAction(store => store.set('routing', Immutable.fromJS({
    history,
    path})));

};

Router.RouteSecondary = (newPath) => {
  let history = stateContainer.store.getIn(['routing', 'history']);
  let path = stateContainer.store.getIn(['routing', 'path']);

  ///Add previous routerPath to history
  history = history.push(path);

  //Clearing secondary path
  path = path.set('secondary', newPath);

  performAction(store => store.set('routing', Immutable.fromJS({
    history,
    path})));

};

Router.ToggleNotify = (show) => {
  let path = stateContainer.store.getIn(['routing', 'path']);

  path = path.set('notify', show);

  performAction(store => store.setIn(['routing', 'path'], path));
};


Router.RouteBack = () => {
  ///Get history
  let history = stateContainer.store.getIn(['routing', 'history']);

  console.log('test: RouteBack');
  //Setting back if there's old history. Otherwise use the currentPath
  let path = history.last()
    ? history.last()
    : stateContainer.store.getIn(['routing', 'path']).set('secondary', '');

  // path = path.set('secondary', '');

  //Preventing notification to re-appear
  path = path.set('notify', false);

  //Removing the last history path seeing as it is now current
  history = history.pop();

  performAction(store => store.set('routing', Immutable.fromJS({
    history,
    path})));
};

Router.RoutTo = (newPath, parameter) => {
  if (newPath === 'goBack') {
    Router.RouteBack();
    return;
  }
  else {
    const route = Router.routes.filter( route => {
      return route.path === newPath
    })[0];

    route && route.pathType === 1 && Router.RoutePrimary(newPath, parameter);
    route && route.pathType === 2 && Router.RouteSecondary(newPath, parameter);
    route && route.pathType === 2 && Router.RouteNotify(newPath, parameter);
  }
};

export default Router