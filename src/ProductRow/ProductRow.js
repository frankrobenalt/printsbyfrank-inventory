import React from 'react';
import axios from 'axios';

export default class ProductRow extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            color: this.props.data["Color"],
            XS: this.props.data["XS"],
            S: this.props.data["S"],
            M: this.props.data["M"],
            L: this.props.data["L"],
            XL: this.props.data["XL"],
            doublexl: this.props.data["2XL"]
        }

        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }
    
    showUpdateModal(size){
        let modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
        modalContainer.id = 'modal';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let modalTitle = document.createElement('div');
        modalTitle.innerText = 'Change Quantity';
        modalTitle.classList.add('title');
        let currentProduct = document.createElement('div');
        currentProduct.innerText = `${this.state.color} - ${this.props.product.substring(0, 1).toUpperCase()}${this.props.product.substring(1, this.props.product.length-1)} - ${size}`;
        let quantity = document.createElement('input');
        quantity.type = 'number';
        if (size === '2XL') { quantity.value = this.state["doublexl"] }
        else { quantity.value = this.state[size] }
        quantity.id = 'new-quantity'
        let submit = document.createElement('div');
        submit.onclick = ()=> this.updateQuantity(size);
        submit.innerText = 'Change Quantity';
        submit.classList.add('submit-btn');
        let exitBtn = document.createElement('div');
        exitBtn.classList.add('exit-btn');
        exitBtn.onclick = ()=>{
            let modal = document.getElementById('modal');
            document.body.removeChild(modal);
        }
        exitBtn.innerText = 'exit';
        //append modal pieces
        modalContainer.appendChild(modal);
        modal.appendChild(exitBtn);
        modal.appendChild(modalTitle);
        modal.appendChild(currentProduct);
        modal.appendChild(quantity);
        modal.appendChild(submit);
        document.body.appendChild(modalContainer);
    }

    updateQuantity(size){
        let newQ = Number(document.getElementById('new-quantity').value);
        let reqBody = {
            table: this.props.product,
            color: this.state.color,
            size,
            newQ
        }
        let newState = this.state;
        if (size === '2XL') { newState["doublexl"] = newQ }
         else { newState[size] = newQ }
        axios.post('/api/changeQuantity', reqBody)
            .then(response => {
                let modal = document.getElementById('modal');
                document.body.removeChild(modal);
                this.setState(newState);
                this.highlightChange()
            })
            .catch(err => console.log(err));
    }

    highlightChange(){

    }

render(){
    return (
        <tr>
            <td>{this.state.color}</td>
            { this.props.product !== 'tanks' &&
                <td onClick={()=>this.showUpdateModal('XS')}>{this.state.XS}</td>
            }
            <td onClick={()=>this.showUpdateModal('S')}>{this.state.S}</td>
            <td onClick={()=>this.showUpdateModal('M')}>{this.state.M}</td>
            <td onClick={()=>this.showUpdateModal('L')}>{this.state.L}</td>
            <td onClick={()=>this.showUpdateModal('XL')}>{this.state.XL}</td>
            <td onClick={()=>this.showUpdateModal('2XL')}>{this.state.doublexl}</td>
        </tr>
)}
}