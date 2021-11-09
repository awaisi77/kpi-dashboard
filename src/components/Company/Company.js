import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Input} from "@progress/kendo-react-inputs";
import {spinner} from "../../actions/spinner";
import {withState} from "../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {callApi} from "../../services/api";
import config from "../../config/config";

import {DropDownList} from "@progress/kendo-react-dropdowns";
import CompanyFormDialog from "./CompanyFormDialog";
import {ColumnMenu} from "../Common/columnMenu";
import CustomGridButton from "../Common/CustomGridButton";
import {showAlertWithTimeOut} from "../../actions/alert";

const StatefulGrid = withState(Grid);
let companyListUrl = config.base_api_url + "companies";

class Company extends Component {

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
            formInput: {
                location: undefined,
                activityType: undefined,
                leaveType: undefined
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
        //  this.props.dispatch(spinner(true))
        this.props.dispatch(spinner(true))
        const payload = {
            url: companyListUrl + '/all',
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

    cancel = () => {
        this.setState({dataItemInEdit: undefined});
    }
    insert = () => {
        this.setState({dataItemInEdit: {}});
    } 
    update = (dataItem, e) => {
        this.setState({dataItemInEdit: dataItem});
    }

    saveRecord = (dataItem, e) => {
        if (dataItem.hasOwnProperty('id')) {
            this.props.dispatch(spinner(true))
            let {data} = {...this.state};
            const index = data.grid.findIndex(p => p.id === dataItem.id);
            data.grid.splice(index, 1, dataItem);
            this.setState({
                data
            });
            this.props.dispatch(spinner(false))
            this.props.dispatch(showAlertWithTimeOut("success", "Record updated successfully."))

        } else {
            this.props.dispatch(spinner(true))
            const payload = {
                url: companyListUrl + '/create',
                method: 'POST',
                data: {
                    name: dataItem.name,
                }
            };
            callApi(payload).then(response => {
                console.log(response)
                if (response.data.status && response.data.statusCode === 200) {
                    let {data} = {...this.state};
                    let obj = response.data.data;
                    data.grid = [obj, ...data.grid];
                    this.setState({data})
                    this.props.dispatch(showAlertWithTimeOut("success", "Record Added successfully."))
                } else {
                    this.props.dispatch(showAlertWithTimeOut("error", response.data.error))
                }
                this.props.dispatch(spinner(false));
            }).catch(
                (err) => {
                    this.props.dispatch(spinner(false))
                    this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
                });
        }
    }

    removeRecord = (dataItem, e) => {
        this.props.dispatch(spinner(true))
        const payload = {
            url: companyListUrl + '/delete?id='+dataItem.id,
            method: 'GET',
        };
        callApi(payload).then(response => {
            console.log(response)

            if (response.data.status && response.data.statusCode === 200) {
                let {data} = {...this.state};
                const index = data.grid.findIndex(p => p.id === dataItem.id);
                data.grid.splice(index, 1, response.data.data); this.setState({
                    data
                });
                this.props.dispatch(showAlertWithTimeOut("success","Record Status updated successfully."))
            } else {
                this.props.dispatch(showAlertWithTimeOut("error","Record not found."))
            }
            this.props.dispatch(spinner(false));
        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                this.props.dispatch(showAlertWithTimeOut("error",err.toString()))
            });

        alert(JSON.stringify(dataItem));
    };



    render() {
        {
            console.log(this.props)
        }
        let searchFilterContainer = (
            <div className="mb-1 pageHead">
                <div className="row">
                    <div className="col-6"><h1>Company</h1></div>
                    <div className="col-6">
                        <button type="button"
                                onClick={this.insert}
                                className="btn btn-primary filterSearch ml-2 mt-1 float-right"><i
                            className="fal fa-plus"></i> Add Company
                        </button>
                    </div>
                </div>
            </div>)
        ;

        let dataGrid = this.state.data.status ? (
            <StatefulGrid
                style={{height: '400px', color: 'black'}}
                data={this.state.data.grid}
                take={10}
                filterable={false}
                sortable={true}
                pageSizes={true}

            >
                <Column field="id" title="ID" filterable={false}/>
                <Column field="name" title="Name" filterable={false}
                        columnMenu={ColumnMenu}
                />
                <Column field="status" title="status" columnMenu={ColumnMenu} filterable={false}/>

                
                <Column title="Action" width="100px" cell={CustomGridButton(this.removeRecord,this.update)} filterable={false}/>


            </StatefulGrid>) : '';

        return (
            <Fragment>

                <div className="container-fluid">

                    {searchFilterContainer}
                    {dataGrid}
                    {this.state.dataItemInEdit && <CompanyFormDialog dataItem={this.state.dataItemInEdit}
                                                                 companies={this.state.data.grid}
                                                                   save={this.saveRecord}
                                                                 cancel={this.cancel}
                    />}
                </div>

            </Fragment>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        // permissions: state.permissions
        // teams:state.data.teams,
        //roles:state.data.roles
    };
};
export default connect(mapStateToProps)(Company);
