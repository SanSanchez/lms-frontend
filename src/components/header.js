"use strict";

import React from 'react';
import {Link} from 'react-router-dom';


export class Header extends React.Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="colapse navbar-collapse" id='navbarNav'>
                    <Link to="/" className="navbar-brand">
                        <img width="90px" height="30px" src="images/logo.png" />
                    </Link>
                    <ul className="navbar-nav">
                      <li className='nav-item'><Link className='nav-link' to="/" replace>Home</Link></li>
                      <li className='nav-item'><Link className='nav-link' to="/books" replace>Books</Link></li>
                      <li className='nav-item'><Link className='nav-link' to="/authors" replace>Authors</Link></li>
                      <li className='nav-item'><Link className='nav-link' to="/publishers" replace>Publishers</Link></li>
                      <li className='nav-item'><Link className='nav-link' to="/branches" replace>Branches</Link></li>
                      <li className='nav-item'><Link className='nav-link' to='/borrowers' replace>Borrowers</Link></li>
                      <li className='nav-item'><Link className='nav-link' to='/guest' replace>Guest</Link></li>
                      <li className='nav-item'><Link className='nav-link' to='/librarian' replace>Librarian</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}