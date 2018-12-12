import React, { Component } from 'react';
import { css } from 'react-emotion';
import { HashLoader } from 'react-spinners';

const override = css`
    display: inline-block;
    // margin: 0 auto;
    border-color: red;
    position:absolute;
    float:left;
    top: 50vh;
    left: 50vw;
`;

export default class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <HashLoader
          className={override}
          sizeUnit={"px"}
          size={30}
          color={'#007bff'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}
