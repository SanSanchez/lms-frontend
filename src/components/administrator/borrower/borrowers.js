"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {BorrowerList} from './BorrowerList';

export class Borrowers extends React.Component{

    render() {
        return(
            <div>
                <BorrowerList borrowerList = {this.props.borrowerList} />
            </div>
        );
    }
}

Borrowers.propTypes = {
    borrowerList: PropTypes.array.isRequired
};
