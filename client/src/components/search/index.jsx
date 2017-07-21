import React from 'react';
import { Input } from 'optimizely-oui';
import { connect } from 'react-redux';

import { updateQuery, executeQuery } from 'actions/searchActions';

import './style.scss';

const Search = (props) => {
  const queryChangeHandler = (e) => {
    props.updateQuery(e.target.value);
  };

  const keyDownHandler = (e) => {
    const keyCode = (e.keyCode ? e.keyCode : e.which);
    if (keyCode === 13) {
      props.executeQuery(props.query);
    }
  };

  return (
    <div className="search">
      <Input
        isFilter={true}
        placeholder="Enter a topic..."
        type="text"
        onChange={queryChangeHandler}
        value={props.query}
        onKeyDown={keyDownHandler}
      />
    </div>
  );
};

const mapStateToProps = ({ search }) => {
  return {
    query: search.query,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateQuery: updateQuery(dispatch),
    executeQuery: executeQuery(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
