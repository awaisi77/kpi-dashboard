import React from 'react';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import {Input, NumericTextBox} from '@progress/kendo-react-inputs';
import {DropDownList} from '@progress/kendo-react-dropdowns';

const teams = [{name: 'abc', id: '1'}, {name: 'cd', id: '2'}];

class RoleFormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItemInEdit: this.props.dataItem || null
            , teams: this.props.teams,
            roles: this.props.roles,
            formInput: {
                teamId: {id: null, name: null},
            },
        };

        console.log('In UserFormDialog construtor props:', this.props)
    }
    handleSave = () => {

        let {save,cancel} = this.props;
        cancel();
        let {dataItemInEdit}=this.state;
        save(dataItemInEdit);
    };
    handleSubmit=(event)=> {
        event.preventDefault();
        this.handleSave();
    }

    onDialogInputChange = (event) => {
        let target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.props ? target.props.name : target.name;

        const edited = this.state.dataItemInEdit;
        edited[name] = value;

        this.setState({
            dataItemInEdit: edited
        });
    }

    render() {
        return (
            <Dialog
                onClose={this.props.cancel} title={"Add New Role"} width={400}
            >
                <form onSubmit={this.handleSubmit} className={'k-form mt-3 mb-5'}>
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Input
                                type="text"
                                name="name"
                                label="Name"
                                value={this.state.dataItemInEdit.name || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                    </div>

                    <DialogActionsBar>
                        <button
                            className="k-button"
                            onClick={this.props.cancel}
                        >
                            Cancel
                        </button>
                        <input type="submit" className="k-button k-success btnSave" value="Save"/>
                    </DialogActionsBar>
                </form>
            </Dialog>
        );
    }
}

export default RoleFormDialog;