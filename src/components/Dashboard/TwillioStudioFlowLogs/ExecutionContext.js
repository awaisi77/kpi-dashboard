import React, {Fragment} from 'react';
import '@progress/kendo-react-intl'
import '@progress/kendo-react-dropdowns'
import '@progress/kendo-react-buttons'
import '@progress/kendo-react-inputs'
import 'react-router-dom'
import PanelBar from "@progress/kendo-react-layout/dist/es/panelbar/PanelBar";
import PanelBarItem from "@progress/kendo-react-layout/dist/es/panelbar/PanelBarItem";
import {spinner} from "../../../actions/spinner";
import {callApi} from "../../../services/api";
import config from "../../../config/config";
import {connect} from "react-redux";
import ReactJson from "react-json-view";
import {Fieldset} from "primereact/fieldset";

let twilioStudioLogsUrl = config.base_api_url + "twilio";

class ExecutionContext extends React.Component {
    constructor(props) {
        console.log('contectexe', props)
        super(props);
        const {handle} = this.props.match.params;
        console.log('executionSID', handle)
        this.state = {
            data: {
                grid: [],
                execution: {},
                status: false,
            },
            filter: {
                executionSID: handle
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(spinner(true))
        let param = {
            executionSID: this.state.filter.executionSID
        };
        const payload = {
            url: twilioStudioLogsUrl + '/studio/execution-context',
            method: 'POST',
            data: param
        };
        callApi(payload).then(response => {
            console.log(response)
            if (response.data.status === true) {
                const dataItem = response.data.data.grid[0];
                console.log(dataItem)
                let {execution} = ({...dataItem});
                let {jsonData} = ({...dataItem});

                let parseJson = JSON.parse(jsonData);
                let widgets = parseJson.widgets;
                console.log('widgets', JSON.parse(jsonData))
                let array = Object.keys(widgets).map((k) => {
                    return {
                        widgetName: k,
                        data: widgets[k]
                    }
                });

                console.log("dyanmic : ", array);
                this.setState({
                    data: {
                        grid: array,
                        execution: execution,
                        status: response.data.status,
                    }
                })
            }


            console.log('state : ', this.state)
            this.props.dispatch(spinner(false))
        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                //this.showNotification('error', true, err.toString())
            });

    }

    render() {

        let jsonWithPre = (<pre style={{color: "#fff"}}>
            {JSON.stringify('', null, 2)}
        </pre>);

        return (
            <Fragment>
                <div className="container-fluid widgetFlowData">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-1 pageHead">
                                <div className="row">
                                    <div className="col-12"><h1>Call Flow Details</h1></div>
                                </div>
                            </div>

                            <Fieldset legend={this.state.data.execution.callerId} toggleable={false}>
                                <div className="p-grid p-dir-col">
                                    <div className="p-col">
                                        <p> Caller ID: {this.state.data.execution.callerId}</p>
                                    </div>
                                    <div className="p-col">
                                        <p> Execution SID: {this.state.data.execution.executionSID}</p>
                                    </div>
                                    <div className="p-col">
                                        <p> Call Date In:{this.state.data.execution.dateCreated}</p>
                                    </div>
                                    <div className="p-col">
                                        <p> Call Date End:{this.state.data.execution.dateUpdated}</p>
                                    </div>
                                    <div className="p-col">
                                        <p> Status: {this.state.data.execution.status}</p>
                                    </div>
                                </div>
                            </Fieldset>

                            <div className="row">
                                <div className="col-12">
                                    <PanelBar>
                                        {this.state.data.grid.map((data) => {
                                            return (
                                                <PanelBarItem
                                                    animation={true}
                                                    title={data.widgetName}>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">

                                                                <ReactJson src={data.data}
                                                                           indentWidth={10}
                                                                           iconStyle="square"
                                                                           theme="monokai"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PanelBarItem>
                                            )
                                        })}
                                    </PanelBar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // permissions: state.permissions
    };
};
export default connect(mapStateToProps)(ExecutionContext);


