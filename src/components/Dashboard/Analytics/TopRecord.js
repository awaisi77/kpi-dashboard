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
import {DropDownList} from '@progress/kendo-react-dropdowns';

import moment from "moment-timezone";

let analyticsUrl = config.base_api_url + "analytics";
let applicationUrl = config.base_api_url + "application";
const StatefulGrid = withState(Grid);

class TopRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cdrmasterData: [],
            ansDetailData: [],
            applications: [],
            filters: {
                ivr: {
                    AppName: "Select IVR",
                    AppID: ""
                },
                cdrId: "",
                dnis: ""
            }
        }
    }

    handleIVRSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        this.setState({
            filters: {
                ...this.state.filters,
                ivr: value
            }
        });
    };

    getTopRecord = () => {
        this.props.dispatch(spinner(true));

        const payload = {
            url: analyticsUrl + '/top_record?ivr=' + this.state.filters.ivr.AppID + '&cdrId=' + this.state.filters.cdrId + '&dnis=' + this.state.filters.dnis,
            method: 'GET'
        };

        callApi(payload).then(response => {
            console.log(response, response.data.data,response.data.data.cdrmasterData);
            this.setState({
                cdrmasterData: response.data.data.cdrmasterData.length != 0 ? [response.data.data.cdrmasterData]:[],
                ansDetailData: response.data.data.ansDetailData
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

    getApplications = () => {

        const payload = {
            url: applicationUrl + '/all',
            method: 'GET'
        };

        callApi(payload).then(response => {
            console.log(response, response.data.data);

            this.setState({
                applications: response.data.data
            });

            console.log('state : ', this.state);

        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });

    };

    CDRIDonChangeHandler = (e) =>{
        let value = e.target.value;
console.log(e.target);
        this.setState({
            filters: {
                ...this.state.filters,
                cdrId: value
            }
        });
    }

    DNISonChangeHandler = (e) =>{
        let value = e.target.value;

        this.setState({
            filters: {
                ...this.state.filters,
                dnis: value
            }
        });
    }

    componentDidMount() {
        this.getApplications();

        this.getTopRecord();
    }

    setDateFilter = e => {
        console.log(e.target.value);
        this.setState({
            selectedDate: moment(e.target.value).tz("EST").format("YYYY-MM-DD")
        });
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.getTopRecord();
    };

    render() {

        let cdrmasterDataGrid = this.state.cdrmasterData || true ? (
            <StatefulGrid
                style={{height: '150px', color: 'black'}}
                data={this.state.cdrmasterData}
                filterable={false}
                sortable={false}
                pageable={true}
                resizable={false}
                // scrollable={false}
            >

                <Column field='CDRID' title="CDRID" />
                <Column field='AppID' title="AppID" width={100}/>
                <Column field='CallDate' title="Call Date" width={150} />
                <Column field='CallInTime' title="Call-In Time" width={150}/>
                <Column field='CallEndTime' title="Call-End Time" width={150}/>
                <Column field='Duration' title="Duration" width={90}/>
                <Column field='ANI' title="ANI" />
                <Column field='DNIS' title="DNIS" width={140}/>
                <Column field='HangUpCode' title="HangUp Code" />
                {/*<Column field='ExecutionSID' title="Execution SID" />*/}
                <Column field='Status' title="Status" width={80}/>
                <Column field='TranscribeDateTime' title="Transcribe DT" />
                <Column field='AgentID' title="AgentID" />


            </StatefulGrid>) : '';

        let ansDetailDataGrid = this.state.ansDetailData || true ? (
            <StatefulGrid
                style={{height: '400px', color: 'black'}}
                data={this.state.ansDetailData}
                filterable={false}
                sortable={false}
                pageable={true}
                resizable={false}
                take={6}
            >

                <Column field="CDRID" title="CDRID"/>
                <Column field="ANSID" title="ANSID"/>
                <Column field="ANS" title="ANS"/>
                <Column field="ANSTAG" title="ANSTAG"/>


            </StatefulGrid>) : '';

        return (
            <Fragment>
                <div className="container-fluid">

                <div className="mb-1 pageHead">
                <div className="row">
                    <div className="col-12"><h1>Top Records</h1></div>
                </div>
            </div>


                    <div className="card mb-4 FilterHolder">
                        <div className="card-body">
                                    <form onSubmit={this.handleSearch}>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <DropDownList
                                                data={this.state.applications}
                                                textField="AppName"
                                                dataItemKey="AppID"
                                                // name="IVR"
                                                // label="IVR"
                                                // required={true}
                                                onChange={this.handleIVRSelectChange}
                                                value={this.state.filters.ivr}
                                                defaultItem={{
                                                    AppName: "Select IVR",
                                                    AppID: ""
                                                }}
                                            />
                                        </div>
                                            <div className="col-md-3" tooltip="CDRID" flow="down">
                                                <input className="k-textbox" type="text" onChange={this.CDRIDonChangeHandler} name="CDRID" placeholder="CDRID"/>
                                            </div>

                                            <div className="col-md-3" tooltip="DNIS" flow="down">
                                                <input className="k-textbox" type="text" onChange={this.DNISonChangeHandler} name="DNIS" placeholder="DNIS"/>
                                            </div>

                                            <div className="col-md-3">
                                                {/*<button type="button" className="btn btn-secondary">Clear</button>*/}
                                                <button type="submit" className="btn btn-primary filterSearch ml-2"><i
                                                    className="fad fa-search"></i> Search
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                        </div>
                    </div>

                    <div className="mb-1 pageHead">
                        <div className="row">
                            <div className="col-12"><h2>CDR Master </h2></div>
                        </div>
                    </div>
                    {cdrmasterDataGrid}

                    <div className="mb-1 mt-3 pageHead">
                        <div className="row">
                            <div className="col-12"><h2>ANS Detail </h2></div>
                        </div>
                    </div>

                    {ansDetailDataGrid}


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
export default connect(mapStateToProps)(TopRecord);
