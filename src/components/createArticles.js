// import react, react-markdown-editor-lite, and a markdown parser you like
import React, { useState, useEffect } from 'react';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {
  Button,
  Grid,
  Box,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { DropzoneDialog } from 'material-ui-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import { ArticleService, CategoryService } from 'services';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import _ from 'lodash';
import 'react-markdown-editor-lite/lib/index.css';
import { articleSchema } from 'utils/schema';

const toastTime = {
  autoClose: 2500,
};

const useStyles = makeStyles(theme => ({
  inputField: {
    width: 280,
    alignItem: 'center',
    textAlign: 'center',
    margin: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  redColor: {
    color: 'red',
  },
  spacingBottom: {
    margin: 10,
  },
  margin: {
    paddingBottom: theme.spacing(1),
  },
}));

const mdParser = new MarkdownIt(/* Markdown-it options */);

const CreateArticle = ({ articleID }) => {
  const classes = useStyles();

  const [open, setopen] = useState(false);
  const [submitBtnDisable, setSubmitBtnDisable] = useState('');
  const [intro, setintro] = useState('');
  const [content, setcontent] = React.useState();
  const [categoryId, setcategoryId] = React.useState('');
  const [categories, setCategories] = React.useState([]);
  const [featureImages, setfeatureImages] = useState([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await ArticleService.getSingleArticle(articleID);

      const { data, status } = await CategoryService.getAllCategories();
      if (status === 200) {
        setCategories(data);
      }

      if (response.status) {
        const {
          data: { categoryId, content, intro },
        } = response;
        setcontent(content);
        setcategoryId(categoryId);
        setintro(intro);
      }
    }
    fetchData();
  }, []);

  function validateProperty({ key, value }) {
    const obj = { [key]: value };

    const schema = { [key]: articleSchema[key] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  async function validate(loginObj) {
    const options = { abortEarly: false };
    const { error } = Joi.validate(loginObj, articleSchema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  const handleChange = ({ target: { name: key, value } }) => {
    const errorMessage = validateProperty({ key, value });
    let tempError = { ...error };
    if (errorMessage) {
      tempError[key] = errorMessage;
    } else {
      delete tempError[key];
    }
    setError(tempError);
    eval('set' + key + '(value)');
  };

  const handleEditorChange = ({ html, text }) => {
    let key = 'content';

    let tempError = { ...error };

    delete tempError[key];

    setError(tempError);
    setcontent(text);
  };

  const handleClose = () => {
    setopen(false);
  };

  const handleSave = files => {
    setfeatureImages(files);
    setopen(false);
    setSuccess(true);
  };

  const handleOpen = () => {
    setopen(true);
  };

  const handleSubmitArticle = async () => {
    const objArticle = {
      intro,
      categoryId,
      content,
    };

    const error = await validate({ ...objArticle, featureImages });

    setError(error ? { ...error } : {});

    if (error) {
      return;
    }

    setSubmitBtnDisable(true);

    try {
      var formDataObj = new FormData();
      for (var key in objArticle) {
        formDataObj.append(key, objArticle[key]);
      }

      for (var img of featureImages) {
        formDataObj.append('featureImages', img);
      }

      let response = null;
      if (!_.isEmpty(articleID)) {
        response = await ArticleService.putArticle(formDataObj, articleID);
      } else {
        response = await ArticleService.postArticle(formDataObj);
      }

      if (response.status === 200) {
        toast.success(response.data, toastTime);
        setintro('');
        setcontent('');
        setcategoryId('');
        setSuccess(false);
        setSubmitBtnDisable(false);
      }
    } catch (ex) {
      setSubmitBtnDisable(false);
    }
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.spacingBottom}
        spacing={2}>
        <Grid item md={3} sm={12}>
          <Box component="span">
            <TextField
              id="intro"
              name="intro"
              label="Intro"
              value={intro}
              className={classes.margin}
              onChange={handleChange}
              fullWidth
              error={error.intro ? true : false}
              helperText={error.intro ? error.intro : null}
            />
          </Box>
        </Grid>
        <Grid item md={3} sm={12}>
          <Box component="span">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className={classes.margin}
              onClick={handleOpen}>
              Add Feature Image
              <Box ml={2} component="span">
                {success && <CheckIcon fontSize="small" color="secondary" />}
              </Box>
            </Button>
            <DropzoneDialog
              open={open}
              onSave={handleSave}
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={handleClose}
            />
          </Box>
        </Grid>
        <Grid item md={3} sm={12}>
          <Box component="span">
            <FormControl
              className={classes.inputField}
              id="categoryId"
              fullWidth>
              <InputLabel id="categoryId">Categories</InputLabel>
              <Select
                fullWidth
                variant="standard"
                labelId="categoryId"
                name="categoryId"
                value={categoryId}
                onChange={handleChange}>
                {categories.map(cat => (
                  <MenuItem value={cat._id} key={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {error.categoryId && (
                <FormHelperText className={classes.redColor}>
                  {error.categoryId}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={3} sm={12}>
          <Box component="span">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={submitBtnDisable}
              onClick={handleSubmitArticle}>
              Save Article
            </Button>
          </Box>
        </Grid>
      </Grid>
      {error.content && (
        <FormHelperText className={classes.redColor}>
          {error.content}
        </FormHelperText>
      )}
      <MdEditor
        value={content}
        id="content"
        style={{ height: '500px' }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </React.Fragment>
  );
};

export default CreateArticle;
