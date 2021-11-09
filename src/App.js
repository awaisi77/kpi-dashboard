import React from 'react';
import './App.css';
import '@progress/kendo-theme-material/dist/all.css'
import Provider from "react-redux/es/components/Provider";
import configureStore from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import {pullDashboardPermissions} from "./actions/permissions";

const store = configureStore();
const state = store.getState();
store.dispatch(pullDashboardPermissions());
const jsx = () => {
    return (
        <Provider store={store}>
            {console.log('store : ',store)}
            <AppRouter/>
        </Provider>
    );
}

export default jsx;
