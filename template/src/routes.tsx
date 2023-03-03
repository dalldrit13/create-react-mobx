import React, { lazy, Fragment, useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

import useGlobalState from "./hooks/useGlobalState";

const PRESERVED: any = import.meta.glob("/src/pages/(_app|404).tsx", { eager: true });
const ROUTES = import.meta.glob("/src/pages/**/[a-z[]*.tsx");

const preserved: any = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

interface RouteProps {
  path: string
  component: any
}

var routes: Array<RouteProps> = []
for (let route of Object.keys(ROUTES)) {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");
  // @ts-ignore
  const component = lazy(ROUTES[route])
  route.includes('[') ? routes.push({ path, component }) : routes.unshift({ path, component })
}
console.log(routes)

const Routes: React.FC = observer(() => {
  const state = useGlobalState()
  const history = useHistory();
  const location = useLocation();
  
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["404"] || Fragment;

  useEffect(() => {
    if (state.redirect) {
      history.push(state.redirect)
      state.clearRedirect()
    }
  }, [state.redirect]);

  useEffect(() => {
    state.location(location)
  }, [location])

  return (
    <App>
      <Switch>
        {routes.map(({ path, component: Component = Fragment }) => (
          <Route key={path} path={path} component={Component} exact={true} />
        ))}
        <Route path="*" component={NotFound} />
      </Switch>
    </App>
  );
});

export default Routes;
