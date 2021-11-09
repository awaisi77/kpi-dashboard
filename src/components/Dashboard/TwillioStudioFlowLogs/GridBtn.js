import React from 'react';
import {Link} from "react-router-dom";
import { Grid, GridColumn as Column, GridCell, GridToolbar } from '@progress/kendo-react-grid';
import {urls} from "../../routes";
class GridBtn extends GridCell {
    render() {
        const value = this.props.dataItem[this.props.field];
        return (
            <td className="openLink">
                <Link target="_blank" to={urls.StudioContextDetail+'/'+value}>
                    {value}
                </Link>
            </td>
        );
    }
}

export default GridBtn;