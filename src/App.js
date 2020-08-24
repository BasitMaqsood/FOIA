import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router } from 'react-router-dom';
import _ from 'lodash';

import { PublicRoutes, AuthRoutes } from 'routing';
import { CategoryService } from 'services';

const useStyles = makeStyles(theme => ({
  heightLoader: {
    minHeight: 550,
  },
}));

const App = () => {
  const classes = useStyles();

  const [isLoggedin, setIsloggedin] = useState(false);
  const [loaderFlag, setLoaderFlag] = useState(false);
  useEffect(() => {
    if (!_.isNull(localStorage.getItem('x-auth-token'))) {
      fetchingAllCat();
    }
    async function fetchingAllCat() {
      setLoaderFlag(true);
      try {
        const { status } = await CategoryService.getAllCategories();
        if (status === 200) {
          setIsloggedin(true);
          setLoaderFlag(false);
        }
      } catch (ex) {
        setLoaderFlag(false);
        setIsloggedin(false);
      }
    }
  }, []);

  if (loaderFlag)
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.heightLoader}>
        <CircularProgress />
      </Grid>
    );
  return (
    <>
      <Router>
        {isLoggedin ? (
          <AuthRoutes setIsloggedin={setIsloggedin} />
        ) : (
          <PublicRoutes setIsloggedin={setIsloggedin} />
        )}
      </Router>
    </>
  );
};

export default App;
