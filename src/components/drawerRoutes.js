import React, { useState } from 'react';

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  textDecorationDisable: {
    textDecoration: 'none',
  },
}));

export default () => {
  const classes = useStyles();
  const [catFlag, setCatFlag] = useState(true);
  const [adminFlag, setAdminFlag] = useState(false);
  const [usersFlag, setUsersFlag] = useState(false);
  const [articlesFlag, setArticlesFlag] = useState(false);

  const handleSelectedOption = id => {
    if (id === 1) {
      setCatFlag(true);
      setAdminFlag(false);
      setUsersFlag(false);
      setArticlesFlag(false);
    } else if (id === 2) {
      setCatFlag(false);
      setAdminFlag(false);
      setUsersFlag(false);
      setArticlesFlag(true);
    } else if (id === 3) {
      setCatFlag(false);
      setAdminFlag(true);
      setUsersFlag(false);
      setArticlesFlag(false);
    } else if (id === 4) {
      setCatFlag(false);
      setAdminFlag(false);
      setUsersFlag(true);
      setArticlesFlag(false);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className={classes.textDecorationDisable}
        onClick={() => handleSelectedOption(1)}>
        <ListItem button>
          <ListItemIcon>
            {catFlag ? <DashboardIcon color="primary" /> : <DashboardIcon />}
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
      </Link>
      <Link
        to="/articles"
        className={classes.textDecorationDisable}
        onClick={() => handleSelectedOption(2)}>
        <ListItem button>
          <ListItemIcon>
            {articlesFlag ? (
              <DescriptionIcon color="primary" />
            ) : (
              <DescriptionIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </Link>
      <Link
        to="/admins"
        className={classes.textDecorationDisable}
        onClick={() => handleSelectedOption(3)}>
        <ListItem button>
          <ListItemIcon>
            {adminFlag ? (
              <SupervisorAccountIcon color="primary" />
            ) : (
              <SupervisorAccountIcon />
            )}
          </ListItemIcon>
          <ListItemText primary="Admins" />
        </ListItem>
      </Link>
      <Link
        to="/users"
        className={classes.textDecorationDisable}
        onClick={() => handleSelectedOption(4)}>
        <ListItem button>
          <ListItemIcon>
            {usersFlag ? <PersonIcon color="primary" /> : <PersonIcon />}
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
    </div>
  );
};
