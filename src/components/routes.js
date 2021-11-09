import React from 'react';
import {Route} from 'react-router-dom';
import config from '../config/config'
import Dashboard from "./Dashboard/Dashboard";
import CallLogs from "./Dashboard/CallLogs/CallLogs";
import  ESSearch from "./ElasticSearch/SearchES";
import  User from "./User/User";
import Role from "./Role/Role";
import Team from "./Team/Team";
import Company from "./Company/Company";
import Permission from "./Permission/Permission";
import RolePermissionAssignment from "./RolePermissionAssignment/RolePermissionAssignment";
import Notice from "../routers/AppRouter";
import MessageNotifications from "../staticComponents/MessageNotifications";
import CDRDashbard from "./Dashboard/CDRDashbard";
import TwilioStudioFlowLogs from "./Dashboard/TwillioStudioFlowLogs/TwilioStudioFlowLogs";
import ExecutionContext from "./Dashboard/TwillioStudioFlowLogs/ExecutionContext";
import CallSummary from "./Dashboard/Analytics/CallSummary";
import TopRecord from "./Dashboard/Analytics/TopRecord";
import Favourite from "./Dashboard/Favourite/Favourite";


var DefaultRoute = "/dashboard/default";
var FavouriteRoute = "/dashboard/favourite";
var esSearchRoute = "/elastic-search/_search";
var userRoute = "/users";
var roleRoute = "/roles";
var teamRoute = "/teams";
var companyRoute = "/companies";
var permissionRoute = "/permissions";
var rolePermissionAssignmentRoute = "/role-permissions-assignment";
var callLogsRoute = "/dashboard/call-logs";
var twilioStudioFlowLogsRoute = "/dashboard/studio-flow-logs";
var twilioStudioExecutionContext = "/dashboard/execution-detail";
var topRecord = "/analytics/top-record";
var callSummary = "/analytics/call-summary";

export default function () {
    return (
        <Route>
            <Route path={"*" + DefaultRoute} component={CDRDashbard} exact/>
            <Route path={"*" + FavouriteRoute} component={Favourite} exact/>
            <Route path={"*"+esSearchRoute} component={ESSearch} exact/>
            <Route path={"*"+userRoute} component={User} exact/>
            <Route path={"*"+roleRoute} component={Role} exact/>
            <Route path={"*"+teamRoute} component={Team} exact/>
            <Route path={"*"+permissionRoute} component={Permission} exact/>
            <Route path={"*"+rolePermissionAssignmentRoute} component={RolePermissionAssignment} exact/>
            <Route path={"*"+companyRoute} component={Company} exact/>
            <Route path={"*"+callLogsRoute} component={CallLogs} exact/>
            <Route path={"*"+twilioStudioFlowLogsRoute} component={TwilioStudioFlowLogs} exact/>
            <Route path={"*"+twilioStudioExecutionContext+'/:handle'} component={ExecutionContext} />

            <Route path={"*"+topRecord} component={TopRecord} />
            <Route path={"*"+callSummary} component={CallSummary} />

        </Route>
    )
}


export let urls = {
    "DefaultURL": config.append_url + DefaultRoute,
    "FavouriteURL": config.append_url + FavouriteRoute,
    "ESSearch": config.append_url + esSearchRoute,
    "User": config.append_url + userRoute,
    "Role": config.append_url + roleRoute,
    "Team": config.append_url + teamRoute,
    "Company": config.append_url + companyRoute,
    "Permission": config.append_url + permissionRoute,
    "RolePermissionAssignment": config.append_url + rolePermissionAssignmentRoute,
    "CallLogs": config.append_url + callLogsRoute,
    "StudioFlowLogs": config.append_url + twilioStudioFlowLogsRoute,
    "StudioContextDetail": config.append_url + twilioStudioExecutionContext,
    "TopRecord": config.append_url + topRecord,
    "callSummary": config.append_url + callSummary,
}