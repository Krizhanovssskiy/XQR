import './style.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { PlusCircle } from '../Buttons';
import { showPopup } from '../../_actions';

import Shop from '../Shops';

class ScrollHorizontalImg extends Component {
  scrollLeft = e => {
    let sas = ReactDOM.findDOMNode(this); //  In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.
    if (e.deltaY > 0) { // https://reactjs.org/docs/react-dom.html#finddomnode
      sas.scrollLeft += 20;
    }
    if (e.deltaY < 0) {
      sas.scrollLeft -= 20;
    }
  };

  render() {
    return (
      <div onWheel={this.scrollLeft} className="ScrollHorizont__container">
        <div className="ScrollHorizont__img-container">
          <Shop props={this.props} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  {
    showPopup
  }
)(ScrollHorizontalImg);
