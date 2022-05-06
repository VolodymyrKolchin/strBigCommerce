import React from 'react';
import ReactDOM from 'react-dom';
import OrderHeaderList from '../custom/reactComponent/OrderHeaderList'

export default function (context) {
    
    console.log('Hi!!! Order Global Header', context.paginationOrders.links);
    const orderItem = [];
    context.paginationOrders.links.map((index) =>{
        //console.log('index', index.link);

        fetch(index.link).then(function (response) {
            // The API call was successful!
            return response.text();
        }).then(function (html) {
        
            // Convert the HTML string into a document object
            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
        
            // Get the image file
            var orderStatus = doc.getElementsByClassName('account-orderStatus-label');
            //console.log('orderStatus', orderStatus);
        
            for (let order of orderStatus) {
                console.log('order', order.textContent);
                if(order.textContent !== 'Completed') {
                    console.log('order');
                    orderItem.push(order);
                }
            }
            console.log('orderItem', orderItem)
        
        }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);
        });
        
    })
    const orderList = [];
    context.orderCustomer.map(el => {
        if(el.status !== 'Completed') {
            orderList.push(el);
        }
    })
    // console.log('orderList', orderList);
    // //order-list
    // console.log("$('#order-list')[0]", $('#order-list')[0]);
    ReactDOM.render(<OrderHeaderList order={orderList}/>, $('#order-list')[0])

}