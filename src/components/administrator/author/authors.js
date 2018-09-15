"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import {AuthorList} from './AuthorList';

export class Author extends React.Component{

    render() {
        return(
            <div>
                <AuthorList authorList = {this.props.authorList} />
            </div>
        );
    }
}

Author.propTypes = {
    authorList: PropTypes.array.isRequired
};
