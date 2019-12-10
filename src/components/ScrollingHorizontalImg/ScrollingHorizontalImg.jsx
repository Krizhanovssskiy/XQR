import './style.scss';

import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { PlusCircle } from '../Buttons';
import {hidePopup, showPopup} from "../../_actions";

import {SHOW_PRODUCT} from "../../_constants";
import Modal from "../Modal/Modal";
import ProductPopUp from "../ProductPopUp";


class ScrollHorizontalImg extends Component {
  static defaultProps = {
    list: [],
    darkness: null,
    showProductPopUp: () => {}
  };

  state = {
    selectedObject: null,
    off:false
  };

  scrollLeft = e => {
    let sas = ReactDOM.findDOMNode(this);
    if (e.deltaY > 0) {
      sas.scrollLeft += 20;
    }
    if (e.deltaY < 0) {
      sas.scrollLeft -= 20;
    }
  };

  productPopUp = (obj) => {

    this.props.showProductPopUp();
    this.setState({
      selectedObject: obj
    })
  };

  onResetProduct = () => {
    this.setState({
      selectedObject: null
    });
    this.props.hidePopup();
  };

  render() {
    const { list,
      darkness,
      onClickBtn,
      clazz,
      isChangePage,
      popupToShow} = this.props;
    return (
      <div onWheel={this.scrollLeft} className="ScrollHorizont__container">
        <div className="ScrollHorizont__img-container 2222">
          {list.map((item,key) => {
            const { id, images, name, price, description } = item;
            return (
              <div
                key={key}
                onClick={() => this.productPopUp(item)}
                className={`ScrollHorizont__img-box ${
                  darkness
                    ? `ScrollHorizont__darkness-bottom`
                    : `ScrollHorizont__darkness-top`
                }`}>
                <img className="ScrollHorizont__img" src={require("../../img/icon-180x180.png") || images || ""} alt="Здесь будет ваша картинка" />
                <p
                  className={`${clazz}__top-text ScrollHorizont__name-text ScrollHorizont__text-box ${darkness
                      ? 'ScrollHorizont__text-bottom'
                      : 'ScrollHorizont__text-top'}`}>
                  {name}
                </p>

                {
                  price && (
                    <p className={`${clazz}__bottom-text ScrollHorizont__text-box  ScrollHorizont__total-text`}>
                      {`$ ${price}`}
                    </p>
                  )
                }
              </div>
            )
          })}
          {
            !isChangePage
              ? null
              : (
                <div
                  key={'PlusCircle'}
                  className="ScrollHorizont__img-box ScrollHorizont__added"
                >
                  <PlusCircle onClick={onClickBtn} />
                </div>
              )
          }
          {list.length === 0 ? (
            <Fragment>
              <div
                key={'no-active-10'}
                className="ScrollHorizont__img-box ScrollHorizont__no-active"
              />
              <div
                key={'no-active-11'}
                className="ScrollHorizont__img-box ScrollHorizont__no-active"
              />
            </Fragment>
          ) : null}
          {list.length === 1 ? (
            <div className="ScrollHorizont__img-box ScrollHorizont__no-active" />
          ) : null}
        </div>
        {
          popupToShow === SHOW_PRODUCT && (
            <Modal>
              <ProductPopUp
                product={this.state.selectedObject}
                selectedObject={this.state.selectedObject}
                onClouseProductPopUp={this.onResetProduct}
              />
            </Modal>
          )
        }
      </div>
    );
  }
}



export default connect(
  (state)=>({ popupToShow: state.popupToShow}),
  {
    showPopup,
    hidePopup,
  }
)(ScrollHorizontalImg);
