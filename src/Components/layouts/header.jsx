import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useState, useEffect } from "react"
import { CartProvider, useCart } from "react-use-cart";
import { useParams } from 'react-router-dom'




const Header = (props) => {

  const { table_no } = useParams();

  var user = JSON.parse(localStorage.getItem("user"));
  const {
    totalUniqueItems
  } = useCart();

  const { restaurantslug } = useParams();

  return (
      <div className='row'>
        <div className='col-md-12'>


          <Navbar color="yellow" expand="lg" variant="light">
            <Navbar.Brand className='nav-text'
             name={"/" + restaurantslug}>{props.restro_title} 
             </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="header_item">
                <li className="nav-item">
                  <Link className="nav-link header_edt" to={"/" + restaurantslug}> Home </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link header_edt" to={"/" + restaurantslug + "/shop"}> Shop </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link header_edt" to={"/" + restaurantslug + "/contact_us"}> Contact Us </Link>
                </li>
                {user && (
                  <li className="nav-item">
                  <Link className="nav-link header_edt" to={"/" + restaurantslug +"/orders"}> Track Orders  </Link>
                </li>
                )}
                <li className="nav-item">
                  
                    <div className="header-action-2 header-action-icon-2">
                      
                      <Link className="mini-cart-icon nav-link header_edt" to={"/" + restaurantslug +"/"+table_no + "/cart"}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <span className="cart_count  pro-count">{totalUniqueItems}</span>
                      </Link>
                    
                  </div>
                  
                </li>

              
              </Nav>
            </Navbar.Collapse>

          </Navbar>




        </div>
      </div>
    
  )
}
export default Header;





