import React from 'react';
import ProductWrapper from '../ProductWrapper/ProductWrapper';
import axios from 'axios';

export default class InventoryContainer extends React.Component {
    constructor(){
        super();

        this.state = {
            products: {
                tees: [],
                hoodies: [],
                tanks: []
            }
        }

        this.getProducts = this.getProducts.bind(this);
    }

    componentDidMount(){
        this.getProducts();
    }
    
    getProducts(){
        axios.get('/api/getProducts').then(response => {
            this.setState({
                products: response.data
            })
        })
    }

    render(){
        return (
            <div>
                <div className="header">
                    Tees
                </div>
                <ProductWrapper data={this.state.products.tees} product={"tees"} />
                <div className="header">
                    Tanks
                </div>
                <ProductWrapper data={this.state.products.tanks} product={"tanks"} />
                <div className="header">
                    Hoodies
                </div>
                <ProductWrapper data={this.state.products.hoodies} product={"hoodies"} />
            </div>
        )
    }
}