import React from 'react';
import Modal from './Modal';

export default class TableCell extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            quantity: this.props.quantity,
            showModal: false
        }
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }

    toggleUpdateModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    updateQuantity(quantity){
        this.setState({
            quantity,
            showModal: false
        })
    }

    render(){
        let quantityColorClass;
        if(this.state.quantity > 5){ quantityColorClass = 'table-data green' }
        else if(this.state.quantity <= 5 && this.state.quantity >= 3){ quantityColorClass = 'table-data yellow' }
        if(this.state.quantity < 3){ quantityColorClass = 'table-data red' }
        return (
            <div  className={ quantityColorClass }>
                <div onClick={ this.toggleUpdateModal }>
                    { this.state.quantity }
                </div>
                <Modal 
                    showModal={ this.state.showModal }
                    modalProduct={{
                        color: this.props.color,
                        product: this.props.product,
                        size: this.props.size,
                        quantity: this.state.quantity
                    }}
                    hideModal={ this.toggleUpdateModal }
                    updateQuantity={ this.updateQuantity }
                />
            </div>
        )
    }
}