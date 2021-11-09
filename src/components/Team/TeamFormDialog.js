import React from 'react';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import {Input, NumericTextBox} from '@progress/kendo-react-inputs';
import {DropDownList} from '@progress/kendo-react-dropdowns';
const teams = [{name:'abc',id:'1'},{name:'cd',id:'2'}];

class TeamFormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataItemInEdit: this.props.dataItem || null,
            teams:this.props.teams,
            companies:this.props.companies,
            formInput: {
                teamId: {id: null, name: null},
            },
        };

        console.log('In UserFormDialog construtor props:',this.props)
    }

    handleSubmit=(event)=> {
        event.preventDefault();
        this.handleSave();
    }

    handleSelectChange = (e) => {
        console.log('Name of item', e.target.name);
        const name = e.target.name;

        const {value} = e;
        const {formInput} = {...this.state};
        const edited = this.state.dataItemInEdit;
        edited[name] = value;
        formInput[name] = value;
        this.setState({
            formInput,
            dataItemInEdit: edited
        });


        console.log('value  from event', value);
        console.log('state : ', this.state)
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

        console.log(this.state)
    }
    handleSave = () => {

        let {save,cancel} = this.props;
        cancel();
        let {dataItemInEdit}=this.state;
        alert(JSON.stringify(dataItemInEdit));
        dataItemInEdit.company_id = dataItemInEdit.company.id;
        save(dataItemInEdit);
    };
    render() {
        return (
            <Dialog
                onClose={this.props.cancel} title={"Add New Team"} width={400}
            >
                <form onSubmit={this.handleSubmit} className={'k-form mt-3  mb-5'}>
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
                        <div className="col-12 mb-3">
                            <Input
                                type="text"
                                name="desc"
                                label="Description"
                                value={this.state.dataItemInEdit.desc || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <DropDownList
                                data={this.state.companies}
                                textField="name"
                                dataItemKey="id"
                                name="company"
                                label="Company"
                                onChange={this.handleSelectChange}
                                value={this.state.dataItemInEdit.company || ''}
                                //value={this.state.form_data.select_permission_name}
                                //className="form-control"
                                //style={{ width: '400px' ,color:'black'}}
                                defaultItem={{
                                    name: "Select Company",
                                    id: "0"
                                }}
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

export default TeamFormDialog;