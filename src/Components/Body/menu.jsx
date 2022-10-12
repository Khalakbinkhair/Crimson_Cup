import React, { useEffect, useState } from 'react'
import '../../Assests/css/style.css'
const Menu = (props) => {

    return (


        
       
            <div className='card menu_card_info'>
            <img className='img-fluid card_img_hover' src={props.coffee_img} />

            <div className='card-body '>
            <p className='m-0 menu_info '>{props.item_name}</p>
            {/* <p className='m-0 menu_info'> {props.item_description}</p> */}
            </div>

            </div>
  
        

    )
}
export default Menu;