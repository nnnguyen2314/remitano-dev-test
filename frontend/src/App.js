import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import theme from './themes';
import Header from "./components/Header";
import AuthComponent from "./components/Auth";
import {AppProvider} from "./contexts/AppContext";
import VideoSharingForm from "./components/VideoSharing";
import VideoList from "./components/Videos/VideoList";

function App() {
  return (
      <BrowserRouter>
        <AppProvider>
          <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Grid container>
            <Grid item md={10} sm={12} style={{margin: '10px auto'}}>
              <Grid container spacing={3}>
                <Grid item md={12} className="mt10 non-padding">
                  <Header>
                    <AuthComponent/>
                  </Header>
                </Grid>
                <Grid item md={12} className="mt10 non-padding">
                  <Switch>
                    <Route exact path="/">
                      <VideoList/>
                    </Route>
                    <Route path="/shareVideo">
                      <VideoSharingForm />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiThemeProvider>
        </AppProvider>
      </BrowserRouter>
  );
}

export default App;
