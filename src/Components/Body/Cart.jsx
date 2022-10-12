import React, { useEffect, useState } from 'react'
import '../../Assests/css/style.css'
import axios from 'axios'
import Header from '../layouts/header'
import Restro_intro from '../Restrurant-Intro/restro-intro'

import Footer from '../layouts/footer'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { CartProvider, useCart } from "react-use-cart";
import Popup from "reactjs-popup";
import Swal from 'sweetalert2'

const contentStyle = {

    maxWidth: "150rem",
    width: "25rem"
};

const Cart = (props) => {

    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    let [contact, setContact] = useState("");
    let [orderNote, setOrderNote] = useState("");
    let [bkash, setBkash] = useState("");
    let [cash, setCash] = useState("");
    let [onlinePayment, setOnlinePayment] = useState("");
    let [vat, setVat] = useState("0.00");
    let navigate = useNavigate();
    const [error, setError] = useState("");

    const { emptyCart } = useCart();
    const { restaurantslug } = useParams();
    const { table_no } = useParams();
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        axios.get("restaurant/" + restaurantslug)
            .then(resp => {
                setRestaurant(resp.data);

            });
    }, []);

    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
    } = useCart();

    let totalPrice = 0;
    items.forEach(function (item) {
        totalPrice += item.quantity * item.price;
        // ListCart.push(item);
    });

    var products = [];

    items.forEach(function (item) {
        // console.log("listcart theke id"+item.id)
        products.push({
            id: item.id,
            product_name: item.name,
            product_price: item.price,
            qty: item.quantity,
            size: item.size
        });
    });


    const orderSubmit = (event) => {
        var order = {
            table_number: table_no,
            customer_name: username,
            customer_email: email,
            customer_phone: contact,
            products: products,
            order_note: orderNote,
            payment: bkash,
            payment: cash,
            payment: onlinePayment,
            vat: vat
        };

        axios
            .post("restaurant/" + restaurantslug + "/order", order)
            .then(function (resp) {
                console.log(resp.data);
                var data = resp.data;
                if (data) {
                    emptyCart();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: data,
                        showConfirmButton: false,
                        timer: 1600
                    })

                    var user = { customer_name: username, customer_phone: contact };
                    localStorage.setItem("user", JSON.stringify(user));

                    navigate("/" + restaurantslug + "/Dashboard");
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log("erroraa : " + err);
                if (err) {
                    setError("There is something wrong in the order!!!");
                }
            });
        event.preventDefault();


    }
    return (
        <div className='container-fluid body'>
            <div className='row justify-content-center' >
                <div className='col-lg-9'>

                    <div ><Header restro_title={restaurant.restaurant_name} /></div>
                    <br />
                 
                    <div className="card" style={{ width: "100%", padding: "1rem" }}>
                        <div className="card-body">


                            {!isEmpty &&
                                items.map((item, key) => {
                                    return (

                                        <div key={key}>
                                    
                                            <p className="card-text">
                                                <div key={key} className="row">
                                                    <div className="col-3">
                                                        <div className='row' style={{ width: "11rem" }}>
                                                            <div className='col-2'>
                                                                <span className="btn btn-danger btn-sm" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</span>
                                                            </div>
                                                            <div className='col-2'  style={{padding:'0rem .5rem'}}>

                                                                <span className="btn  btn-sm" style={{border:'none'}}>{item.quantity}</span>
                                                            </div>
                                                            <div className='col-2'>
                                                                <span className="btn btn-sm btn_cart_i" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-6' style={{ fontSize: "1rem" }}>
                                                        {item.name}
                                                    </div>
                                                    <div className="col-3">
                                                        Tk {Number(item.price) * Number(item.quantity)} &nbsp;
                                                    </div>
                                                </div>
                                            </p>
                                            <hr/>


                                        </div>

                                    )
                                })

                            }
                            <hr />
                            <div className="row">
                                <div className="col-9">
                                <b>    Total:</b>
                                </div>
                                <div className="col-3">
                                <b>  Tk &nbsp; {totalPrice}</b>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                            <br/>
                    {!isEmpty &&
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-center'>
                                <Popup
                                    trigger={<button className='btn  confirm_btn btn-sm'> Confirm Order</button>}
                                    modal contentStyle={contentStyle} >
                                    {close => (
                                        <p>

                                            <a type="button" className="btn-close order_cart_close_btn" aria-label="Close" onClick={close}>
                                            </a>
                                            <div className='Order_chekout'>
                                                <br />
                                                <form onSubmit={(e) => { orderSubmit(e); }} >


                                                    <input type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="Full Name"
                                                        className="form-control"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        className="form-control address-control-item address-control-item-required checkout-input"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <br />
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        id="phone"
                                                        placeholder="Phone "
                                                        className="form-control address-control-item address-control-item-required checkout-input"
                                                        value={contact}
                                                        onChange={(e) => setContact(e.target.value)}
                                                    />
                                                    <br />
                                                    <textarea
                                                        name="order_note"
                                                        id="order_note"
                                                        className="form-control"
                                                        rows={4}
                                                        placeholder="Notes about your order, e.g. special notes for food."
                                                        value={orderNote}
                                                        onChange={(e) => setOrderNote(e.target.value)}
                                                    />
                                                        
                                                    <br />

                                                  
                                                  
                                                    <div class="form-check">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        id="cash"
                                                        className="form-check-input"
                                                        value={cash}
                                                        onChange={(e) => setCash(e.target.value)}
                                                    /><label for="payment">&nbsp; Cash Payment</label>
                                                      </div>


                                                      <div class="form-check">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        id="bkash"
                                                        className="form-check-input"
                                                        value={bkash}
                                                        onChange={(e) => setBkash(e.target.value)}
                                                    /><label for="payment">&nbsp; Bkash</label>
                                                    </div>

                                                    
                                                    <div class="form-check">
                                                    <input
                                                        type="radio"
                                                        name="payment"
                                                        id="OnlinePayment"
                                                        className="form-check-input"
                                                        value={onlinePayment}
                                                        onChange={(e) => setOnlinePayment(e.target.value)}
                                                    /><label for="payment"> &nbsp; Online Payment</label>
                                                    </div>
                                                   

                                                    <br />
                                                    <button type="submit" className="btn btn-primary confirm_order_cart" > Order </button>
                                                </form>

                                            </div>
                                        </p>
                                    )}

                                </Popup>
                            </div>
                        </div>

                    }

                    {isEmpty &&

                        <div style={{ 'color': "red" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            You haven't added any item in the Cart </div>
                    }
                    <div className="footer">
                        <Footer footer_name={restaurant.restaurant_name} footer_follow='Follow us on' footer_all_rights={'Copyright © 2022 ' + restaurant.restaurant_name + ' All rights reserved'} />
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Cart;