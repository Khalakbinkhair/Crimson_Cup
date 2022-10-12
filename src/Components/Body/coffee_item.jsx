import React, { useState, useEffect } from "react";
import '../../Assests/css/style.css'
import '../../Assests/script/custom.js'

const Coffee_item = (props) => {

    const [price, setPrice] = useState("");
    var propHasPrice = false;
    // console.log(props.product_price);
    if (!price) {
        if (props.product_price) {
            propHasPrice = true;
        }
    }

    // console.log(props.product_attributes);
    const [buttons, changeState] = useState({
        activeObject: props.product_attributes[0]['id'],
        objects: props.product_attributes
    });

    function toggleActiveStyles(id, pr) {
        if (buttons.activeObject === id) {
            return "btn edit-btn active";
        } else {
            return "btn edit-btn";
        }
    }

    function toggleActive(id) {
        changeState({ ...buttons, activeObject: id });
    }


    const handleClick = (price) => {

        // menus[0]['id'] +

        setPrice(price);

    }

    return (

        <div className='row coffee-card-detail'  >
            <div className='col-md-6 '>
                <img className='img-fluid coffee-img img_extension' src={props.coffee_img} />
            </div>
            <div className='col-md-6  coffee-details'>
                <p className='m-0'>Food Name:&nbsp; {props.coffee_name}</p>
                <p className='m-0'>Size:
                    {props.product_attributes.map((pa, index) =>

                        <button key={index} type="button" className={toggleActiveStyles(pa.id, pa.price)} value={pa.product_price} onClick={() => { handleClick(pa.product_price); toggleActive(pa.id) }}>{pa.product_size.charAt(0).toUpperCase() + pa.product_size.slice(1)}</button>

                    )}

                    {/* <button type="button" className="btn edit-btn">{props.btn_size}</button>
                    <button type="button" className="btn edit-btn" id='medium' >{props.medium_size}</button>
                    <button type="button" className="btn edit-btn" id='large' >{props.large_size}</button> */}
                </p>
                <p className='m-0'>  Specification:&nbsp;{props.coffee_specification}<br /></p>
                {/* <p className='m-0'>price:&nbsp;{price}</p> */}
                {
                    propHasPrice && (
                        <p className='m-0'>price:&nbsp;{props.product_price}</p>
                    )
                }
                {
                    !propHasPrice && (
                        <p className='m-0'>price:&nbsp;{price}</p>
                    )
                }
            </div>
        </div>
    )
}
export default Coffee_item;


