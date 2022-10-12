// import React from 'react'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../../Assests/css/style.css'
import Header from "../layouts/header";
import Footer from "../layouts/footer";

const TrackOrder = () => {

    const { restaurantslug } = useParams();
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
                // console.log(err);
            });
    }, [user.customer_phone]);
    

    return (
        <div className=''>
            {/* <div className='row justify-content-center' >
                <div className='col-lg-9'>
                    <div ><Header restro_title={restaurant.restaurant_name} /></div>

                    <h5 className="mb-0">Your Orders</h5> */}
                    <table className="table table-responsive-sm table-responsive-md">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Order Number</th>
                                <th>Total Quantity</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!orders[0] ?
                                (
                                    <tr>
                                        <td className="text-center" colspan="5">
                                            No orders found!
                                        </td>
                                    </tr>
                                )
                                :
                                (
                                    orders.map((order, key) => {
                                        return (
                                            <tr key={key}>
                                                <td className="">
                                                    {order.id}
                                                </td>
                                                <td className="">
                                                    {order.order_number}
                                                </td>
                                                <td className="">
                                                    {order.totalQty}
                                                </td>
                                                <td className="">
                                                    {order.time}
                                                </td>
                                                <td className="">
                                                    {order.date}
                                                </td>
                                                <td className="">
                                                    {order.status}
                                                </td>
                                                <td className="">
                                              <b>   {order.total_amount} ৳</b>   
                                                </td>
                                                
                                                <td className="">
                                                    { order.status==="pending" &&
                                                    (<button className="btn btn-danger">Cancel</button>)}
                                                     
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                )
                            }
                            {/* {orders && ()
                          } */}
                        </tbody>
                    </table>
                    
                </div>
        //     </div>
        // </div>
    )
}
export default TrackOrder;