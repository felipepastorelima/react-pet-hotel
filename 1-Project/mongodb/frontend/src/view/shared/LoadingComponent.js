import React, { Component } from 'react';
import ProgressBar from 'view/shared/ProgressBar';

export default class LoadingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null,
    };
  }

  componentWillMount() {
    ProgressBar.start();
  }

  componentWillUnmount() {
    ProgressBar.done();
  }

  render() {
    return <div />;
  }
}
