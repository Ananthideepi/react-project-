import React from 'react'
import SearchProduct from './search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  // DropdownButton,
  Dropdown, Image
} from 'react-bootstrap'
import { logout } from '../action/userloginaction'

export default function Header() {
  const { isAuthenticate, user } = useSelector(state => state.authReducerState);
  const { items: cartItem } = useSelector(state => state.cartreducerstate);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  console.log("catrdf",cartItem)
  const logoutHandler = () => {
    dispatch(logout)
  }

  // console.log("headerfield",user)
  return (
    <div>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">

            <Link to="./">
              <h3 style={{ color: "white", textDecorationLine: "none" }}>Ecom-Card</h3>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <SearchProduct />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {isAuthenticate ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle varient='default text-white pr-5' id="dropdown-basic "
                style={{
                  backgroundColor: "#9cb332", border: "none", outline: "none", width: "60%"
                }}>
                <figure className='avatar avatar-nav'>
                  <Image style=
                    {{ width: "32px", borderRadius: "20px" }} src="{user[0].avatar??./images/2.jpg}"></Image>
                </figure>
                <span>{user[0].name}</span>

              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item className="text-dark" onClick={() => { navigate("/profile") }}>Profile </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={logoutHandler}>logout </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
            :
            (<Link to="/login">
              <button className="btn" id="login_btn">Login</button>
            </Link>)}
          <Link to="/cartitem">
            <span id="cart" className="ml-3">Cart</span>
          </Link>
          <span className="ml-1" id="cart_count">{cartItem.length}</span>
        </div>
      </nav>
    </div>
  )
}
