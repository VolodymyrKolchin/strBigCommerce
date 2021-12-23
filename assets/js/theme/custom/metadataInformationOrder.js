import React from 'react';

export default function MetadataInformationOrderPage(props) {
    if(props.noDataAvailable) {
        return (
            <div>{props.noDataAvailable}</div>
        )
    } else {
        return (
            <div className="Order-product-item">
                {props.newData.map(el => {
                    return (
                        <div className="product-item" key={el.id}>
                            <div>Name: {el.name}</div>
                            <div>Price: {el.base_price.slice(0, -2)}</div>
                            <div>Quantity: {el.quantity}</div>
                            <div>{el.product_options.map(i => {
                                return (
                                    <div className="product-options">
                                        <div key={i.display_name}>{i.display_name}: {i.display_value}</div>
                                    </div>
                                )
                            })}</div>
                        </div>
                    )

                })}
            </div>
        )
    }
}