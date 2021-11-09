import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {urls} from '../routes';
import Header from "../../staticComponents/Header";
import TopCard from "./TopCard";
import DashboardFilter from "./DashboardFilter";
import Card from "./Card";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Fragment>

                <div className="container-fluid">
                    <DashboardFilter/>
                    <div className="row topCards">
                        <TopCard/>
                        <TopCard/>
                        <TopCard/>
                        <TopCard/>
                        <TopCard/>
                        <TopCard/>
                    </div>

                    <div className="row">
                        <Card md="6" mb="4"/>
                        <Card md="6" mb="4"/>
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
export default connect(mapStateToProps)(Dashboard);
