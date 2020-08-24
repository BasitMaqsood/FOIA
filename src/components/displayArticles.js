import React, { useEffect, Fragment } from 'react';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { ArticleService } from 'services';
import { toast } from 'react-toastify';

const DisplayArticles = props => {
  const [loader, setLoader] = React.useState(true);
  const [pageNo, setPageNumber] = React.useState(0);
  const [totalArticles, setTotalArticles] = React.useState(0);
  const [articles, setArticles] = React.useState([]);
  const columnsCustom = [
    { title: 'Intro', field: 'intro' },
    { title: 'Articles Content', field: 'name' },
  ];

  const toastTime = {
    autoClose: 2500,
  };

  useEffect(props => {
    setLoader(true);
    async function getArticlesandCategories() {
      const response = await ArticleService.getAllArticles(1);
      setTotalArticles(response.data.pages);
      let articles = response.data.blogs.map(article => ({
        intro: article.intro,
        name: article.content,
        _id: article._id,
      }));
      setArticles(articles);
      setLoader(false);
    }
    getArticlesandCategories();
  }, []);

  const handleDeleteArticle = async articleObj => {
    try {
      setLoader(true);
      const {
        status,
        data: deletedToasMessage,
      } = await ArticleService.deleteArticle(articleObj._id);
      if (status === 200) {
        console.log('----in status block');
        const { data } = await ArticleService.getAllArticles();
        console.log('dtaat after del', data);
        let articles = data.map(article => ({
          intro: article.intro,
          name: article.content.slice(0, 2),
          _id: article._id,
        }));
        setArticles(articles);
        toast.error(data, deletedToasMessage);
        setLoader(false);
      }
    } catch (ex) {
      toast.error(ex.data, toastTime);
      setLoader(false);
    }
  };

  const handleChangePage = async (e, pageNumber) => {
    setPageNumber(pageNumber);
    setLoader(true);
    try {
      const response = await ArticleService.getAllArticles(pageNumber);
      let articles = response.data.map(article => ({
        intro: article.intro,
        name: article.content.slice(0, 8),
        _id: article._id,
      }));
      setArticles(articles);
      setLoader(false);
    } catch (ex) {
      toast.error(ex.data, toastTime);
      setLoader(false);
    }
  };

  const handleChangeRowPerPage = e => {};

  return (
    <Fragment>
      <MaterialTable
        title="Articles"
        columns={columnsCustom}
        // data={{ data: articles, totalCount: 500 }}
        data={articles}
        editable={{
          onRowAdd: async newData => {},
          onRowDelete: async oldData => {
            handleDeleteArticle(oldData);
          },
        }}
        isLoading={loader}
        actions={[
          {
            icon: 'add',
            tooltip: 'Manage Section',
            onClick: (event, rowData) => {
              props.handleChangeIndex(0, rowData._id, true);
            },
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        components={{
          Pagination: props => (
            <TablePagination
              {...props}
              rowsPerPageOptions={[5]}
              rowsPerPage={5}
              count={totalArticles}
              page={pageNo}
              onChangePage={(e, page) => handleChangePage(e, page)}
              onChangeRowsPerPage={event => {
                props.onChangeRowsPerPage(event => {
                  console.log('onChangeRowsPerPage----', event);
                });
                handleChangeRowPerPage(event.target.value);
              }}
            />
          ),
        }}
      />
    </Fragment>
  );
};

export default DisplayArticles;
