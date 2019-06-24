import React from 'react';

export default class Modal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            color: this.props.modalProduct.color,
            product: this.props.modalProduct.product,
            size: this.props.modalProduct.size,
            quantity: this.props.modalProduct.quantity
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.modalProduct !== this.props.modalProduct){
            this.setState({
                color: nextProps.modalProduct.color,
                product: nextProps.modalProduct.product,
                size: nextProps.modalProduct.size,
                quantity: nextProps.modalProduct.quantity
            })
        }
    }

    render(){
        const showHideClassName = this.props.showModal ? "modal-container" : "modal-container display-none";
        console.log(this.state)
        return (
            <div className={showHideClassName}>
                <div className="modal">
                <div className="exit-btn" onClick={ ()=> this.props.hideModal() }>exit</div>
                <div className="title">Change Quantity</div>
                <div>{ this.state.color } - { this.state.product.substring(0, this.state.product.length-1) } - { this.state.size }</div>
                <input type="number" name="quantity" value={ this.state.quantity } onChange={(e)=> this.setState({quantity: e.target.value})} id="quantity" />
                <div className="submit-btn">Change Quantity</div>
                </div>
            </div>

        )
    }
}