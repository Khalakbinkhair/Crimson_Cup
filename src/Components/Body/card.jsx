import React, { useState, useRef, useEffect } from "react";
import '../../Assests/css/style.css'
// import Coffee_item from './coffee_item';
import Menu from "./menu";
import Popular_items from "./popular_items";
import Items from "./items";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Slider from "react-slick";
import Product_view from "./product_view";
import { faFire } from '@fortawesome/free-solid-svg-icons'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, Link } from 'react-router-dom'
import Popup from "reactjs-popup";
import Warper from "../../Assests/examples/Warper";
import { FaTimesCircle } from "react-icons/fa";
import 'reactjs-popup/dist/index.css';

const contentStyle = {

    maxWidth: "150rem",
    width: "23rem",
    margin: "auto",
    right: ".8rem"

};




const Card = (props) => {

    const { restaurantslug } = useParams();
    const [navMenuStyle, setNavMenuStyle] = useState("menu_nav_hide");
    const [products, setProducts] = useState([]);
    const [forhungers, setForhunger] = useState([]);
    const [popularProudcts, setPopularProudcts] = useState([]);
    const [all_products, setAllProducts] = useState([]);
    const [menus, setMenus] = useState([]);
    const [menu_with_all_products, setMenu_with_all_products] = useState([]);
    // const myRef = useRef(null)



    //    const executeScroll = () => myRef.current.scrollIntoView()
    const [productShow, setproductShow] = useState(false);
    const ref = useRef([]);
    const { table_no } = useParams();


    const handleClickScroll = (index) => {
        // ref.current?.scrollIntoView({behavior: 'smooth'});
        // console.log(ref.current[0]);
        // window.scroll(0,findPos(document.getElementById(menu_id)));
        // console.log("Menu Index=> " + index);
        ref.current[index].scrollIntoView({ behavior: 'smooth' });
        // ref.Items.
    };

    const productHandleClick = (p_id) => {
        setproductShow(true);

    }
    useEffect(() => {
        axios.get("restaurant/" + restaurantslug + "/menu/allproducts")
            .then(resp => {
                // console.log(resp.data[5]['products']);
                setMenu_with_all_products(resp.data);
                // if()
                // console.log(popularProudcts);
                // }).catch(err => {
                //     console.log(err);
            });
    }, []);

    useEffect(() => {
        axios.get("restaurant/" + restaurantslug + "/menu")
            .then(resp => {
                setMenus(resp.data);
                // })
                // .catch(err => {
                //     console.log(err);
            });
    }, []);



    useEffect(() => {
        // const getAllHungerProducts = (hungerid) => {
        axios.get("restaurant/" + restaurantslug + "/popular/products")
            .then(resp => {
                // console.log(resp.data[0]);
                setPopularProudcts(resp.data);
                // console.log(popularProudcts);
                // }).catch(err => {
                //     console.log(err);
            });
        // };
    }, []);

    const settings = {

        slidesPerRow: 1,
        slidesToShow: 5,
        infinite: true,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        slidesToScroll: 1,
        lazyLoad: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
        ]

    };

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });


    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const header = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 830 ? header.classList.add('is-sticky') && header.classList.add('menu_nav_enable') : header.classList.remove('is-sticky') && header.classList.remove('menu_nav_enable');
    };

    return (

        <div className="container-fluid">
            <div className='row '>
                <label className="heading_text"><h2><b>Menu </b> </h2> </label>
                <Slider {...settings}>
                    {menus.map((menu, i) =>
                        <div className='col-lg-3  col-md-3 col-3  '>
                         <Link to='' style={{textDecoration:'none'}} onClick={() => handleClickScroll(i)}>
                                <Menu coffee_img={menu.menu_picture} item_name={menu.menu_name} item_description={menu.menu_description} />
                                </Link> 
                        </div>
                    )}
                </Slider>
                <header className="header-section  d-xl-block d-lg-block d-md-block d-sm-block menu_nav_hide">
                    <div className='row justify-content-center'>
                        <div className='col-lg-9'>
                            {/* onClick={handleClickScroll} */}
                            {menus.map((menu, i) =>
                                <button type="button" onClick={() => handleClickScroll(i)} className="btn sticky-btn">{menu.menu_name}</button>
                            )}
                            {/* </Slider> */}
                            <br />
                        </div>
                    </div>
                </header>
            </div>
            <div className='row' >
                <div className='fa fa-fire heading_text'>
                    <h2>   <FontAwesomeIcon icon={faFire} />
                        &nbsp; <b>Popular Items</b></h2>
                </div>
                {popularProudcts.map(popularProudct =>
                    <div className='col-lg-3 col-md-3 col-6 '>
                        <Popup
                            trigger={<button className="button ">
                                <Popular_items coffee_img={popularProudct.product_picture} item_name={popularProudct.product_name} item_price={popularProudct.product_price} />
                            </button>}
                            modal
                            contentStyle={contentStyle} >
                            {close => (
                                <p>
                                    <a type="button" className="btn-close popup_close_btn" aria-label="Close" onClick={close}>
                                    </a>
                                    <Product_view product_id={popularProudct.id} product_img={popularProudct.product_picture} item_name={popularProudct.product_name} item_price={popularProudct.product_price}
                                        item_description={popularProudct.product_description} item_attributes={popularProudct.product_attributes} />
                                </p>
                            )}
                        </Popup>
                    </div>
                )}
            </div>
            {menu_with_all_products.map((menu, i) =>

                <div className='row' id={menu.menu_id} ref={el => ref.current[i] = el}>
                    <label className="heading_text"><h3><b>{menu.menu_name}</b></h3></label>
                    {menu.products != "" ? menu.products.map(product =>

                        <div className='col-lg-3 col-md-3 col-6 text_color '>

                            {/* <Items coffee_img={product.product_picture} item_name={product.product_name} item_price={product.product_price} /> */}
                            <Popup
                                trigger={<button className="button "  >
                                    <Items item_ref={ref} coffee_img={product.product_picture} item_name={product.product_name} item_price={product.product_price} />
                                </button>}
                                modal
                                contentStyle={contentStyle}>
                                {close => (
                                    <p>
                                        <a type="button" className="btn-close popup_close_btn" aria-label="Close" onClick={close}>
                                        </a>
                                        <Product_view product_id={product.id} product_img={product.product_picture} item_name={product.product_name} item_price={product.product_price}
                                            item_description={product.product_description} item_attributes={product.product_attributes} />
                                    </p>
                                )}
                            </Popup>
                        </div>
                    ) :
                        <p className='empty_menu'>Stock Out, Be patient soon products will be available. </p>}
                </div>
            )}

        </div>
    )
}
export default Card;





