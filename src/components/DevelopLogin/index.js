import React, { Component } from 'react';

class DevelopLogin extends Component {
  state = { term: '' };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.term);
  };

  onInputChange = e => {
    this.setState({ term: e.target.value });
  };

  render() {
    return (
      <div>
        DevelopLogin
        <form onSubmit={this.onFormSubmit} className="DevelopLogin__form">
          <input
            onChange={this.onInputChange}
            value={this.state.term}
            type="text"
            className="DevelopLogin__input"
          />
          <button type="submit" className="DevelopLogin__btn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default DevelopLogin;
