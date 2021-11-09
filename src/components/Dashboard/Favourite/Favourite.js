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
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Input} from "@progress/kendo-react-inputs";
import CustomGridButton from "../../Common/CustomGridButton";

let dashboardUrl = config.base_api_url + "dashboard";
let applicationUrl = config.base_api_url + "application";
const StatefulGrid = withState(Grid);

class Favourite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favourite: [],
            applications: [],
            selected_application: {
                AppName: "Select IVR",
                AppID: ""
            },
            open_add_fav_form: false,
            open_del_fav: false
        }
    }

    handleToggleAddDialog = () => {
        if (this.state.favourite.length > 3) {
            this.props.dispatch(showAlertWithTimeOut("error", "You can only add 4 favourite. Delete other favourite to add new"));

            return
        }

        this.setState({
            open_add_fav_form: !this.state.open_add_fav_form
        })
    };

    getFavouriteApps = () => {
        this.props.dispatch(spinner(true));

        const payload = {
            url: dashboardUrl + '/fav',
            method: 'GET'
        };

        callApi(payload).then(response => {
            // console.log(response, response.data.data, response.data.data.);
            this.setState({
                favourite: response.data.data
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


    componentDidMount() {
        this.getApplications();

        this.getFavouriteApps();
    }

    handleIVRSelectChange = (e) => {
        const value = e.target.value;
        console.log(value);
        this.setState({
            selected_application: value
        });
    };

    saveFav = () => {

        this.props.dispatch(spinner(true));

        const payload = {
            url: dashboardUrl + '/fav/save',
            method: 'post',
            data: {
                AppID: this.state.selected_application.AppID
            }
        };

        callApi(payload).then(response => {
            if (response.data.status) {
                this.setState({
                    favourite: [...this.state.favourite, {
                        ...response.data.data,
                        AppName: this.state.selected_application.AppName
                    }],
                    open_add_fav_form: false
                });

                this.props.dispatch(showAlertWithTimeOut("success", "Favourite App addedd Successfully"));

                this.props.dispatch(spinner(false))

            } else {
                this.props.dispatch(showAlertWithTimeOut("warning", response.data.error[0]))
            }


        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });
    };

    delFav = (dataItem) => {
        let AppID = dataItem.AppID;
        this.props.dispatch(spinner(true));

        const payload = {
            url: dashboardUrl + '/fav/delete',
            method: 'post',
            data: {
                AppID
            }
        };

        callApi(payload).then(response => {
            if (response.data.status) {

                this.props.dispatch(showAlertWithTimeOut("success", "Favourite App delete Successfully"));

                this.props.dispatch(spinner(false));

                this.setState({
                    favourite: this.state.favourite.filter((fav) => {
                        return fav.AppID != AppID;
                    })
                })
            } else {
                this.props.dispatch(showAlertWithTimeOut("warning", response.data.error[0]))
            }


        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.selected_application.AppID == "") {
            this.props.dispatch(showAlertWithTimeOut("warning", "Please select Application"));
            return;
        }

        this.saveFav();
    };

    render() {

        let searchFilterContainer = (
            <div className="card mb-1 pageHead">
                <div className="row">
                    <div className="col-6"><h1>Favourite Applications</h1></div>
                    <div className="col-6">
                        <button type="button"
                                onClick={this.handleToggleAddDialog}
                                className="btn btn-primary filterSearch ml-2 mt-1 float-right">
                            <i className="fal fa-plus"></i> Add Favourite
                        </button>
                    </div>
                </div>
            </div>)
        ;

        let FavouriteAppsGrid = this.state.favourite ? (
            <StatefulGrid
                style={{height: '450px', color: 'black'}}
                data={this.state.favourite}
                filterable={false}
                sortable={false}
                pageable={true}
                resizable={false}
                // scrollable={false}
            >

                <Column field='ID' title="ID" filterable={false}/>
                <Column field='UserName' title="User Name" filterable={false}/>
                <Column field='AppName' title="App Name" filterable={false}/>
                <Column title="Action" width={100} cell={CustomGridButton(this.delFav)}
                        filterable={false}/>


            </StatefulGrid>) : '';

        let addFavDialog = (this.state.open_add_fav_form && <Dialog
            onClose={this.handleToggleAddDialog} title={"Add Favourite"} width={400}>
            <form onSubmit={this.handleSubmit} className={'k-form mt-3 mb-5'}>
                <div className="row">

                    <div className="col-12 mb-3">
                        <DropDownList
                            data={this.state.applications}
                            textField="AppName"
                            dataItemKey="AppID"
                            name="IVR"
                            label="IVR"
                            // required={true}
                            onChange={this.handleIVRSelectChange}
                            value={this.state.selected_application}
                            defaultItem={{
                                AppName: "Select IVR",
                                AppID: ""
                            }}
                        />
                    </div>

                </div>

                <DialogActionsBar>
                    <button
                        className="k-button"
                        onClick={this.handleToggleAddDialog}
                    >
                        Cancel
                    </button>
                    <input type="submit" className="k-button k-success btnSave" value="Save"/>
                </DialogActionsBar>
            </form>
        </Dialog>);

        return (
            <Fragment>
                <div className="container-fluid">
                    {searchFilterContainer}

                    {FavouriteAppsGrid}

                    {addFavDialog}

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
export default connect(mapStateToProps)(Favourite);
