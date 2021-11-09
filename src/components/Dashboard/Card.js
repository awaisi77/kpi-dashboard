import React from 'react';
import {connect} from 'react-redux';


const Card = (props) => {
    let col = "col-md-"+props.md+" mb-"+props.md;
        return (
            <div className={col}>
                <div className="card">
                    {/* <div className="card-header">
                        <span>{props.title}</span>
                    </div> */}
                    <div className="card-body">
                        <div className="card-text">{props.content}</div>
                    </div>
                </div>
            </div>
        )
    }
;
const mapStateToProps = (state) => {

    return {
       // user: state.user
    };
};

export default connect(mapStateToProps)(Card);
