import React from 'react';

export default function MetadataInformationOrderPage(props) {
    if(props.noDataAvailable) {
        return (
            <div>{props.noDataAvailable}</div>
        )
    } else {
        return (
            <ul className="Order-product-item">
                {props.newData.map(el => {
                    console.log('el', el)
                    return (
                        <li className="subMenu-item" key={el.id}>
                            <div>{el.name}</div>
                            <div>{el.base_price}</div>
                            <div>{el.quantity}</div>
                            <div>{el.product_options.map(i => {
                                return (
                                    <div>
                                        <div key={i.display_name}>{i.display_name}: {i.display_value}</div>
                                    </div>
                                )
                            })}</div>
                        </li>
                    )

                })}
            </ul>
        )
    }
}