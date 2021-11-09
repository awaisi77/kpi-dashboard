import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import config from '../config/config'
import dashboardRoutes from '../components/routes'
import Spinner from "../staticComponents/Spinner";
import Header from "../staticComponents/Header";
import SideBar from "../staticComponents/SideBar";
import {connect} from "react-redux";
import MessageNotifications from "../staticComponents/MessageNotifications";


var base_url = config.base_url;
const AppRouter = (props) => (
    <BrowserRouter>

        <Spinner/>
        <Header/>
        <div id="wrapper" className={props.menuToggle}>
            <SideBar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <MessageNotifications/>
                    </div>
                </div>
            </div>

                {dashboardRoutes()}



        </div>

    </BrowserRouter>
);
const mapStateToProps = (state) => {

    return {
        menuToggle: state.menuToggle
    };
};
export default connect(mapStateToProps)(AppRouter);



      
       
       
      
     

        
