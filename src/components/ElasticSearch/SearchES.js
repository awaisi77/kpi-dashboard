import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Input} from "@progress/kendo-react-inputs";
import {spinner} from "../../actions/spinner";
import {withState} from "../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import config from "../../config/config";
import {callApi} from "../../services/api";
import CustomGridButton from "./CustomGridButton";
import {showAlertWithTimeOut} from "../../actions/alert";
import UserFormDialog from "../User/User";
import EsFormDialog from "./EsFormDialog";

const StatefulGrid = withState(Grid);
let elasticSearchUrl = config.base_api_url + "elastic-search";

class SearchES extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: [],
                status: false,
                statusCode: null,
            },
            skip: 0, take: 10,
            filter: undefined,
            sort: [
                {field: 'id', dir: 'asc'}
            ],
            formInput: {
                query: undefined,
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
        }


    }

    searchEs = (e) => {
        //  this.props.dispatch(spinner(true))
        this.props.dispatch(spinner(true))
        const payload = {
            url: elasticSearchUrl + '/_search',
            method: 'POST',
            data: {
                query: this.state.formInput.query,
                fields: ['*']
            }
        };
        callApi(payload).then(response => {
            console.log(response)
            if (response.data.data.hits.hits.length > 0) {
                this.setState({
                    data: {
                        grid: response.data.data.hits.hits,
                        status: response.data.status,
                        statusCode: response.data.statusCode,
                    }
                })
                console.log('state : ', this.state)
            }else{
                this.setState({
                    data: {
                        grid: [],
                        status: false,
                        statusCode: null,
                    }
                })


            }
            this.props.dispatch(spinner(false))


        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                this.props.dispatch(showAlertWithTimeOut("error",err.toString()))

            });


    }

    cancel = () => {
        this.setState({dataItemInEdit: undefined});
    }
    insert = () => {
        this.setState({dataItemInEdit: {}});
    }


    onFilterClearChange=(e)=>{
        this.setState({
            formInput:{
                query:undefined
            },
            data: {
                grid: [],
                status: false,
                statusCode: null,
            }

        });
    }

    removeRecord = (dataItem, e) => {
        this.props.dispatch(spinner(true))
        const payload = {
            url: elasticSearchUrl + '/_delete',
            method: 'POST',
            data: {
                id: dataItem._id
            }
        };
        callApi(payload).then(response => {
            console.log(response)

            if (response.data.status && response.data.statusCode === 200) {
                let {data} = {...this.state};
                data.grid = data.grid.filter(
                    (item) => item._id !== dataItem._id
                );
                this.setState({
                    data
                });
                this.props.dispatch(showAlertWithTimeOut("success","Record deleted successfully."))
            } else {
                alert("Not found");
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
    updateRecord = (dataItem, e) => {
        this.props.dispatch(spinner(true))

        console.log(dataItem);
        const payload = {
            url: elasticSearchUrl + '/_update',
            method: 'POST',
            data: {
                id: dataItem._id,
                XFERTime:dataItem._source.XFERTime,
                CellPhone: dataItem._source.CellPhone,
            }
        };
        callApi(payload).then(response => {
            console.log(response)

            if (response.data.status && response.data.statusCode === 200) {
                let {data} = {...this.state};
                //data.grid = data.grid.
                const index = data.grid.findIndex(p => p._source._id === dataItem._source._id);
                data.grid.splice(index, 1, dataItem);
                this.setState({
                    data
                });
                this.props.dispatch(showAlertWithTimeOut("success","Record updated successfully."))

            } else {
                this.props.dispatch(showAlertWithTimeOut("error","Record not found."))
            }
            this.props.dispatch(spinner(false));
        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                this.props.dispatch(showAlertWithTimeOut("error",err.toString()))
            });





    };
    saveRecord = (dataItem, e) => {

            this.props.dispatch(spinner(true))
        let obj = dataItem;
            console.log(obj);
         const payload = {
                 url: elasticSearchUrl + '/_insert',
                 method: 'POST',
                 data: obj
             };
             callApi(payload).then(response => {
                 console.log(response)
                 if (response.data.status && response.data.statusCode === 200) {

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
    handleInputChange = (e) => {
        console.log(e);
        const name = e.target.name;
        // const value = e.value;
        const {value, label} = e;
        const {formInput} = {...this.state};

        formInput[name] = value;
        this.setState({
            formInput,
            data: {
                grid: [],
                status: false,
                statusCode: null,
            }

        });
        console.log(this.state)
    }


    render() {

        let searchFilterContainer = (
            <div className="card mb-4 FilterHolder">
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="col-md-6" tooltip="Query data" flow="down">
                                <Input
                                    name="query"
                                    id="query"
                                    style={{width: "100%", color: "#fff"}}
                                    placeholder="Query"
                                    minLength={5}
                                    autoComplete={false}
                                    onChange={this.handleInputChange}
                                    required={true}
                                />
                            </div>

                            <div className="col-md-4">
                                <button type="button" className="btn btn-secondary" onClick={this.onFilterClearChange}>Clear</button>
                                <button type="button" className="btn btn-primary filterSearch ml-2"
                                        onClick={this.searchEs}>
                                    <i className="fad fa-search"></i> Search
                                </button>
                            </div>

                            <div className="col-md-2">
                                <button type="button"
                                        onClick={this.insert}
                                        className="btn btn-primary filterSearch ml-2 float-right">
                                    <i className="fal fa-plus"></i> Add User
                                </button>                            </div>
                        </div>
                    </form>
                </div>
            </div>);


        let dataGrid = this.state.data.status ? (
            <StatefulGrid
                style={{height: '450px', color: 'black'}}
                data={this.state.data.grid}
                take={10}
                filterable={false}
                sortable={true}
                pageSizes={true}
                resizable={true}
             //   scrollable={'virtual'}
            >
                <Column field="_id" width={100} title="Index ID" filterable={false}/>
                <Column field="_source.First_Name" width={150} title="First Name" filterable={false}/>
                <Column field="_source.Last_Name" width={100} title="Last Name" filterable={false}/>
                <Column field="_source.TRGEmpID" width={100} title="TRG Emp ID" filterable={false}/>
                <Column field="_source.IbexGlobal_Id" width={100} title="Nt Login" filterable={false}/>
                <Column field="_source.CellPhone" width={150} title="Cell Phone #" filterable={false}/>
                <Column field="_source.Email" width={300} title="Email" filterable={false}/>
                <Column title="Action" cell={CustomGridButton(this.removeRecord,this.updateRecord)} filterable={false}/>


            </StatefulGrid>) : '';

        return (

            <Fragment>
                <div className="container-fluid">
                    {searchFilterContainer}
                    {dataGrid}
                    {this.state.dataItemInEdit && <EsFormDialog dataItem={this.state.dataItemInEdit}
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
    };
};
export default connect(mapStateToProps)(SearchES);
