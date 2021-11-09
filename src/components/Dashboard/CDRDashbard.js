import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import TopCard from "./TopCard";
import Card from "./Card";
import {callApi} from "../../services/api";
import {spinner} from "../../actions/spinner";
import {showAlertWithTimeOut} from "../../actions/alert";
import config from "../../config/config";
import {Chart, ChartLegend, ChartSeries, ChartSeriesItem, ChartTitle, ChartArea} from "@progress/kendo-react-charts";
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import {ColumnMenu} from "../Common/columnMenu";
import {withState} from "../Common/with-state";
import ChartSeriesLabels from "@progress/kendo-react-charts/dist/es/components/series-item/Labels";
import ChartTooltip from "@progress/kendo-react-charts/dist/es/components/Tooltip";

let dashboardUrl = config.base_api_url + "dashboard";
const StatefulGrid = withState(Grid);

// const pieData = [
//     {
//         name: "Ended",
//         call_count: 660,
//         explode: true
//     },
//     {
//         name: "Cancelled By User",
//         share: 100,
//     },
//     {
//         name: "Not Received",
//         share: 10
//     },
//     {
//         name: "Cancelled By System",
//         share: 3
//     },
//     {
//         name: "Cancelled - Max Duration",
//         share: 13
//     }
// ];

class CDRDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'resent_calls': null,
            'pie_data': null,
            'fav_apps_data': null,
            'total_today_stats': null,
        }
    }

    cdrDashboardAPICall = () => {
        this.props.dispatch(spinner(true));

        const payload = {
            url: dashboardUrl + '/cdr',
            method: 'GET'
        };

        callApi(payload).then(response => {
            console.log(response);
            this.setState({
                'resent_calls': response.data.data.resent_calls,
                'pie_data': response.data.data.pie_data,
                'fav_apps_data': response.data.data.fav_apps_data,
                'total_today_stats': response.data.data.total_today_stats,
            });

            console.log('state : ', this.state);
            this.props.dispatch(spinner(false))

        }).catch(
            (err) => {
                this.props.dispatch(spinner(false));
                //this.showNotification('error', true, err.toString())
                this.props.dispatch(showAlertWithTimeOut("error", err.toString()))
            });

    };

    componentDidMount() {
        this.cdrDashboardAPICall();
    }

    render() {
        let {resent_calls, pie_data, fav_apps_data, total_today_stats} = this.state;
        const labelContent = (e) => {
            console.log('lbl e',e);
            return (`${ e.dataItem.name }: \n ${e.dataItem.share}`);
        }
        const mapSeries = (series, index, array) => {
            console.log('series:',series)
            console.log('array',array)
            return (
            <ChartSeriesItem
                type="donut"
                startAngle={150}
                name={series.name}
                data={array}
                field="share"
                categoryField="share"
                colorField="color"
                key='color'
            >
                {
                    index === array.length - 1
                    && <ChartSeriesLabels
                        position="outsideEnd"
                        background="none"
                        content={labelContent} />
                }
            </ChartSeriesItem>
        )};
        const renderTooltip = (context) => {

            const { category, series, value } = context.point || context;

            console.log('tooltip series',series)
            console.log('tooltip context',context)

            return (<div>{series.name} (Calls): {value}</div>);
        };
        let pieChart = pie_data !=null ? (
            <div className="k-card pageChart">
                <Chart style={{height: '360px' }}>
                    <ChartArea background="#ffffff"/>
                    <ChartTooltip render={renderTooltip} />
                    <ChartLegend position="top" orientation="horizontal"/>
                        <ChartSeries>
                            { pie_data.map(mapSeries)}
                        </ChartSeries>

                </Chart>
            </div>
        ):'';

        let dataGrid = resent_calls || true ? (
            <StatefulGrid
                style={{height: '400px', color: 'black'}}
                data={resent_calls}
                filterable={false}
                sortable={false}
                pageable={true}
                take={5}
                resizable={false}
            >

                {/*<Column field="AppID" title="AppID" />*/}
                <Column field="AppName" title="AppName"/>
                <Column field="DNIS" title="DNIS"/>
                <Column field="CallInTime" title="Call-In Time" width={120}/>
                <Column field="CallEndTime" title="Call-End Time" width={120} />
                <Column field="Duration" title="Duration" width={85} />
                <Column field="HangUpCode" title="Code" width={70}/>


            </StatefulGrid>) : '';

        let callStatsToday = <ul className="statsToday">
            <li>{total_today_stats && (total_today_stats.inbound_count + total_today_stats.outbound_count)}<span>Today</span></li>
            <li>{total_today_stats && total_today_stats.inbound_count}<span>Inbound</span></li>
            <li>{total_today_stats && total_today_stats.outbound_count}<span>Outbound</span></li>
        </ul>;

        return (
            <Fragment>

                <div className="container-fluid mb-3">
                    <div className="row topCards">
                        <TopCard title={fav_apps_data && fav_apps_data[0] ? fav_apps_data[0].count : 0}
                                 value={fav_apps_data && fav_apps_data[0] ? fav_apps_data[0].AppName : "N/A"}/>

                        <TopCard title={fav_apps_data && fav_apps_data[1] ? fav_apps_data[1].count : 0}
                                 value={fav_apps_data && fav_apps_data[1] ? fav_apps_data[1].AppName : "N/A"}/>

                        <TopCard title={fav_apps_data && fav_apps_data[2] ? fav_apps_data[2].count : 0}
                                 value={fav_apps_data && fav_apps_data[2] ? fav_apps_data[2].AppName : "N/A"}/>

                        <TopCard title={fav_apps_data && fav_apps_data[3] ? fav_apps_data[3].count : 0}
                                 value={fav_apps_data && fav_apps_data[3] ? fav_apps_data[3].AppName : "N/A"}/>

                        <div className="col-sm-6 col-md-8 col-lg-4 mb-4 cbox-con">
                            <div className="card statsTodayCard">
                                <div className="card-body">
                                    {callStatsToday}
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="row">

                        <div className="col-sm-12 col-md-12 col-lg-8 mb-4">
                            <h1>Recent Calls</h1>
                            {dataGrid}
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <h1>Call Count Per Application</h1>
                            <Card content={pieChart}/>
                        </div>
                        
                    </div>

                    
                    
                    


                    {/*{dataGrid}*/}
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
export default connect(mapStateToProps)(CDRDashboard);
