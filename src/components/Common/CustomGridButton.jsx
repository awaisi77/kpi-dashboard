import React from 'react';
import {GridCell} from '@progress/kendo-react-grid';
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Input} from "@progress/kendo-react-inputs";


const CustomGridButton = (remove,update) => {
    return class extends GridCell {
        state = {
            dialogVisibility: false,
            editDialogVisibility:false,
        };
        toggleDialog = (e) => {
            // e.preventDefault();
            this.setState({
                dialogVisibility: !this.state.dialogVisibility
            });
        }
        toggleDialogEdit = (e) => {
            // e.preventDefault();
            console.log("data item: ",this.props.dataItem)

            console.log(this.props.dataItem)
            update(this.props.dataItem);
        }
        /**
         * Function to call delete record
         */
        handleDelete = () => {
            this.toggleDialog();
            console.log(this.props.dataItem)
            remove(this.props.dataItem);
        };
        render() {

            return (
                <td className='gridAction'>
                    <div class="btn-group btn-group-sm" role="group" aria-label="">
{                        update &&  <button type="button" className="btn btn-link" tooltip="Edit" flow="down"
                            onClick={this.toggleDialogEdit}>
                        <i className="fal fa-edit"></i>
                    </button>}
                    <button type="button" className="btn btn-link" tooltip="Delete" flow="down"
                            onClick={this.toggleDialog} >
                        <i className="fal fa-trash"></i>
                    </button>
                    </div>
                    {
                        this.state.dialogVisibility &&
                        <Dialog title={"Please confirm"} onClose={this.toggleDialog}>
                            <div className="ConfirmNote mb-5">
                                <i class="fal fa-exclamation-circle"></i>
                                Are you sure you want to remove this item?
                            </div>
                            <DialogActionsBar>
                                <button className="k-button" onClick={this.toggleDialog}>No</button>
                                <button className="k-button k-success btnSave" onClick={this.handleDelete}>Yes</button>
                            </DialogActionsBar>
                        </Dialog>
                    }
                </td>

            );
        }
    };
}

export default CustomGridButton;