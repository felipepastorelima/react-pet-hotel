import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/styles/hljs';
import PropTypes from 'prop-types';

class JsonHighlighter extends Component {
  render() {
    return (
      <SyntaxHighlighter language="json" style={vs}>
        {this.props.code}
      </SyntaxHighlighter>
    );
  }
}

JsonHighlighter.propTypes = {
  code: PropTypes.string.isRequired,
};

export default JsonHighlighter;
