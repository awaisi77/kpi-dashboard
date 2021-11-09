import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {withState} from "../../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import config from "../../../config/config";
import {ColumnMenu} from "../../Common/columnMenu";
import {spinner} from "../../../actions/spinner";
import {callApi} from "../../../services/api";
import {showAlertWithTimeOut} from "../../../actions/alert";
import {DatePicker} from '@progress/kendo-react-dateinputs';
import moment from 'moment-timezone';

import {
    Chart,
    ChartSeries,
    ChartSeriesItem,
    ChartTitle,
    ChartLegend
} from "@progress/kendo-react-charts";

const StatefulGrid = withState(Grid);
let callUrl = config.base_api_url + "call";

const pieData = [
    {
        name: "Ended",
        call_count: 660,
        explode: true
    },
    {
        name: "Cancelled By User",
        share: 100,
    },
    {
        name: "Not Received",
        share: 10
    },
    {
        name: "Cancelled By System",
        share: 3
    },
    {
        name: "Cancelled - Max Duration",
        share: 13
    }
];

class CallLogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: [],
                skip: 0,
                take: 10,
                status: true,
            },
            filter: {
                startDate: moment(new Date()).tz("EST").format("YYYY-MM-DD"),
                endDate: moment(new Date()).tz("EST").format("YYYY-MM-DD"),
                callStatus: ""
            },
            pieData: pieData
        }

    }

    callLogAPICall = (page = 1) => {
        let {startDate,endDate,callStatus} = this.state.filter;
        this.props.dispatch(spinner(true));
        const payload = {
            url: callUrl + '/all?page=' + page+"&start_date="+startDate+"&end_date="+endDate+"&status="+callStatus,
            method: 'GET'
        };
        callApi(payload).then(response => {
            console.log(response);
            this.setState({
                data: {
                    grid: response.data.data,
                    status: response.data.status,
                }
            });
            console.log('state : ', this.state);
            this.props.dispatch(spinner(false))

        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });

    };

    setStartDateFilter = e => {
        this.setState({
            filter:{
                ...this.state.filter,
                startDate: moment(e.target.value).tz("EST").format("YYYY-MM-DD")
            }
        });
    };

    setEndDateFilter = e => {
        console.log(e.target.value)
        this.setState({
            filter:{
                ...this.state.filter,
                endDate: moment(e.target.value).tz("EST").format("YYYY-MM-DD")
            }
        });
    };

    statusChangeHandler = e => {
        console.log()
        this.setState({
            filter:{
                ...this.state.filter,
                callStatus: e.target.value
            }
        });
    };

    clearHandler = e => {
        this.setState({
            filter:{
                ...this.state.filter,
                callStatus:"",
            }
        });
    };

    componentDidMount() {
        this.callLogAPICall(1);
    }

    GridPageChangeHandler = (event) => {
        let page = (event.page.skip / 10) + 1;
        console.log(page);
        if (this.state.data.grid.current_page != page) {
            this.callLogAPICall(page);
        }

    };

    filterHandler = (e)=>{
        e.preventDefault();

        this.callLogAPICall(1);
    }

    shouldComponentUpdate(nextProps, nextState){

        if(this.state.filter != nextState.filter){
            return false;
        }

        return true;

    }

    render() {

        let pieChart = (
            <div className="k-card mb-5 mt-5">
                <Chart style={{height: 350}}>
                    <ChartTitle text="Pie Chart For Count of Call status "/>
                    <ChartLegend position="top" orientation="horizontal"/>
                    <ChartSeries>
                        <ChartSeriesItem
                            type="pie"
                            overlay={{
                                gradient: "sharpBevel"
                            }}
                            tooltip={{visible: true}}
                            data={this.state.pieData}
                            categoryField="name"
                            field="share"
                        />
                    </ChartSeries>
                </Chart>
            </div>
        );

        let dataGrid = this.state.data.status ? (
            <StatefulGrid
                style={{height: '500px', color: 'black'}}
                data={this.state.data.grid.data}
                take={10}
                skip={this.state.data.grid.from - 1}
                filterable={false}
                sortable={true}
                pageable={true}
                total={this.state.data.grid.total}
                onPageChange={this.GridPageChangeHandler}
                // pageSizes={true}
                resizable={true}
            >

                <Column field="start_time" title="Start Time" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="end_time" title="End Time" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="direction" title="Direction" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="status" title="Status" width={150} columnMenu={ColumnMenu} filterable={false}/>
                <Column field="recording" title="Recording" width={120} columnMenu={ColumnMenu} filterable={false}/>
                <Column field="duration" title="Duration(Seconds)" columnMenu={ColumnMenu} filterable={false}/>


            </StatefulGrid>) : '';
        return (
            <Fragment>
                <div className="container-fluid">
                    <div className="card mb-4 FilterHolder">
                        <div className="card-body">

                            <form onSubmit={this.filterHandler}>
                                <div className="form-row">
                                    <div className="col-md-3" tooltip="From Date" flow="down">
                                        <DatePicker onChange={this.setEndDateFilter} defaultValue={new Date()} max={new Date()}/>
                                        {/*<input id="start" style={{width: '100%'}} placeholder="Start Date"/>*/}
                                    </div>
                                    <div className="col-md-3" tooltip="To Date" flow="down">
                                        <DatePicker onChange={this.setStartDateFilter} defaultValue={new Date()} max={new Date()}/>

                                        {/*<input id="end" style={{width: '100%'}} placeholder="End Date"/>*/}
                                    </div>
                                    <div className="col-md-3" tooltip="Select" flow="down">
                                        <select id="size" value={this.state.filter.callStatus} onChange={this.statusChangeHandler} className="" style={{width: '100%'}}>
                                            <option selected value="">All</option>
                                            <option value="answered">Answered</option>
                                            <option value="completed">Completed</option>
                                            <option value="busy">Busy</option>
                                            <option value="failed">Failed</option>
                                            <option value="no answer">No Answer</option>
                                            <option value="ring">Ring</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-secondary" onClick={this.clearHandler}>Clear</button>
                                        <button type="submit" className="btn btn-primary filterSearch ml-2"><i
                                            className="fad fa-search"></i> Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {dataGrid}
                    {/*{pieChart}*/}

                </div>

            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(CallLogs);
