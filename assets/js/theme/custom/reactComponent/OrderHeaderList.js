import React from 'react';

export default class OrderHeaderList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('this.props', this.props.order);
        return (
            <div className="containerDetailProduct">
                {this.props.order.map((el) => {
                    return (
                        <div className="subMenu-item" key={el.id}>
                            {el.id}: {el.status}
                        </div>
                    )
                })}
            </div>
        )
    }
}