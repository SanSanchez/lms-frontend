"use strict";

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';
import {Books} from './administrator/book/books.js';
import {Author} from './administrator/author/authors.js';
import {Publishers} from './administrator/publisher/publishers';
import {Branches} from './administrator/branch/branches';
import {Borrowers} from "./administrator/borrower/borrowers";
import {Librarian} from './librarian';
import {LibList} from "./libList";
import {Guest} from './guest';
import BookStore from '../stores/bookStore';
import AuthorStore from '../stores/authorStore';
import PublisherStore from '../stores/publisherStore';
import BranchStore from '../stores/branchStore';
import BorrowerStore from '../stores/borrowerStore';
import LibrarianStore from '../stores/librarianStore';

export class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          bookList : [],
          authorList : [],
          publisherList : [],
          branchList : [],
          borrowerList : []
        };
    }

    render() {
        return(
            <div>
                <Header />
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/books' render={(props) => (<Books {...props} bookList={this.state.bookList} />)}/>
                  <Route path='/authors' render={(props) => (<Author {...props} authorList={this.state.authorList} />)} />
                  <Route path='/publishers' render={(props) => (<Publishers {...props} publisherList={this.state.publisherList} />)} />
                  <Route path='/borrowers' render={(props) => (<Borrowers {...props} borrowerList={this.state.borrowerList} />)} />
                  <Route path='/branches' render={(props) => (<Branches {...props} branchList={this.state.branchList} />)} />
                  <Route path='/guest' render={(props) => (<Guest {...props} bookList={this.state.bookList} branchList={this.state.branchList} />)} />
                  <Route path='/librarian' render={(props) => (<Librarian {...props} branchList={this.state.branchList} />)} />
                  <Route path='/lib/branch' render={(props) => (<LibList {...props} />)} />
                </Switch>
            </div>
        );
    }

    UNSAFE_componentWillMount(){
        BookStore.addChangeListener(this._onBookChange.bind(this));
        AuthorStore.addChangeListener(this._onAuthorChange.bind(this));
        PublisherStore.addChangeListener(this._onPublisherChange.bind(this));
        BranchStore.addChangeListener(this._onBranchChange.bind(this));
        BorrowerStore.addChangeListener(this._onBorrowerChange.bind(this));
    }

    UNSAFE_componentWillUnmount(){
        BookStore.removeChangeListener(this._onBookChange.bind(this));
        AuthorStore.removeChangeListener(this._onAuthorChange.bind(this));
        PublisherStore.removeChangeListener(this._onPublisherChange.bind(this));
        BranchStore.removeChangeListener(this._onBranchChange.bind(this));
        BorrowerStore.removeChangeListener(this._onBorrowerChange.bind(this));
    }

    _onBookChange(){
        this.setState({bookList: BookStore.getAllBooks()});
    }

    _onAuthorChange() {
      this.setState({authorList : AuthorStore.getAllAuthors()});
    }

    _onPublisherChange() {
      this.setState({publisherList : PublisherStore.getAllPublishers()});
    }

    _onBranchChange() {
      this.setState({branchList : BranchStore.getAllBranches()});
    }

    _onBorrowerChange() {
      this.setState({borrowerList : BorrowerStore.getAllBorrowers()});
    }
}