import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';




$(document).ready(function(){

$(document).on("click",".coffee_price",function() {
    //$("coffee_price").
    var id = $(this).attr("id");

    alert(id);
});
});
