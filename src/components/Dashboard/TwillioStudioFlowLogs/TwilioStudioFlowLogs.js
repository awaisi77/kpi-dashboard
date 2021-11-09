import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import DashboardFilter from "../DashboardFilter";
import Card from "../Card";
import {spinner} from "../../../actions/spinner";
import {callApi} from "../../../services/api";
import {withState} from "../../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import config from "../../../config/config";
import {ColumnMenu} from "../../Common/columnMenu";
import CustomGridButton from "../../Common/CustomGridButton";
import {DateTimePicker} from "@progress/kendo-react-dateinputs";
import moment from "moment";
import {Input} from "@progress/kendo-react-inputs";
import ExecutionContextDetails from "./ExecutionContextDetails";
import {Link} from "react-router-dom";
import {urls} from "../../routes";
import GridBtn from "./GridBtn";

const StatefulGrid = withState(Grid);
let twilioStudioLogsUrl = config.base_api_url + "twilio";
let arr = {
    "widgets": {
        "split_initial_service": {},
        "gather_employee_id": {
            "FromZip": "",
            "From": "+18777141509",
            "FromCity": "",
            "ApiVersion": "2010-04-01",
            "To": "+12023357889",
            "FinishedOnKey": "#",
            "ToCity": "WASHINGTON",
            "CalledState": "DC",
            "FromState": "",
            "Direction": "inbound",
            "CallStatus": "in-progress",
            "ToZip": "20388",
            "msg": "Gather End",
            "Digits": "174422",
            "CallerCity": "",
            "FromCountry": "US",
            "CalledCity": "WASHINGTON",
            "CalledCountry": "US",
            "Caller": "+18777141509",
            "CallerZip": "",
            "AccountSid": "ACfaba3bcdd8f2ccd13efba4b0ed378f32",
            "Called": "+12023357889",
            "CallerCountry": "US",
            "CalledZip": "20388",
            "CallSid": "CA09bbd4838d7b5b7b55edbf21b550260a",
            "CallerState": "",
            "ToCountry": "US",
            "ToState": "DC"
        },
        "say_Not_registered_number": {
            "FromZip": "",
            "From": "+18777141509",
            "FlowEvent": "audioComplete",
            "FromCity": "",
            "ApiVersion": "2010-04-01",
            "To": "+12023357889",
            "ToCity": "WASHINGTON",
            "CalledState": "DC",
            "FromState": "",
            "Direction": "inbound",
            "CallStatus": "in-progress",
            "ToZip": "20388",
            "CallerCity": "",
            "FromCountry": "US",
            "CalledCity": "WASHINGTON",
            "CalledCountry": "US",
            "Caller": "+18777141509",
            "CallerZip": "",
            "AccountSid": "ACfaba3bcdd8f2ccd13efba4b0ed378f32",
            "Called": "+12023357889",
            "CallerCountry": "US",
            "CalledZip": "20388",
            "CallSid": "CA09bbd4838d7b5b7b55edbf21b550260a",
            "CallerState": "",
            "ToCountry": "US",
            "ToState": "DC"
        },
        "say_profile_not_found": {
            "FromZip": "",
            "From": "+18777141509",
            "FlowEvent": "audioComplete",
            "FromCity": "",
            "ApiVersion": "2010-04-01",
            "To": "+12023357889",
            "ToCity": "WASHINGTON",
            "CalledState": "DC",
            "FromState": "",
            "Direction": "inbound",
            "CallStatus": "in-progress",
            "ToZip": "20388",
            "CallerCity": "",
            "FromCountry": "US",
            "CalledCity": "WASHINGTON",
            "CalledCountry": "US",
            "Caller": "+18777141509",
            "CallerZip": "",
            "AccountSid": "ACfaba3bcdd8f2ccd13efba4b0ed378f32",
            "Called": "+12023357889",
            "CallerCountry": "US",
            "CalledZip": "20388",
            "CallSid": "CA09bbd4838d7b5b7b55edbf21b550260a",
            "CallerState": "",
            "ToCountry": "US",
            "ToState": "DC"
        },
        "http_SearchESwithEmpId": {
            "body": "{\"status\":404,\"callerDetail\":\"\",\"msg\":\"User not found in ES\"}",
            "status_code": 200,
            "parsed": {
                "status": 404,
                "msg": "User not found in ES",
                "callerDetail": ""
            },
            "content_type": "application/json"
        },
        "connect_call_Service_desk_on_failure": {
            "FromZip": "",
            "From": "+18777141509",
            "FromCity": "",
            "ApiVersion": "2010-04-01",
            "To": "+12023357889",
            "ToCity": "WASHINGTON",
            "CalledState": "DC",
            "FromState": "",
            "Direction": "inbound",
            "CallStatus": "completed",
            "ToZip": "20388",
            "CallerCity": "",
            "FromCountry": "US",
            "CalledCity": "WASHINGTON",
            "CalledCountry": "US",
            "Caller": "+18777141509",
            "DialCallSid": "CA9ee2dc4fba80877f241df17cd9357ff0",
            "CallerZip": "",
            "AccountSid": "ACfaba3bcdd8f2ccd13efba4b0ed378f32",
            "Called": "+12023357889",
            "CallerCountry": "US",
            "CalledZip": "20388",
            "CallSid": "CA09bbd4838d7b5b7b55edbf21b550260a",
            "DialCallStatus": "completed",
            "DialCallDuration": "302",
            "CallerState": "",
            "ToCountry": "US",
            "ToState": "DC"
        },
        "split_employee_id_search_result": {},
        "http_getName": {
            "body": "{\"status\":404,\"callerDetail\":\"\",\"msg\":\"User not found in ES\",\"ani+\":\"8777141509\",\"ani\":\" 18777141509\",\"aniWithCode\":\"+92777141509\",\"aniWithCode1\":\"+928777141509\"}",
            "status_code": 200,
            "parsed": {
                "status": 404,
                "aniWithCode": "+92777141509",
                "ani+": "8777141509",
                "aniWithCode1": "+928777141509",
                "ani": " 18777141509",
                "callerDetail": "",
                "msg": "User not found in ES"
            },
            "content_type": "application/json"
        }
    }
    };
class TwilioStudioFlowLogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: [],
                status: false,
            },
            skip: 0, take: 10,
            filter: undefined,
            sort: [
                {field: 'id', dir: 'asc'}
            ],
            dashboardFilter: {
                startDateStamp: undefined,
                endDateStamp: undefined,
                callerID: undefined,
            },
            formData: {
                locations: [],
                activityTypes: [],
                leaveTypes: [],
            }, showForm: false,
            errors: {
                location: undefined,
                leaveType: undefined,
                activityType: undefined,
            },
            dialogVisibility: false,
            message: null,
            dataItemInEdit: undefined
        }
    }

    componentDidMount() {


        var array = Object.keys(arr.widgets).map((k) =>{
            return {
                widgetName :k,
                data:arr.widgets[k]}
        });

            console.log("dyanmic : ",array);
        //  this.props.dispatch(spinner(true))
        this.props.dispatch(spinner(true))
        const payload = {
            url: twilioStudioLogsUrl + '/studio/logs',
            method: 'GET'
        };
        callApi(payload).then(response => {
            console.log(response)
            this.setState({
                data: {
                    grid: response.data.data.grid,
                    status: response.data.status,
                }
            })
            console.log('state : ', this.state)
            this.props.dispatch(spinner(false))
        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                //this.showNotification('error', true, err.toString())
            });

    }
    handleClearBtn = (e)=>{
        this.setState({
            data: {
                grid: [],
                status: false,
            },dashboardFilter: {
                startDateStamp: undefined,
                endDateStamp: undefined,
                callerID: undefined,
            },
        })
    }
    changeHandler = (event) => {

        let target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.props ? target.props.name : target.name;

        const edited = this.state.dashboardFilter;
        edited[name] = value;

        this.setState({
            dashboardFilter: edited
        });

        console.log(this.state)

    }

    handleFilerSearch=(e)=>{
        let {startDateStamp,endDateStamp,callerID} = {...this.state.dashboardFilter};

        if (startDateStamp != null && endDateStamp != null) {
            let param = {
                startDate: new Date(startDateStamp).toLocaleString("en-US",{timeZone: "Asia/Karachi"}),
                endDate: new Date(endDateStamp).toLocaleString("en-US",{timeZone: "Asia/Karachi"})
                ,callerID:callerID
            };
            console.log('api payload',param)
            ;
            param.startDate = (moment(param.startDate).format("YYYY-MM-DD HH:mm:ss"));
            param.endDate = (moment(param.endDate).format("YYYY-MM-DD HH:mm:ss"));

            this.props.dispatch(spinner(true))
            const payload = {
                url: twilioStudioLogsUrl + '/studio/logs',
                method: 'POST',
                data:param
            };
            callApi(payload).then(response => {
                console.log(response)
                this.setState({
                    data: {
                        grid: response.data.data.grid,
                        status: response.data.status,
                    }
                })
                console.log('state : ', this.state)
                this.props.dispatch(spinner(false))
            }).catch(
                (err) => {
                    this.props.dispatch(spinner(false))
                    console.log('state : ',err)
                    //this.showNotification('error', true, err.toString())
                });
        }
    }

    expandChange = (event) => {
        event.dataItem.expanded = !event.dataItem.expanded;
        this.forceUpdate();
    }
    render() {

        let dashboardFilter = (
            <div className="card mb-4 FilterHolder">
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="col-md-3" tooltip="Start Date" flow="down">
                                <DateTimePicker
                                    onChange={this.changeHandler}
                                    name="startDateStamp"
                                    value={this.state.dashboardFilter.startDateStamp}
                                />
                            </div>
                            <div className="col-md-3" tooltip="End Date" flow="down">

                                <DateTimePicker
                                    name="endDateStamp"
                                    onChange={this.changeHandler}
                                    value={this.state.dashboardFilter.endDateStamp}
                                />
                            </div>
                            <div className="col-md-3" tooltip="Caller ID" flow="down">
                              <Input
                                     type="text"
                                     name="callerID"
                                     placeholder="Caller ID"
                                     value={this.state.dashboardFilter.callerID || ''}
                                     onChange={this.changeHandler}
                              />
                            </div>
                 {/*           <div className="col-md-2" tooltip="Select" flow="down">
                                <select id="size" className="" style={{width: '100%'}}>
                                    <option>Chat Bot</option>
                                    <option>Insight</option>
                                    <option>iSite</option>
                                    <option>Authenticator</option>
                                    <option>Witness</option>
                                </select>
                            </div>*/}
                            <div className="col-md text-right">
                                <button type="button"
                                        onClick={this.handleFilerSearch}
                                        className="btn btn-primary filterSearch"><i
                                    className="fad fa-search"></i> Search
                                </button>
                                <button type="button"
                                        onClick={this.handleClearBtn}
                                        className="btn btn-secondary  ml-2">Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>);
        const MyCustomCell = (props) => <GridBtn {...props} myProp={this.props} />
        let dataGrid = this.state.data.status ? (
            <StatefulGrid
                style={{height: '450px', color: 'black'}}
                data={this.state.data.grid}
                take={7}
                filterable={false}
                sortable={true}
                pageSizes={true}
                detail={ExecutionContextDetails}
                expandField="expanded"
                onExpandChange={this.expandChange}
            >
                <Column field="id" width={70} title="ID"/>
                <Column field="callerId" title="Caller ID" columnMenu={ColumnMenu}/>
                    <Column
                        cell={MyCustomCell}
                        field="executionSID" title="Execution SID" columnMenu={ColumnMenu}/>
                <Column field="dateCreated" title="Date Created" columnMenu={ColumnMenu}/>
                <Column field="dateUpdated" title="Date Updated" columnMenu={ColumnMenu}/>
                <Column field="status" title="Status" columnMenu={ColumnMenu}/>

                {/*<Column title="Action" width="100px" cell={CustomGridButton(this.removeRecord,this.update)}/>*/}

            </StatefulGrid>) : '';


        return (
            <Fragment>

                <div className="container-fluid">
                    {dashboardFilter}
                    <div className="row">
                        <div className="col-md-12">
                        {dataGrid}

                        </div>
                    </div>

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
export default connect(mapStateToProps)(TwilioStudioFlowLogs);
