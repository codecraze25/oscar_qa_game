import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReduxToastr from 'react-redux-toastr';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Home from 'containers/Home';
import Game from 'containers/Game';
import Result from 'containers/Result';

import 'styles/containers/app.css';

export default function App() {
  return (
    <MuiThemeProvider>
      <div className="app">
        <Helmet>
          <meta name="description" content="Simple QA Game" />
          <title>Oscar Test - Simple QA Game Challenge</title>
        </Helmet>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/result" component={Result} />
          <Route path="" component={Home} />
        </Switch>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={true}
          preventDuplicates
          position="top-right"
          transitionIn="bounceIn"
          transitionOut="bounceOut"
          progressBar={false} />
      </div>
    </MuiThemeProvider>
  );
}
