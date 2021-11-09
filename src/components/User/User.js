import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {spinner} from "../../actions/spinner";
import {withState} from "../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {callApi} from "../../services/api";
import config from "../../config/config";
import UserFormDialog from "./UserFormDialog";
import {showAlertWithTimeOut} from "../../actions/alert";
import {ColumnMenu} from "../Common/columnMenu";
import CustomGridButton from "../Common/CustomGridButton"

const StatefulGrid = withState(Grid);
let userListUrl = config.base_api_url + "users";

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: [],
                teams: [],
                roles: [],
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
            url: userListUrl + '/all',
            method: 'GET'
        };
        callApi(payload).then(response => {
            console.log(response)
            this.setState({
                data: {
                    grid: response.data.data.grid,
                    status: response.data.status,
                    teams: response.data.data.teams,
                    roles: response.data.data.roles,
                }
            })
            console.log('state : ', this.state)
            this.props.dispatch(spinner(false))
            //this.props.dispatch(showAlertWithTimeOut("error", "Ashar"()))

        }).catch(
            (err) => {
                this.props.dispatch(spinner(false))
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))

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
                url: userListUrl + '/create',
                method: 'POST',
                data: {
                    name: dataItem.name,
                    username: dataItem.username,
                    email: dataItem.email,
                    role: dataItem.role_id,
                    team: dataItem.team_id
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
              url: userListUrl + '/delete?id='+dataItem.id,
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
            console.log('props : ', this.props)
        }
        let searchFilterContainer = (
            <div className="mb-1 pageHead">
                <div className="row">
                    <div className="col-6"><h1>User</h1></div>
                    <div className="col-6">
                        <button type="button"
                                onClick={this.insert}
                                className="btn btn-primary filterSearch ml-2 mt-1 float-right">
                            <i className="fal fa-plus"></i> Add User
                        </button>
                    </div>
                </div>
            </div>)
        ;

        let dataGrid = this.state.data.status ? (
            <StatefulGrid
                style={{height: '500px', color: 'black'}}
                data={this.state.data.grid}
                take={10}
                filterable={false}
                sortable={true}
                pageSizes={true}
                resizable={true}
            >

                <Column field="id" width={70} title="ID" filterable={false}/>
                <Column field="name" title="Name" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="email" title="Email" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="username" title="Nt Login" columnMenu={ColumnMenu} filterable={false}/>
                <Column field="team.name" title="Team" width={150} columnMenu={ColumnMenu} filterable={false}/>
                <Column field="role.name" title="Role" width={150} columnMenu={ColumnMenu} filterable={false}/>
                <Column field="status" title="Status" width={120} columnMenu={ColumnMenu} filterable={false}/>
                <Column title="Action" width={100} cell={CustomGridButton(this.removeRecord, this.update)}
                        filterable={false}/>


            </StatefulGrid>) : '';

        return (
            <Fragment>

                <div className="container-fluid">

                    {searchFilterContainer}
                    {dataGrid}
                    {this.state.dataItemInEdit && <UserFormDialog dataItem={this.state.dataItemInEdit}
                                                                  teams={this.state.data.teams}
                                                                  roles={this.state.data.roles}
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

export default connect(mapStateToProps)(User);
