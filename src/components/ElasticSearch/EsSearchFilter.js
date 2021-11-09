import React from 'react';
import {connect} from 'react-redux';

const DashboardFilter = (props) => (
    <div className="card mb-4 FilterHolder">
        <div className="card-body">

            <form>
                <div className="form-row">
                    <div className="col-md-2" tooltip="Start Date" flow="down">
                        <input id="start" style={{width: '100%'}} placeholder="Start Date"/>
                    </div>
                    <div className="col-md-2" tooltip="End Date" flow="down">
                        <input id="end" style={{width: '100%'}} placeholder="End Date"/>
                    </div>
                    <div className="col-md-2" tooltip="Select" flow="down">
                        <select id="size" className="" style={{width: '100%'}}>
                            <option>Chat Bot</option>
                            <option>Insight</option>
                            <option>iSite</option>
                            <option>Authenticator</option>
                            <option>Witness</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button type="button" className="btn btn-secondary">Clear</button>
                        <button type="button" className="btn btn-primary filterSearch ml-2"><i className="fad fa-search"></i> Search
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
);

const mapStateToProps = (state) => {

    return {
       // user: state.user
    };
};

export default connect(mapStateToProps)(DashboardFilter);
