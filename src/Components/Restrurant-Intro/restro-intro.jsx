import React from 'react'
import { Link } from "react-router-dom";



const Restro_intro = (props) => {
    const bg_img = props.restro_bg_photo
    return (
        // <div className='row ' style={{ 'margin': '2rem 0rem 0rem 0rem', backgroundImage: 'url("' + bg_img + '")', backgroundRepeat: 'no-repeat', backgroundSize: '100% auto' }} >

        <div className='container-fluid'>
            <div className='row justify-content-center background_img'>
                <div className='col-md-6 order-1 order-sm-0 '>
                    <div className='logo-text'>

                        <center>
                            <p>  {props.restro_intro}</p>

                            <Link to="#">
                                <p className='intro_visit_btn'> <button type="button" className="btn visit-btn">Visit Shop</button></p>
                            </Link>
                        </center>

                    </div>
                </div>

                {/* order-sm-1 */}
                <div className='col-md-6 order-0 d-block d-none '>
                    <img className='img-fluid img-component img_extension' src={props.restro_intro_imgurl} />
                </div>

            </div>
        </div>
    )
}
export default Restro_intro;