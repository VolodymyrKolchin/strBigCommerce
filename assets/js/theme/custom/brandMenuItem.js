import PageManager from '../page-manager';
import React from 'react'
import ReactDOM from 'react-dom';
import BrandItem from './reactComponent/BrandItem';

export default function () {
    let arrLetter = [];
    for (let i = 65; i < 91; i++) {
        arrLetter.push(String.fromCharCode(i));
    }
    let urlItemMenu = $('#brand-item-menu')[0].getAttribute('href');

    if(document.getElementById('navPage-subMenu-brand')) {
        ReactDOM.render(<BrandItem arrLetter={arrLetter} urlItemMenu={urlItemMenu}/>, document.getElementById('navPage-subMenu-brand'));
    }
}