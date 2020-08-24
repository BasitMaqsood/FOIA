import React, { useEffect, Fragment } from 'react';
import MaterialTable from 'material-table';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core';
import { CategoryService } from 'services';
import { categorySchema, categoryCreateSchema } from 'utils/schema';

const toastTime = {
  autoClose: 2500,
};

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  imageButton: {
    width: 20,
    height: 20,
  },
}));

export default () => {
  const classes = useStyles();
  const columnsCustom = [
    {
      title: 'Category Image',
      field: 'categoryImage',
      render: rowData => {
        const { categoryImageUrl } = rowData;
        return (
          <img
            style={{ height: 75, width: 75 }}
            src={
              categoryImageUrl
                ? `http://localhost:5000/${categoryImageUrl}`
                : 'https://resize.hswstatic.com/w_907/gif/how-grass-works.jpg'
            }
          />
        );
      },
    },
    { title: 'Category Title', field: 'name' },
  ];
  const [loader, setLoader] = React.useState(false);
  const [categoryRowData, setCategoryRowData] = React.useState({});
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    async function getCategories() {
      const { data } = await CategoryService.getAllCategories();
      var categories = data.map(cat => ({
        name: cat.name,
        categoryImageUrl: cat.categoryImageUrl,
        _id: cat._id,
      }));
      setCategories(categories);
    }

    setLoader(true);
    getCategories();
    setLoader(false);
  }, []);

  const validateCategory = objCategory => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(objCategory, categorySchema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateCreateCategory = objCategory => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(objCategory, categoryCreateSchema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const insetNewCategory = async newData => {
    const error = validateCreateCategory(newData);
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
      const response = await CategoryService.postCategory(newData);
      if (response.status === 200) {
        getCategoryData(response);
      }
    } catch (ex) {
      toast.info(ex.response.data, toastTime);
      setLoader(false);
    }
  };

  const updateCategory = async newData => {
    const error = validateCategory(newData);
    if (error) {
      for (let item in error) {
        toast.error(error[item], toastTime);
      }
      return;
    }

    try {
      setLoader(true);
      const response = await CategoryService.putCategory(newData);
      if (response.status === 200) {
        getCategoryData(response);
      }
    } catch (ex) {
      toast.error(ex.response.data, toastTime);
      setLoader(false);
    }
  };

  const deleteCategory = async oldData => {
    try {
      setLoader(true);
      const response = await CategoryService.deleteCategory(oldData._id);
      if (response.status === 200) {
        getCategoryData(response);
      }
    } catch (ex) {
      toast.error(ex.response.data, toastTime);
      setLoader(false);
    }
  };

  const getCategoryData = async response => {
    const { data } = await CategoryService.getAllCategories();
    var categories = data.map(cat => ({
      name: cat.name,
      _id: cat._id,
    }));
    toast.info(response.data, toastTime);
    setCategories(categories);
    setLoader(false);
  };

  const handleSetRowData = rowData => {
    setCategoryRowData(rowData);
  };

  const onChangeImageHandler = async event => {
    var formDataObj = new FormData();
    formDataObj.append('categoryImage', event.target.files[0]);

    const { _id } = categoryRowData;

    const { status, data } = await CategoryService.uploadCategoryImage(
      formDataObj,
      _id
    );

    if (status === 200) {
      toast.success(data, toastTime);
    }
  };

  return (
    <Fragment>
      <MaterialTable
        title="Categories"
        columns={columnsCustom}
        data={categories}
        actions={[
          {
            icon: rowData => {
              return (
                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    onChange={event => onChangeImageHandler(event)}
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span">
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
              );
            },
            tooltip: 'Upload Image',
            onClick: (event, rowData) => handleSetRowData(rowData),
          },
        ]}
        isLoading={loader}
        editable={{
          onRowAdd: async newData => {
            insetNewCategory(newData);
          },
          onRowUpdate: async (newData, oldData) => {
            updateCategory(newData);
          },
          onRowDelete: async oldData => {
            deleteCategory(oldData);
          },
        }}
        options={{
          actionsColumnIndex: -1,
        }}
      />
    </Fragment>
  );
};
