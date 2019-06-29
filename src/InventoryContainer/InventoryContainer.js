import React from 'react';
import ProductWrapper from '../ProductWrapper/ProductWrapper';
import axios from 'axios';
import Modal from '../ProductRow/Modal.js';

export default class InventoryContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            products: {
                tees: [],
                hoodies: [],
                tanks: [],
            }
        }

        this.getProducts = this.getProducts.bind(this);
       }

    componentDidMount(){
        if(this.props.isFrank){
            this.getProducts();
        } else {
            this.makeFakeData()
        }
    }
    
    getProducts(){
        axios.get('/api/getProducts').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    makeFakeData(){
        let fakeData = {};
        fakeData.hoodies = this.makeFakeRow();
        fakeData.tanks = this.makeFakeRow();
        fakeData.tees = this.makeFakeRow();
        this.setState({
            products: fakeData
        })
    }

    makeFakeRow(){
        let colors = ['Grey', 'Black', 'Orange', 'Green', 'Navy', 'Pink', 'Purple', 'Brown', 'White'];
        let newArr = [];
        let numColors = this.getRandomNum();
        for (var i=0; i<numColors; i++){
            let obj = {};
            obj.ID = this.getRandomID();
            obj.Color = colors[this.getRandomNum()];
            obj["XS"] = this.getRandomNum();
            obj["S"] = this.getRandomNum();
            obj["M"] = this.getRandomNum();
            obj["L"] = this.getRandomNum();
            obj["XL"] = this.getRandomNum();
            obj["2XL"] = this.getRandomNum();
            newArr.push(obj);
        }
        return newArr;
    }

    getRandomNum(){
        return Math.ceil(Math.random() * 8);
    }
    
    getRandomID(){
        return Math.ceil(Math.random() * 100000);
    }

    render(){
        return (
            <div>
                <div className="title">
                    Tees
                </div>
                <ProductWrapper data={this.state.products.tees} product={"tees"} isFrank={this.props.isFrank} />
                <div className="title">
                    Tanks
                </div>
                <ProductWrapper data={this.state.products.tanks} product={"tanks"} isFrank={this.props.isFrank} />
                <div className="title">
                    Hoodies
                </div>
                <ProductWrapper data={this.state.products.hoodies} product={"hoodies"} isFrank={this.props.isFrank} />
            </div>
        )
    }
}