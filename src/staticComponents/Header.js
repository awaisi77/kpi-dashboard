import React from 'react';
import {connect} from 'react-redux';
//import { NavLink } from 'react-router-dom';
import Logo from "../styles/img/chatbot.svg";
import {menuToggle} from "../actions/menuToggle";

const Header = (props) => {
    let toggleMenuEvent = () => {
        console.log('menu toggle state',props.menuToggle)
      if(props.menuToggle === '')
      {props.dispatch(menuToggle('toggled-2'))}
        else{
          props.dispatch(menuToggle(''))
      }
    };
    return (

        <nav className="navbar navbar-expand-lg navbar-fixed-top headerNav">
            <a className="navbar-brand" href="#">
                <img src={Logo}/></a>
            
            <a class="navbar-toggle sidebarToggle " data-toggle="collapse" id="menu-toggle-2">
            <span>
            <svg class="ham ham2" viewBox="0 0 100 100" width="40" onclick="this.classList.toggle('active')">
              <path
                    class="line top"
                    d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381" />
              <path
                    class="line middle"
                    d="m 30,50 h 40" />
              <path
                    class="line bottom"
                    d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381" />
            </svg>
          </span>
        </a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <a href="javascript:;" className="float-right mainNav" tooltip="User" flow="down"><i
                        className="fad fa-user-alt"></i></a>
                    <a href="javascript:;" className="float-right mainNav logOff" tooltip="Log Off" flow="left"><i
                        className="fad fa-power-off"></i></a>
                </form>
            </div>
        </nav>

    );
}

const mapStateToProps = (state) => {

    return {
        menuToggle: state.menuToggle
    };
};

export default connect(mapStateToProps)(Header);
