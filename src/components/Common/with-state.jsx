import React from 'react';

import { process } from '@progress/kendo-data-query';

export function withState(WrappedGrid) {
    return class StatefulGrid extends React.Component {
        constructor(props) {
            super(props);
            if (props.pageable === false) {
                this.state = {};
            } else {
                this.state = { skip: 0, take: this.props.take };
            }
        }

        render() {
            return (
                <WrappedGrid
                    filterable={this.props.filterable}
                    sortable={this.props.sortable}
                    pageable={{ pageSizes: this.props.pageSizes }}
                    {...this.state}
                    {...this.props}
                    resizable={this.props.resizable}
                    data={this.props.data ? process(this.props.data, this.state):[]}

                    onDataStateChange={(e) => { this.setState(e.data); }}
                />
            );
        }
    };
}
