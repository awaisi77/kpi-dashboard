import React from 'react';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import {Input, NumericTextBox} from '@progress/kendo-react-inputs';
import {DropDownList} from '@progress/kendo-react-dropdowns';
class EsFormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInEdit: this.props.dataItem || null
            ,teams:this.props.teams,
            roles:this.props.roles,
            formInput: {
                teamId: {id: null, name: null},
            },
        };
        console.log('In UserFormDialog construtor props:',this.props)
    }
    componentDidMount() {
       this.setState({
           userInEdit: this.props.dataItem
           ,teams:this.props.teams,
           roles:this.props.roles,
           formInput: {
               teamId: {id: null, name: null},
           },
       })

        console.log('In UserFormDialog component did mount props:',this.props)
    }

    handleSubmit =(event)=> {
        event.preventDefault();
        this.handleSave();
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

        console.log('updated state : ',this.state)
    }
    handleSave = () => {

         let {save,cancel} = this.props;
        cancel();
        let {userInEdit}=this.state;
        save(userInEdit);
    };
    render() {
        return (
            <Dialog
                onClose={this.props.cancel} title={"Add New Record Elastic Search"} width={600}>
                <form onSubmit={this.handleSubmit} className={'k-form mt-3 mb-5'}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="IbexGlobal_Id"
                                label="IbexGlobal_Id"
                                required={true}
                                value={this.state.userInEdit.IbexGlobal_Id || ''}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                onChange={this.onDialogInputChange}
                            />
                        </div>

                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Employee_OID"
                                label="Employee_OID"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Employee_OID || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>

                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Location_OID"
                                label="Location_OID"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Location_OID || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Employee_Type_OID"
                                label="Employee_Type_OID"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Employee_Type_OID || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="First_Name"
                                label="First_Name"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.First_Name || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Middle_Initial"
                                label="Middle_Initial"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Middle_Initial || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Last_Name"
                                label="Last_Name"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Last_Name || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="Email"
                                label="Email"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.Email || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="TRGEmpID"
                                label="TRGEmpID"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.TRGEmpID || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>
                        <div className="col-6 mb-3">
                            <Input
                                type="text"
                                name="CellPhone"
                                label="CellPhone"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.CellPhone || ''}
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

export default EsFormDialog;