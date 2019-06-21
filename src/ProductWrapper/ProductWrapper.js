import React from 'react';
import ProductRow from '../ProductRow/ProductRow.js';

export default class ProductWrapper extends React.Component {
    constructor(props){
        super(props);

        this.state = {
        
        }
    }

    render(){
        const data = this.props.data.sort();
        const rows = data.map(cur => {
            return (
                <ProductRow data={cur} key={cur.ID} product={this.props.product} />
            )
        })
        return (
            <table>
                <thead>
                    <tr>
                        <th>Color</th>
                        { this.props.product !== 'tanks' &&
                        <th>XS</th>                      
                        }  
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>2X</th>
                    </tr>
                </thead>
                <tbody>
                  { rows }
                </tbody>
            </table>
        )
    }
}