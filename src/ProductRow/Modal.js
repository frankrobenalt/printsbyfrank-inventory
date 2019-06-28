import React from 'react';
import axios from 'axios';

export default class Modal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            color: this.props.modalProduct.color,
            product: this.props.modalProduct.product,
            size: this.props.modalProduct.size,
            quantity: this.props.modalProduct.quantity
        }
        this.updateQuantity = this.updateQuantity.bind(this)
    }

    updateQuantity(){
        let reqBody = {
            table: this.state.product,
            color: this.state.color,
            size: this.state.size,
            newQ: this.state.quantity
        }
        axios.post('/api/changeQuantity', reqBody)
        .then(response => {
            if(response.data === 'success'){
                this.props.updateQuantity(this.state.quantity)
            }
        })
    }


    render(){
        const showHideClassName = this.props.showModal ? "modal-container" : "modal-container display-none";
        return (
            <div className={showHideClassName}>
                <div className="modal">
                <div className="exit-btn" onClick={ ()=> this.props.hideModal() }>exit</div>
                <div className="title">Change Quantity</div>
                <div>{ this.state.product.substring(0, 1).toUpperCase() }{ this.state.product.substring(1, this.state.product.length-1) }</div>
                <div>{ this.state.color }</div>
                <div>{ this.state.size }</div>
                <input type="number" name="quantity" value={ this.state.quantity } onChange={(e)=> this.setState({quantity: e.target.value})} id="quantity" />
                <div className="submit-btn" onClick={ ()=> this.updateQuantity() }>Change Quantity</div>
                </div>
            </div>

        )
    }
}