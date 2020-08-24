import React, { useEffect, Fragment } from 'react';
import Joi from 'joi-browser';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import { AdminService } from 'services';
import { adminSchema, adminCreateSchema } from 'utils/schema';

const toastTime = {
  autoClose: 2500,
};

const UserData = () => {
  const customColumns = [
    { title: 'Email', field: 'email' },
    { title: 'Password', field: 'password' },
  ];
  const [loader, setLoader] = React.useState(true);
  const [admins, setAdmins] = React.useState([]);

  const validateAdminCreate = objAdmin => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(objAdmin, adminCreateSchema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateAdmin = objAdmin => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(objAdmin, adminSchema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  useEffect(() => {
    async function getUsers() {
      setLoader(true);
      // You can await here
      const { data } = await AdminService.getAllAdmins();
      var admins = data.map(admin => ({
        _id: admin._id,
        email: admin.email,
        password: admin.password,
      }));
      setAdmins(admins);
      setLoader(false);
    }

    getUsers();
  }, []);

  const insetNewAdmin = async newData => {
    const error = validateAdminCreate(newData);
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
      const response = await AdminService.postAdmin(newData);
      if (response.status === 200) {
        getAdmins(response);
      }
    } catch (ex) {
      toast.info(ex.response.data, toastTime);
      setLoader(false);
    }
  };

  const updateAdmin = async newData => {
    const error = validateAdmin(newData);
    if (error) {
      for (let item in error) {
        toast.error(error[item], toastTime);
      }
      return;
    }

    try {
      setLoader(true);
      const response = await AdminService.putAdmin(newData);
      if (response.status === 200) {
        getAdmins(response);
      }
    } catch (ex) {
      toast.error(ex.data, toastTime);
      setLoader(false);
    }
  };

  const deleteAdmin = async oldData => {
    try {
      const response = await AdminService.deleteAdmin(oldData._id);
      if (response.status === 200) {
        getAdmins(response);
      }
    } catch (ex) {
      toast.error(ex.response.data, toastTime);
    }
  };

  const getAdmins = async response => {
    const { data } = await AdminService.getAllAdmins();
    var admins = data.map(admin => ({
      _id: admin._id,
      email: admin.email,
      password: admin.password,
    }));
    setAdmins(admins);
    toast.success(response.data, toastTime);
    setLoader(false);
  };

  return (
    <Fragment>
      <MaterialTable
        title="Admins"
        columns={customColumns}
        isLoading={loader}
        data={admins}
        editable={{
          onRowAdd: async newData => {
            insetNewAdmin(newData);
          },
          onRowUpdate: async (newData, oldData) => {
            updateAdmin(newData);
          },
          onRowDelete: async oldData => {
            deleteAdmin(oldData);
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
