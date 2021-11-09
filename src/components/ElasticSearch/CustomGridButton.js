import React from 'react';
import {GridCell} from '@progress/kendo-react-grid';
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Input} from "@progress/kendo-react-inputs";


const CustomGridButton = (remove, update) => {
    return class extends GridCell {
        state = {
            dialogVisibility: false,
            editDialogVisibility: false,
            formInput: {
                CellPhone: undefined,
                XFERTime: undefined,
            },
        };
        toggleDialog = (e) => {
            // e.preventDefault();
            this.setState({
                dialogVisibility: !this.state.dialogVisibility
            });
        }
        toggleDialogEdit = (e) => {
            // e.preventDefault();
            console.log("data item: ", this.props.dataItem)

            this.setState({
                editDialogVisibility: !this.state.editDialogVisibility,
                formInput: {
                    CellPhone: this.props.dataItem._source.CellPhone,
                    XFERTime: this.props.dataItem._source.XFERTime,
                },
            });

            console.log("data item: ", this.state)
        }
        /**
         * Function to call delete record
         */
        handleDelete = () => {
            this.toggleDialog();
            console.log(this.props.dataItem)
            remove(this.props.dataItem);
        };
        /**
         * Function to call edit data function
         */
        handleEdit = () => {
            this.toggleDialogEdit();
            console.log(this.props.dataItem)

            let finalDataItem = this.props.dataItem;
            finalDataItem._source.CellPhone = this.state.formInput.CellPhone;
            finalDataItem._source.XFERTime = this.state.formInput.XFERTime;
            update(finalDataItem);
        };

        handleInputChange = (e) => {
            console.log(e);
            const name = e.target.name;
            // const value = e.value;
            const {value, label} = e;
            const {formInput} = {...this.state};

            formInput[name] = value;
            this.setState({
                formInput
            });
            console.log(this.state)
        }

        render() {

            return (
                <td className='gridAction'>
                    <div className="btn-group btn-group-sm" role="group" aria-label="">
                        <button type="button" className="btn btn-link" tooltip="Edit" flow="down"
                                onClick={this.toggleDialogEdit}>
                            <i className="fal fa-edit"></i>
                        </button>
                        <button type="button" className="btn btn-link" tooltip="Delete" flow="upward"
                                onClick={this.toggleDialog}>
                            <i className="fal fa-trash"></i>
                        </button>
                    </div>
                    {this.state.editDialogVisibility &&
                    <Dialog
                        onClose={this.toggleDialogEdit} title={"Edit Elastic Search Document"} width={400}
                    >
                        <form className={'k-form mt-3'}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <Input
                                        type="text"
                                        name="CellPhone"
                                        label="CellPhone"
                                        value={this.state.formInput.CellPhone || ''}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <Input
                                        type="text"
                                        name="XFERTime"
                                        label="XFERTime"
                                        onChange={this.handleInputChange}
                                        value={this.state.formInput.XFERTime || ''}
                                    />
                                </div>
                            </div>
                        </form>
                        <DialogActionsBar>
                            <button
                                className="k-button"
                                onClick={this.toggleDialogEdit}
                            >
                                Cancel
                            </button>
                            <button
                                className="k-button k-success btnSave"
                                onClick={this.handleEdit}
                            >
                                Save
                            </button>
                        </DialogActionsBar>
                    </Dialog>
                    }

                    {
                        this.state.dialogVisibility &&
                        <Dialog title={"Please confirm"} onClose={this.toggleDialog}>
                            <div className="ConfirmNote">
                                <i className="fal fa-exclamation-circle"></i>
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