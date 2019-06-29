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
                <ProductRow data={cur} key={cur.ID} product={this.props.product} isFrank={this.props.isFrank} />
            )
        })
        return (
            <div className="table">
                <div className="table-row">
                    <div className="table-data head color">Color</div>
                    { this.props.product !== 'tanks' &&
                        <div className="table-data head">XS</div>                      
                    }  
                    <div className="table-data head">S</div>
                    <div className="table-data head">M</div>
                    <div className="table-data head">L</div>
                    <div className="table-data head">XL</div>
                    <div className="table-data head">2X</div>
                </div>
                  { rows }
            </div>
        )
    }
}