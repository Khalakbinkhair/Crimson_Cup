import React, { useEffect, useState } from 'react'
import '../../Assests/css/style.css'
import 'reactjs-popup/dist/index.css';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'

import Popup from 'reactjs-popup';
import { render } from "react-dom";
import "../../Assests/css/popup.css"
import { CartProvider, useCart } from "react-use-cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



const Product_view = (props) => {

    let navigate =useNavigate();
    

    let { addItem } = useCart();


    // const [isOpen, setIsOpen] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState("");

    const [size, setSize] = useState("");

    var propHasPrice = false;
    // console.log(props.product_price);
    if (!price) {
        if (props.item_price) {
            propHasPrice = true;
        }
    }

    var [buttons, changeState] = useState("");
    if (props.item_attributes[0]) {
        changeState = props.item_attributes[0]['id']
    }

    function toggleActiveStyles(id, pr) {
        if (buttons == id) {
            return "btn edit-btn active";
        } else {
            return "btn edit-btn";
        }
    }
    function toggleActive(id) {
        changeState({ ...buttons, activeObject: id });
    }


    useEffect(() => {
        if (props.item_attributes[0]) {
            setSize(props.item_attributes[0].product_size);
        }
        else {
            setSize('Regular');
        }
        // console.log(props.item_attributes[0].product_size)

    }, []);

    const { restaurantslug } = useParams();
    const { table_no } = useParams();

    const handleClick = (pa) => {
        setPrice(pa.product_price);
        setSize(pa.product_size);
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12 '>
                    <img className='img-fluid popup_img' src={props.product_img} />
                </div>
            </div>

            <p className='m-0 hover_modal_info'><b><h3>{props.item_name}</h3></b></p>
            <p className='m-0 hover_modal_info' > {props.item_description}</p><br />
            <p className='m-0 hover_modal_info'>{props.item_attributes[0] && 'Size: '}
                {props.item_attributes.map((pa, index) =>

                    <button key={index} type="button" className={"" + toggleActiveStyles(pa.id, pa.price)} value={pa.product_price} onClick={() => { handleClick(pa); toggleActive(pa.id) }}>{pa.product_size.charAt(0).toUpperCase() + pa.product_size.slice(1)} &nbsp;</button>

                )}
                &nbsp;
            </p><br />

            {
                propHasPrice && (
                    <p className='m-0 hover_modal_info'>Price:&nbsp;{props.item_price}</p>
                )
            }
            {
                !propHasPrice && (
                    <p className='m-0 hover_modal_info'>Price: {price}</p>
                )
            }
            <br />

            <div className='row justify-content-center'>


                <div className='col-2 popup_btn_D'>
                    <button type="button" disabled={quantity == 1} className="btn btn_edit_Neg" min={1} step={1} value={quantity} onClick={e => { setQuantity(Number(e.target.value) - 1); }}>-</button>
                </div>
                <div className='col-3 quantity_number '>
                    <input type="number" id='quantity' name="quantity"
                        className="form-control " value={quantity}></input>
                </div>
                <div className='col-2  popup_btn_I'>
                    <button type="button" className="btn btn_edit_pos" min={1} step={1} value={quantity} onClick={e => { setQuantity(Number(e.target.value) + 1); }}>+</button>
                </div>
                <div className='col-5'   onClick={() =>
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product added to cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }>
                        < button type="button" className="btn btn-outline add_cart_btn " onClick={() =>
                            addItem({
                                id: props.product_id + size,
                                name: props.item_name,
                                price: propHasPrice ? (props.item_price) : (price),
                                size: size,
                                quantity: quantity,
                                image: props.product_img,
                            })
                    }>
                    <Link to={"/" + restaurantslug +"/"+table_no + "/cart"} style={{textDecoration:'none',color:'white'}}  >
                    <FontAwesomeIcon icon={faShoppingCart} /> order
                    </Link>
                </button>
            </div>
        </div>
        </div >
    )
}
export default Product_view;
