import React from 'react';
import ReactDOM from 'react-dom';
import OrderHeaderList from '../custom/reactComponent/OrderHeaderList'

export default function (context) {

    fetch('http://localhost:8080/orders').then(function (response) {
        // The API call was successful!
        // return response.text();
        return response.json();
    }).then((data)=> {
        const orderItem = [];
        data.map(el=>{
            if(el.status !== 'Completed') {
                orderItem.push(el);
            }
        }) 
        ReactDOM.render(<OrderHeaderList orderItem={orderItem.length}/>, $('#order-list')[0])
    }).catch((err)=>{
        console.log(err);
    })
}