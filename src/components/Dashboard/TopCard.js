import React from 'react';
import {connect} from 'react-redux';

const TopCard = (props) => (
    <div className="col-sm-6 col-md-4 col-lg-2 mb-4 cbox-con">
        <div className="card box1">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.value}</p>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {

    return {
       // user: state.user
    };
};

export default connect(mapStateToProps)(TopCard);
