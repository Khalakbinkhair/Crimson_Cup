import React, { useState, useEffect } from "react";
import '../../Assests/css/style.css'
import '../../Assests/script/custom.js'
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom'

import { CartProvider, useCart } from "react-use-cart";


const Items = (props) => {

    const { restaurantslug } = useParams();
    const { table_no } = useParams();
   

    return (

        <div className='card items_card_info'>
            <img className='img-fluid card_img_hover' src={props.coffee_img} />
            <div className='card-body'>
                <p className='m-0 text_info'><b>{props.item_name} </b></p>
                <p className='m-0 text_info'> Price: {props.item_price}</p>
                <br/>
                
                <Link to={"/" + restaurantslug +"/"+table_no + "/cart"} style={{textDecoration:'none',color:'white'}}  >
                        < button type="button" className="btn btn-outline add_cart_btn " >
                            <FontAwesomeIcon icon={faShoppingCart} /> Order
                        </button>
                        </Link>


            </div>

        </div>
    )
}
export default Items;


