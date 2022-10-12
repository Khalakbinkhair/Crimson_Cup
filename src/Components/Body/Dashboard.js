import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import Swal from "sweetalert2";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";


const Dashboard = () => {




    const { restaurantslug } = useParams();
    let navigate = useNavigate();
    const { table_no } = useParams();
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        axios.get("restaurant/" + restaurantslug)
            .then(resp => {
                setRestaurant(resp.data);

            });
    }, []);


    var user = JSON.parse(localStorage.getItem("user"));

    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("restaurant/" + restaurantslug + "/get-customer-orders/" + user.customer_phone)
            .then(resp => {
                setOrders(resp.data);
            }).catch(err => {
                console.log(err);
            });
    }, [user.customer_phone]);

    // console.log(orders);

    // const [msg, setMsg] = useState("");
    const cancelOrder = (orderId) => {
        axios.get("restaurant/" + restaurantslug + "/cancel-order/" + orderId)
            .then(resp => {
                // console.log(resp.data[5]['products']);

                // setMsg(resp.data);

                navigate("/" + restaurantslug + "/" + table_no + "/orders");
                window.location.reload(false);
                // if()
                // console.log(popularProudcts);
                // }).catch(err => {
                //     console.log(err);
            });
    };

    return (

        <div>
            <div className='container-fluid'>
                <div className='row justify-content-center' >
                    <div className='col-lg-9'>
                        <div className='card head_card'>
                            <div><Header restro_title={restaurant.restaurant_name} /></div>
                           

                            <div>
                                {!orders[0] ?
                                    (
                                        <div className="text-center" style={{color:'red',padding:'7rem'}}>
                                            <h3>No orders found!</h3>
                                        </div>
                                    )
                                    :
                                    (
                                        orders.map((order, key) => {
                                            return (
                                                <div key={key} className="card" style={{ width: "100%", padding: "1rem" }}>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Order Number: {order.order_number}</h5>
                                                        <h6 className="card-subtitle mb-2 text-muted">Time: {order.time}</h6>
                                                        <h6 className="card-subtitle mb-2 text-muted">Date: {order.date}</h6>
                                                        
                                                        <h6 className="card-subtitle mb-2 text-muted">Status:&nbsp; 
                                                        {order.status==='pending' && (
                                                            <span className="text-warning">Pending</span>
                                                        )}
                                                        {order.status==='preparing_order' && (
                                                            <span className="text-info">Your Order Is Preparing!</span>
                                                        )}
                                                        {order.status==='delivered' && (
                                                            <span className="text-success">Delivered</span>
                                                        )}
                                                        {order.status==='canceled' && (
                                                            <span className="text-danger">Your Order Is Canceled</span>
                                                        )}
                                                        </h6>
                                                        <hr />
                                                        <p className="card-text">
                                                            {order.products.map((product, key) => {
                                                                return (
                                                                    <div key={key} className="row">
                                                                        <div className="col-8">
                                                                            {product.quantity}x &nbsp; {product.name} ({product.attributes.size.charAt(0).toUpperCase()+ product.attributes.size.slice(1)})
                                                                        </div>
                                                                        <div className="col-4">
                                                                            Tk {Number(product.price)*Number(product.quantity)} &nbsp;
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <hr />
                                                            <div className="row">
                                                                        <div className="col-8">
                                                                          <b> Total: </b> 
                                                                        </div>
                                                                        <div className="col-4">
                                                                          <b> Tk {order.total_amount} &nbsp;</b> 
                                                                        </div>
                                                                    </div>
                                                            <hr />
                                                        </p>
                                                        {order.status === "pending" &&
                                                            (<button className="btn btn-danger"
                                                                onClick={() =>
                                                                    Swal.fire({
                                                                        title: 'Are you sure?',
                                                                        text: "You won't be able to revert this!",
                                                                        icon: 'warning',
                                                                        showCancelButton: true,
                                                                        confirmButtonColor: '#3085d6',
                                                                        cancelButtonColor: '#d33',
                                                                        confirmButtonText: 'Yes, cancel order!'
                                                                    }).then((result) => {
                                                                        if (result.isConfirmed) {
                                                                            cancelOrder(order.id)
                                                                            Swal.fire(
                                                                                'Canceled!',
                                                                                'Your order has been canceled.',
                                                                                'success'
                                                                            )
                                                                        }
                                                                    })
                                                                }>Cancel</button> )}
                                                                &nbsp;&nbsp;

                                                        <Link to={"/" + restaurantslug + "/" + table_no} className="btn btn-info">Order More..</Link>

                                                    </div>
                                                </div>
                                                
                                                
                                            )
                                            
                                        }
                                        )
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div><Footer footer_name={restaurant.restaurant_name} footer_follow='Follow us on' footer_all_rights={'Copyright © 2022 ' + restaurant.restaurant_name + ' All rights reserved'} /></div>


        </div>
    )
}
export default Dashboard;


