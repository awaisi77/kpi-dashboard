
import React from 'react';

import {Grid, GridDetailRow} from '@progress/kendo-react-grid';
import {connect} from "react-redux";
import {Column} from "primereact/column";

class ExecutionContextDetails extends GridDetailRow {
    render() {
        const dataItem = this.props.dataItem;
        console.log(dataItem)
        let {jsonData} = ({...dataItem.execution_context});

        let parseJson = JSON.parse(jsonData);
        let widgets = parseJson.widgets;
        console.log('widgets',JSON.parse(jsonData))
        let array = Object.keys(widgets).map((k) =>{
            return {
                widgetName :k,
                data:widgets[k]}
        });

        console.log("dyanmic : ",array);

        return (
            <section>
                <table>
                    <thead>
                    <tr>
                            <td>Widget Name</td>
                            <td>Data</td>
                    </tr>
                    </thead>
                    <tbody>
                    {array.map((data)=>{
                        return (
                            <tr>
                                <td>{data.widgetName}</td>
                                <td>{JSON.stringify(data.data)}</td>
                            </tr>
                        )
                    })}
                </tbody>


                </table>
            </section>


        );
    }
}
export default ExecutionContextDetails;