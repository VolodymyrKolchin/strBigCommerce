import PageManager from '../page-manager';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import CustomerData from './reactComponent/orderData'
import { showAlertModal } from '../global/modal';
import customerRegister from './gql/customerRegister.gql'
import initApolloClient from '../global/graphql/client';
import nod from "nod-validate";

export default class Custom extends PageManager {
    constructor(context) {
        super(context);
        this.gqlClient = initApolloClient(this.context.storefrontAPIToken);
        this.$addToCartBtn = $('#request-order-btn');
        this.$inputIdOrder = $('#input-request-order')[0];
        this.$addToCartBtn.on('click', () => this.customAddToCartButton());
        this.$totalContainer = $('#request-order')[0];
        this.customerData = null;
        this.Nod = nod();
        this.Nod.configure({submit: document.getElementById('request-order-btn'), disableSubmit: true});
    }
    onReady() {
        this.gqlClient.query({
            query: customerRegister,
        }).then(res => {
            if (res.data.customer === null) {
                $('.error-registered-users').show();
            } else {
                $('.container-request-order').show();
                $('#input-request-order')[0].addEventListener('input', this.inputChange.bind(this));
            }
            $('#loadingOverlay').hide();
        })
    }
    customAddToCartButton () {
        let orderID = this.$inputIdOrder.value;
        fetch(`/api/storefront/orders/${orderID}`, { credentials: 'include' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Provided order Id doesn't represent a valid order`);
                }
                return response.json()
            })
            .then(data => {
                ReactDOM.render(<CustomerData
                    customerId={data.customerId}
                    orderId={data.orderId}
                    status={data.status}
                    billingAddress={data.billingAddress}
                    physicalItems={data.lineItems.physicalItems}
                    orderAmount={data.orderAmount}
                    discountAmount={data.discountAmount}
                />, this.$totalContainer);
            })
            .catch(err => {
                console.log(err);
                showAlertModal(err);
            });
    }
    inputChange (e) {
        const $input = $(e.target);
        this.Nod.add([{
            selector: $input,
            validate: "integer",
            errorMessage: `You must enter numbers.`
        },{
            selector: $input,
            validate: "max-length:10",
            errorMessage: `Your ID order is too long. Maximum characters are 10`
        }])
    }

}