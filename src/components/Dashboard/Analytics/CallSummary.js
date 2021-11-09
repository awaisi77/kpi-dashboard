import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import Card from "../Card";
import {callApi} from "../../../services/api";
import {spinner} from "../../../actions/spinner";
import {showAlertWithTimeOut} from "../../../actions/alert";
import config from "../../../config/config";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {withState} from "../../Common/with-state";
import DashboardFilter from "../DashboardFilter";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import moment from "moment-timezone";

let analyticsUrl = config.base_api_url + "analytics";
const StatefulGrid = withState(Grid);

class CallSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(new Date()).tz("EST").format("YYYY-MM-DD"),
            endDate: moment(new Date()).tz("EST").format("YYYY-MM-DD"),
            // selectedDate: "2020-04-20",
            data: {}
        }
    }

    getCallSummary = () => {
        this.props.dispatch(spinner(true));

        const payload = {
            url: analyticsUrl + '/call_summary?startDate=' + this.state.startDate + '&endDate=' + this.state.endDate,
            method: 'GET'
        };

        callApi(payload).then(response => {
            console.log(response, response.data.data);
            this.setState({
                data: response.data.data
            });

            // console.log('state : ', this.state);
            this.props.dispatch(spinner(false))

        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });

    };

    componentDidMount() {
        this.getCallSummary();
    }

    setStartDateFilter = e => {
        console.log(e.target.value);
        this.setState({
            startDate: moment(e.target.value).tz("EST").format("YYYY-MM-DD")
        });
    };

    setEndDateFilter = e => {
        console.log(e.target.value);
        this.setState({
            endDate: moment(e.target.value).tz("EST").format("YYYY-MM-DD")
        });
    };

    handleSearch = (e) => {
        e.preventDefault();
        if (moment(this.state.startDate) > moment(this.state.endDate)) {
            this.props.dispatch(showAlertWithTimeOut("warning", "End Date can not be less than Start Date"));
            return;
        }

        this.getCallSummary();
    };

    render() {
        let {summary} = this.state.data;

        let dataGrid = this.state.data.record || true ? (
            <StatefulGrid
                style={{height: '400px', color: 'black'}}
                data={this.state.data.record}
                filterable={false}
                sortable={false}
                pageable={true}
                resizable={false}
                take={6}
            >

                <Column field="AppID" title="AppID" filterable={false}/>
                <Column field="DNIS" title="DNIS" filterable={false}/>
                <Column field="AppName" title="App Name" filterable={false}/>
                <Column field="AppAbrv" title="App Abbriviation" filterable={false}/>
                <Column field="total_calls" title="Total Calls" filterable={false}/>
                <Column field="average_duration_sec" title="Avg Dur (sec.)" filterable={false}/>
                <Column field="total_duration" title="Total Min" filterable={false}/>
                <Column field="average_duration_min" title="Avg Dur (min.)" filterable={false}/>


            </StatefulGrid>) : '';

        return (
            <Fragment>
                <div className="container-fluid">
                <div className="mb-1 pageHead">
                    <div className="row">
                        <div className="col-12"><h1>Call Summary</h1></div>
                    </div>
                </div>

                    <div className="card mb-4 FilterHolder">
                        <div className="card-body">
                                    <form onSubmit={this.handleSearch}>
                                        <div className="form-row">
                                            <div className="col-md-3" tooltip="Start Date" flow="down">
                                                <DatePicker onChange={this.setStartDateFilter} defaultValue={new Date()}
                                                            max={new Date()}/>
                                            </div>

                                            <div className="col-md-3" tooltip="End Date" flow="down">
                                                <DatePicker onChange={this.setEndDateFilter} defaultValue={new Date()}
                                                            max={new Date()}/>
                                            </div>

                                            <div className="col-md-6">
                                                {/*<button type="button" className="btn btn-secondary">Clear</button>*/}
                                                <button type="submit" className="btn btn-primary filterSearch ml-2"><i
                                                    className="fad fa-search"></i> Search
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                        </div>
                    </div>

                    <div className="row summaryCards">
                    <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
                        <div className="card box1">
                            <div className="card-body">
                                <h5 className="card-title">{summary ? summary.total_calls : 0}</h5>
                                <p className="card-text">Total Calls</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
                        <div className="card box2">
                            <div className="card-body">
                                <h5 className="card-title">{summary && summary.total_calls && summary.total_duration ? (summary.total_duration / summary.total_calls).toFixed(2) : 0}</h5>
                                <p className="card-text">Avg Duration (sec.)</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-lg-4 mb-4">
                        <div className="card box3">
                            <div className="card-body">
                                <h5 className="card-title">{summary ? (summary.total_duration / 60).toFixed(2) : 0}</h5>
                                <p className="card-text">Total Minutes</p>
                            </div>
                        </div>
                    </div>
                    </div>

                 

                    {dataGrid}
                    {/*<Card md="12" mb="4" title={"Call Summary"} content={dataGrid}/>*/}


                </div>
            </Fragment>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        // permissions: state.permissions
    };
};
export default connect(mapStateToProps)(CallSummary);
