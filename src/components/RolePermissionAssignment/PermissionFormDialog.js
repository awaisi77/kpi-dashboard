import React from 'react';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import {Input, NumericTextBox} from '@progress/kendo-react-inputs';
import {DropDownList} from '@progress/kendo-react-dropdowns';
const teams = [{name:'abc',id:'1'},{name:'cd',id:'2'}];

class PermissionFormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInEdit: this.props.dataItem || null
            ,permission:this.props.grid,

            formInput: {
                teamId: {id: null, name: null},
            },
        };

        console.log('In UserFormDialog construtor props:',this.props)
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleSelectChange = (e) => {
        console.log('Name of item', e.target.name);
        const name = e.target.name;

        const {value} = e;
        const {formInput} = {...this.state};
        formInput[name] = value;
        this.setState({
            formInput
        });
        console.log('value  from event', value);
        console.log('state : ', this.state)
    }
    onDialogInputChange = (event) => {
        let target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.props ? target.props.name : target.name;

        const edited = this.state.userInEdit;
        edited[name] = value;

        this.setState({
            userInEdit: edited
        });
    }

    render() {
        return (
            <Dialog
                onClose={this.props.cancel} title={"Add New Permission"} width={400}
            >
                <form onSubmit={this.handleSubmit} className={'k-form mt-3'}>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Input
                                type="text"
                                name="display_name"
                                label="React Route Name"
                                value={this.state.userInEdit.ProductName || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <Input
                                type="text"
                                name="actual_name"
                                label="Route Name"
                                value={this.state.userInEdit.ProductName || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                    </div>
                </form>
                <DialogActionsBar>
                    <button
                        className="k-button"
                        onClick={this.props.cancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="k-button k-success btnSave"
                        onClick={this.props.save}
                    >
                        Save
                    </button>
                </DialogActionsBar>
            </Dialog>
        );
    }
}

export default PermissionFormDialog;