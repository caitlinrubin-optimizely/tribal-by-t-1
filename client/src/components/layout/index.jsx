import React from 'react';
import { Button } from 'optimizely-oui';
import { connect } from 'react-redux';

import Search from 'components/search';
import Results from 'components/results';

import { executeQuery } from 'actions/searchActions';

import logo from 'theme/logo.png';
import './style.scss';

const Layout = (props) => {
  const spinner = props.isFetching && (
    <div className="overlay">
      <div className="spinner"></div>
    </div>
  );

  return (
    <div className="layout">
      <div className="layout__top-bar">
        <div className="layout__logo">
          <img src={`/static/${logo}`} /> Knowledge Base
        </div>
      </div>
      <div className="layout__search-bar">
        <div className="layout__search-field">
          <Search />
        </div>
        <div className="layout__search-button">
          <Button
            style="highlight"
            onClick={() => props.executeQuery(props.query)}
            isDisabled={props.isFetching}>
            Search
          </Button>
        </div>
      </div>
      <div className="layout__spinner">
        {spinner}
      </div>
      <div className="layout__results">
        <Results />
      </div>
    </div>
  )
};

const mapStateToProps = ({ search }) => {
  return {
    isFetching: search.isFetching,
    query: search.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    executeQuery: executeQuery(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
