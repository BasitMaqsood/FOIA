import React, { useEffect, Fragment } from 'react';
import Joi from 'joi-browser';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import { UserService } from 'services';
import { userCreateSchema } from 'utils/schema';

const toastTime = {
  autoClose: 2500,
};

const UserData = () => {
  const customColumns = [
    { title: 'Email', field: 'email' },
    { title: 'Names', field: 'fullname' },
    { title: 'Username', field: 'username' },
    { title: 'Password', field: 'password' },
  ];
  const [loader, setLoader] = React.useState(true);
  const [users, setUsers] = React.useState([]);

  const validateCreateUser = objUser => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(objUser, userCreateSchema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  useEffect(() => {
    async function getUsers() {
      setLoader(true);
      const { data } = await UserService.getAllUsers();
      setUsers(data);
      setLoader(false);
    }

    getUsers();
  }, []);

  const insetNewCategory = async newData => {
    const error = validateCreateUser(newData);

    if (error) {
      if (error) {
        for (let item in error) {
          toast.error(error[item], toastTime);
        }
        return;
      }
    }
    try {
      setLoader(true);
      const response = await UserService.postUser(newData);
      if (response.status === 200) {
        getUsers(response);
      }
    } catch (ex) {
      toast.info(ex.response.data, toastTime);
      setLoader(false);
    }
  };

  const updateUser = async newData => {
    const error = validateCreateUser(newData);
    if (error) {
      for (let item in error) {
        toast.error(error[item], toastTime);
      }
      return;
    }

    try {
      setLoader(true);
      const response = await UserService.putUser(newData);
      if (response.status === 200) {
        getUsers();
      }
    } catch (ex) {
      toast.error(ex.data, toastTime);
      setLoader(false);
    }
  };

  const deleteUser = async oldData => {
    try {
      const response = await UserService.deleteUser(oldData._id);
      if (response.status === 200) {
        getUsers(response);
      }
    } catch (ex) {
      toast.error(ex.response.data, toastTime);
    }
  };

  const getUsers = async response => {
    const { data } = await UserService.getAllUsers();
    setUsers(data);
    // toast.success(response.data, toastTime);
    setLoader(false);
  };

  return (
    <Fragment>
      <MaterialTable
        title="Categories"
        columns={customColumns}
        isLoading={loader}
        data={users}
        editable={{
          onRowAdd: async newData => {
            insetNewCategory(newData);
          },
          onRowUpdate: async (newData, oldData) => {
            updateUser(newData);
          },
          onRowDelete: async oldData => {
            deleteUser(oldData);
          },
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </Fragment>
  );
};

export default UserData;
