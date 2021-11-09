import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {Link} from "react-router-dom";
import {urls} from '../components/routes';

class SideBar extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {

        $('.toggle-container').on('click', function () {
            $(this).toggleClass('active');
        });

        $("#menu-toggle-2").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled-2");
        });
        $(".sidebar-dropdown > a").click(function () {
            $(".sidebar-submenu").slideUp(200);
            if (
                $(this)
                    .parent()
                    .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });
    }

    render() {
        return (
            <div id="sidebar-wrapper">
                <nav id="sidebar" className="sidebar-wrapper">
                    <div className="sidebar-content">

                        <div className="sidebar-menu">
                            <ul>
                                <li className="sidebar-dropdown">
                                    <a >
                                        <i className="fad fa-th"></i>
                                        <span>Dashboard</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <Link className="small-box-footer" to={urls.DefaultURL}>Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.FavouriteURL}>Favourite</Link>
                                            </li>
                                            {/*<li className="activeSub">*/}
                                            {/*    <a >Dashboard 2</a>*/}
                                            {/*</li>*/}
                                            {/*<li>*/}
                                            {/*    <a >Dashboard 3</a>*/}
                                            {/*</li>*/}
                                            <li>
                                                <Link className="small-box-footer" to={urls.StudioFlowLogs}>Studio Flow
                                                    Logs</Link>
                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.CallLogs}>Call Logs</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a>
                                        <i className="fad fa-users-class"></i>
                                        <span>Account Management</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <Link className="small-box-footer" to={urls.Team}>Team</Link>

                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.Company}>Company</Link>

                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.User}>User</Link>
                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.Role}>Role</Link>

                                            </li>
                                            <li>
                                                <Link className="small-box-footer"
                                                      to={urls.Permission}>Permission</Link>
                                            </li>
                                            <li>
                                                <Link className="small-box-footer" to={urls.RolePermissionAssignment}>Role
                                                    Permission Assignment</Link>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a>
                                        <i className="fad fa-analytics"></i>
                                        <span>Analytics</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>

                                            <li>
                                                <Link className="small-box-footer" to={urls.TopRecord}>Top Record</Link>
                                            </li>

                                            <li>
                                                <Link className="small-box-footer" to={urls.callSummary}>Call Summary</Link>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li className="sidebar-dropdown">
                                    <a>
                                        <i className="fad fa-search"></i>
                                        <span>Elastic Search</span>
                                    </a>
                                    <div className="sidebar-submenu">
                                        <ul>
                                            <li>
                                                <Link className="small-box-footer" to={urls.ESSearch}>Search</Link>
                                            </li>
                                            <li>
                                                <a>Bulk Insert</a>
                                            </li>
                                            <li>
                                                <a>List</a>
                                            </li>

                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a>
                                        <i className="fad fa-book"></i>
                                        <span>Documentation</span>
                                    </a>
                                </li>
                                <li className="active">
                                    <a >
                                        <i className="fad fa-calendar"></i>
                                        <span>Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a >
                                        <i className="fad fa-folder"></i>
                                        <span>Examples</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        // user: state.user
    };
};

export default connect(mapStateToProps)(SideBar);
