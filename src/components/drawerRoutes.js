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
  const [dataFlag, setDataFlag] = useState(true);
  const [usersFlag, setUsersFlag] = useState(false);

  const handleSelectedOption = id => {
    if (id === 1) {
      setDataFlag(true);
      setUsersFlag(false);
    } else if (id === 2) {
      setDataFlag(false);
      setUsersFlag(true);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className={classes.textDecorationDisable}
        onClick={() => handleSelectedOption(2)}>
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
