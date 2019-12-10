import './style.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserInfo} from '../../_src/lib/api';
import { hidePopup,
          showPopup,
          getGoalsListing,
          createGoal,
          destroyGoal,
          updateGoal} from "../../_actions";
import PopUpAddedGoals from "./PopUpAddedGoals/PopUpAddedGoals";
import { OPEN_POPUP_GOALS } from '../../_constants';
import Modal from "../Modal";
import ItemGoal from "./ItemGoal";
import i18next from "i18next";

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goalId: null,
      valueInput: ''
    };


  }

  componentDidMount() {
    const { match, getGoalsListing } = this.props;
    const {params} = match;
    const alias = params.alias;

    if (alias) {
      getGoalsListing(alias);
    }
  }

  onClickGoal = ({ id, name }) => {
    this.setState({
      goalId: id,
      valueInput: name
    });
    this.props.showPopup(OPEN_POPUP_GOALS);
  };
  onDeleteData = (goalId) => {
    const { auth, user_profile, hidePopup, destroyGoal } = this.props;
    const {api_token} = auth.user;
    const { alias } = user_profile;
    destroyGoal({
      api_token,
      alias,
      goal_id: goalId
    });
    hidePopup();
    this.setState({
      goalId: null,
      valueInput: ''
    })
  };
  onSubmitData = () => {
    const { goalId: id, valueInput: name } = this.state;
    const { auth, user_profile, createGoal, updateGoal} = this.props;
    const {api_token} = auth.user;
    const { alias, id: profile_id } = user_profile;
    if (id) {
      updateGoal({
        api_token,
        alias,
        name,
        id
      })
    } else {
      createGoal({
        api_token,
        alias,
        name,
        profile_id
      });
    }
    this.setState({
      valueInput: ''
    });
    this.props.hidePopup()
  };
  onChangeInput = e => {
    const value = e.target.value;
    this.setState({
      valueInput: value
    })
  };
  onResetGoalPopUp = () => {
    this.setState({
      goalId: null,
      valueInput: ''
    });

    this.props.hidePopup();
  };

  render() {
    const { clazz,
      goals,
      isChangePage,
      popupToShow,
      showPopup,} =this.props;
    const { goalId, valueInput } = this.state;
    return (
      <div className='Goals'>
        <div className={`Goals__container ${clazz}Goals`}>
          <ul className='Goals__list-tasks'>
            {
              goals.map( (item, idx) => {
                return (
                  <ItemGoal
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    idx={idx}
                    onClickGoal={this.onClickGoal}
                  />
                )
              })
            }
          </ul>
          {
            isChangePage && (
              <button
                onClick={() => showPopup(OPEN_POPUP_GOALS)}
                className='Goals__btn-add-task'
              >
                +  {i18next.t("goals.added_goal")}
              </button>
            )
          }

        </div>

        {
          popupToShow === OPEN_POPUP_GOALS && isChangePage && (
            <Modal>
              <PopUpAddedGoals
                goalId={goalId}
                valueInput={valueInput}
                onChangeInput={this.onChangeInput}
                onReset={this.onResetGoalPopUp}
                onSubmitData={this.onSubmitData}
                onDeleteData={this.onDeleteData}
              />
            </Modal>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({ profile,
                           auth,
                           goals,
                           popupToShow,
                           isChangePage
                         }) => ({
  user_profile: profile,
  auth,
  goals,
  popupToShow,
  isChangePage,
});


export default connect(
  mapStateToProps,
  {
    getUserInfo,
    showPopup,
    hidePopup,
    getGoalsListing,
    createGoal,
    destroyGoal,
    updateGoal
  }
)(withRouter(Goals));