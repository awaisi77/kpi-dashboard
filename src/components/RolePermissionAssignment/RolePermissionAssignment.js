import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {spinner} from "../../actions/spinner";
import {withState} from "../Common/with-state";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {callApi} from "../../services/api";
import config from "../../config/config";

import {DropDownList} from "@progress/kendo-react-dropdowns";
import {PickList} from "primereact/picklist";
import 'primereact/resources/themes/luna-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const StatefulGrid = withState(Grid);
let rolesListUrl = config.base_api_url + "roles";
let rolePermissionsListUrl = config.base_api_url + "role-permissions";

class RolePermissionAssignment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                grid: [],
                roles: [],
                status: false,
            },
            permissionList: {
                status: false,
                target: [],
                source: [],
            },
            roleId: null,
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
            productInEdit: undefined
        }


    }

    componentDidMount() {
        //  this.props.dispatch(spinner(true))
        this.props.dispatch(spinner(true))
        const payload = {
            url: rolesListUrl + '/all',
            method: 'GET'
        };
        callApi(payload).then(response => {
            console.log(response)
            this.setState({
                data: {
                    roles: response.data.data.roles,
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
        this.setState({productInEdit: undefined});
    }
    insert = () => {
        this.setState({productInEdit: {}});
    }

    onRoleChangeHandler = (e) => {
        console.log(e.value);
        let role = e.value;
        if (role) {
            this.setState({roleId: e.value});
            alert(JSON.stringify(this.state))
            this.props.dispatch(spinner(true))
            if (role.value==='na') {
                this.setState({
                    permissionList: {
                        source:[],
                        target: [],
                        status: false
                    }
                })
                let btnSave = document.getElementById('btnSave');
                btnSave.style.display = 'none';

                this.props.dispatch(spinner(false))
            }else {
                const payload = {
                    url: rolePermissionsListUrl + '/list?roleId=' + role.id,
                    method: 'GET'
                };
                callApi(payload).then(response => {
                    console.log(response);
                    this.setState({
                        permissionList: {
                            source: response.data.available,
                            target: response.data.selected,
                            status: response.data.status
                        }
                    })

                    this.props.dispatch(spinner(false))
                    console.log('state after role permissions : ',this.state);
                });

            }
        }
    }

    onChangePermission = (event) => {
        this.setState({
            permissionList: {
                source: event.source,
                target: event.target,
                status: true
            }
        });
        let btnSave = document.getElementById('btnSave');
        btnSave.style.display = 'block';
    }

    savePermissions = (e) => {
        const payload = {
            url: rolePermissionsListUrl + '/save',
            method: 'POST',
            data: {
                role: this.state.roleId,
                permissionList: this.state.permissionList
            }
        };
        console.log(payload);
        this.props.dispatch(spinner(true))
        //calling save user roles api

        callApi(payload).then(response => {
            console.log(response);
            if (response.data.status === true) {
               // this.showNotification('success', true, response.data.msg);
            }
            this.props.dispatch(spinner(false))
        }).catch(
            (err) => {
              //  this.showNotification('error', true, err.toString());
                this.props.dispatch(spinner(false))
            });
    }

    permissionTemplate = (permission) => {
        return (
            <div className="p-clearfix">
              {/*  <div style={{fontSize: '14px', float: 'right', margin: '15px 5px 0 0'}}>{
                    permission.actual_name}
                 | {permission.display_name}
                </div>*/}

                <div className="row">
                    <div className="col-md">Laravel Route: {permission.actual_name}</div>
                    <div className="col-md">React Route: {permission.display_name}</div>
                </div>
            </div>
        );
    }
    render() {
        {
            console.log(this.props)
        }
        let Container = (
            <div className="mb-1 pageHead">
                <div className="row">
                    <div className="col-6"><h1>Role Permissions Assignment</h1></div>

                </div>
            </div>)
        ;
        let searchFilterContainer = (
            <div className="card mb-4 FilterHolder">
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="col-md-3" tooltip="Roles List" flow="down">
                                <DropDownList
                                    data={this.state.data.roles}
                                    textField="name"
                                    dataItemKey="id"
                                    name="roleId"
                                    onChange={this.onRoleChangeHandler}
                                    value={this.state.roleId}
                                    className=""
                                    style={{ width: "100%" }}
                                    defaultItem={{
                                        name: "Select Role",
                                        id: "0",
                                        value:'na'
                                    }} />
                            </div>

                            <div className="col-md-2">
                                <button type="button"
                                        id="btnSave"
                                        onClick={this.savePermissions}
                                        style={{display: 'none'}}
                                        className="btn btn-primary filterSearch ml-2" >
                                    <i className="fad fa-save"></i> Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>);

        let permissionBlock = this.state.permissionList.status ? (
            <div className="mb-12">
                <ul className="missingSession-filters">
                    <li>
                        <PickList
                            source={this.state.permissionList.source}
                            target={this.state.permissionList.target}
                            sourceHeader="Available Permissions"
                            targetHeader="Selected Permissions"
                            responsive={true}
                            showSourceControls={false}
                            showTargetControls={false}
                            itemTemplate={this.permissionTemplate}
                            sourceStyle={{height: '350px'}}
                            targetStyle={{height: '350px'}}
                            onChange={this.onChangePermission}>
                        </PickList>
                    </li>
                </ul>
            </div>
        ) : '';
        return (
            <Fragment>

                <div className="container-fluid">

                    {Container}
                    {searchFilterContainer}
                    {permissionBlock}

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
export default connect(mapStateToProps)(RolePermissionAssignment);
