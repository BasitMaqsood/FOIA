import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { ClientService } from 'services';

class FrontView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columnDefs: [
        {
          headerName: 'BUSN_ADDR1',
          field: 'BUSN_ADDR1',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_ADDR2',
          field: 'BUSN_ADDR2',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_ADDR3',
          field: 'BUSN_ADDR3',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_CITY',
          field: 'BUSN_CITY',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_COUNTRY',
          field: 'BUSN_COUNTRY',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_STATE',
          field: 'BUSN_STATE',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'BUSN_ZIPCODE',
          field: 'BUSN_ZIPCODE',
          sortable: true,
          filter: true,
        },

        {
          headerName: 'DBA_NAME',
          field: 'DBA_NAME',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'ERO_EFFDT',
          field: 'ERO_EFFDT',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'LEGAL_NAME',
          field: 'LEGAL_NAME',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_ADDR1',
          field: 'MAIL_ADDR1',
          sortable: true,
          filter: true,
        },

        {
          headerName: 'MAIL_ADDR2',
          field: 'MAIL_ADDR2',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_ADDR3',
          field: 'MAIL_ADDR3',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_CITY',
          field: 'MAIL_CITY',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_COUNTRY',
          field: 'MAIL_COUNTRY',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_STATE',
          field: 'MAIL_STATE',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'MAIL_ZIPCODE',
          field: 'MAIL_ZIPCODE',
          sortable: true,
          filter: true,
        },
        {
          headerName: 'PHONE',
          field: 'PHONE',
          sortable: true,
          filter: true,
        },
        {
          headerName: '_2018_ACT_RET',
          field: '_2018_ACT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: '_2018_REJ_RET',
          field: '_2018_REJ_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },

        {
          headerName: '_2018_TRNSMT_RET',
          field: '_2018_TRNSMT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: '_2019_ACT_RET',
          field: '_2019_ACT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
          //   filter: true,
        },
        {
          headerName: '_2019_REJ_RET',
          field: '_2019_REJ_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
          //   filter: true,
        },
        {
          headerName: '_2019_TRNSMT_RET',
          field: '_2019_TRNSMT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: '_2020_ACT_RET',
          field: '_2020_ACT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: '_2020_REJ_RET',
          field: '_2020_REJ_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
        {
          headerName: '_2020_TRNSMT_RET',
          field: '_2020_TRNSMT_RET',
          sortable: true,
          filter: 'agNumberColumnFilter',
        },
      ],
      rowData: [
        {
          make: 'Toyota',
          model: 'Celica',
          price: 35000,
        },
        {
          make: 'Ford',
          model: 'Mondeo',
          price: 32000,
        },
        {
          make: 'Porsche',
          model: 'Boxter',
          price: 72000,
        },
      ],
    };
  }

  async componentDidMount() {
    const { status, data } = await ClientService.getAllData();
    if (status === 200) {
      this.setState({
        data,
      });
    }
  }

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{
          height: '250px',
          width: '600px',
        }}>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.data}></AgGridReact>
      </div>
    );
  }
}

export default FrontView;
