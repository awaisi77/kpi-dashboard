import React, {Component} from 'react';
import {Fade} from "@progress/kendo-react-animation";
import {Notification, NotificationGroup} from "@progress/kendo-react-notification";
import {connect} from "react-redux";


class MessageNotifications extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('props in message : ',this.props)
    }

    render() {

        return (
            <NotificationGroup
                style={{ top: '45%', left: '50%', transform: 'translateX(-50%)' }}>
                <Fade enter={true} exit={true}>
                    {this.props.type && <Notification
                        type={{ style: this.props.type, icon: true }}
                        closable={false}
                    >
                        <span>{this.props.message}</span>
                    </Notification>}
                </Fade>
            </NotificationGroup>
        );
    }
}


const mapStateToProps = (state) => {

    return {
        type: state.alert.type,
        message: state.alert.message,
    };
};


export default connect(mapStateToProps)(MessageNotifications);


