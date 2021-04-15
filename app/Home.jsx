import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

@connect(
  state => ({}),
  dispatch => bindActionCreators({push}, dispatch)
)
export default class Home extends Component {

  constructor(props) {
    super(props);

    const {push, location} = this.props;
    push({
      pathname: '/wechat/video/',
      query: location.query
    });
  }

  render() {
    return false;
  };
}
