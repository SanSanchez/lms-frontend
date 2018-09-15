"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {BranchList} from './BranchList';

export class Branches extends React.Component{

    render() {
        return(
            <div>
                <BranchList branchList = {this.props.branchList} />
            </div>
        );
    }
}

Branches.propTypes = {
    branchList: PropTypes.array.isRequired
};
