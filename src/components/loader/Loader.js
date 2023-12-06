import React from 'react'
import loaderImg from '../../assets/loader.gif';
import ReactDOM from 'react-dom';
import './Loader.scss';

const Loader = () => {
  return ReactDOM.createPortal(
    <div class="wrapper">
      <div class="loader">
        <img src={loaderImg} alt="Loading..."/>
      </div>
    </div>,
    document.getElementById("loader")
  )
} 

export const SpinnerImg = () => {
  return (
    <div class="--center-all">
      <img src={loaderImg} alt="Loading..."/>
    </div>
  )
};
export default Loader
