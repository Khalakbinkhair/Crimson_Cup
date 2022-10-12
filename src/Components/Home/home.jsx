import React, { useEffect, useState } from 'react'
import Header from '../layouts/header'
import Footer from '../layouts/footer'
import axios from 'axios'
import Card from '../Body/card'
import Restro_intro from '../Restrurant-Intro/restro-intro'
import Meals from '../../Assests/images/meals.png'
import { useParams } from 'react-router-dom'
import '../../Assests/css/style.css'




const Home = () => {

    const { restaurantslug } = useParams();
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        axios.get("restaurant/" + restaurantslug)
            .then(resp => {
                setRestaurant(resp.data);
              
            });
    }, []);
//   console.log(restaurant);
    return (
        
            <div className='container-fluid'>
                <div className='row justify-content-center' >
                    <div className='col-lg-9'>
                        <div className='card head_card'>
                            <div><Header restro_title={restaurant.restaurant_name} /></div>

                            <Restro_intro restro_intro={restaurant.slogan} restro_intro_imgurl={restaurant.restaurant_photo}  restro_bg_photo={restaurant.bg_photo} 
/>

                            <Card bg_img={restaurant.bg_photo} meals_img={Meals} />
                        </div>
                    </div>
                </div>
           

            <div><Footer footer_name={restaurant.restaurant_name} footer_follow='Follow us on' footer_all_rights={'Copyright © 2022 ' + restaurant.restaurant_name + ' All rights reserved'}/></div>
        </div>
    )
}
export default Home;