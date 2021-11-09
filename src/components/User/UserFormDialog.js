import React from 'react';
import {Dialog, DialogActionsBar} from '@progress/kendo-react-dialogs';
import {Input, NumericTextBox} from '@progress/kendo-react-inputs';
import {DropDownList} from '@progress/kendo-react-dropdowns';
class UserFormDialog extends React.Component {
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
    handleSelectChange = (e) => {
        console.log('Name of item', e.target.name);
        const name = e.target.name;

        const {value} = e;
        const {formInput} = {...this.state};
        const edited = this.state.userInEdit;
        edited[name] = value;
        formInput[name] = value;
        this.setState({
            formInput,
            userInEdit: edited
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

        console.log('updated state : ',this.state)
    }
    handleSave = () => {

         let {save,cancel} = this.props;
        cancel();
        let {userInEdit}=this.state;
        userInEdit.role_id = userInEdit.role.id;
        userInEdit.team_id = userInEdit.team.id;
        save(userInEdit);
    };
    render() {
        return (
            <Dialog
                onClose={this.props.cancel} title={"Add/Edit New User"} width={400}>
                <form onSubmit={this.handleSubmit} className={'k-form mt-3 mb-5'}>
                    <div className="row">
                        <div className="col-12 mb-3 ">
                            <Input
                                type="text"
                                name="name"
                                label="Name"
                                required={true}
                                value={this.state.userInEdit.name || ''}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                onChange={this.onDialogInputChange}
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <Input
                                type="email"
                                name="email"
                                label="Email"
                                required={true}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.email || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <Input
                                type="text"
                                name="username"
                                label="User Name"
                                required={true}
                                disabled={this.state.userInEdit.id?true:false}
                                style={{color:'rgba(0, 0, 0, 0.38)'}}
                                value={this.state.userInEdit.username || ''}
                                onChange={this.onDialogInputChange}
                            />
                        </div>

                        <div className="col-6 mb-3">
                            <DropDownList
                                data={this.state.roles}
                                textField="name"
                                dataItemKey="id"
                                name="role"
                                label="Role"
                                required={true}
                                onChange={this.handleSelectChange}
                                value={this.state.userInEdit.role || ''}
                                defaultItem={{
                                    name: "Select Role",
                                    id: "0"
                                }}
                            />
                        </div>

                        <div className="col-6 mb-3">
                            <DropDownList
                                data={this.state.teams}
                                textField="name"
                                dataItemKey="id"
                                name="team"
                                label="Team"
                                onChange={this.handleSelectChange}
                                value={this.state.userInEdit.team || ''}
                                required={true}
                                style={{color:'black'}}
                                defaultItem={{
                                    name: "Select Team",
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

export default UserFormDialog;