import React from "react";

export default function Card(props) {

    function addToCart(id) {
        props.setState(id)
    }

    return (
        <div id="card-div">
            <div id="img-card-div">
                <div>
                    <img src={props.image}/>
                </div>
            </div>
            <div id="text-card-div">
                <p id="card-name">{props.name}</p>
                <div id="line"></div>
                <p id="card-unit-price">${props.price}</p>
                <p id="card-price">{props.rating} ({props.count})</p>
            </div>
            <div id="btn-card-div">
                <button onClick={() => addToCart(props.id)}>Add to cart</button>
            </div>
        </div>
    )
}