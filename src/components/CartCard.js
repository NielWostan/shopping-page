import React from "react"

export default function CartCard(props) {

    function removeItem(id) {
        props.removeItem(id)
    }

    function addItem(id) {
        props.addItem(id)
      }    

    function removeProduct(id) {
        props.removeProduct(id)
    }

    return (
        <div id="cart-card-div">
            <div id="img-cart-card-div">
                <img src={props.image}/>
            </div>
            <div id="text-cart-card-div">
                <div id="text-cart-card-div-1">
                    <p>{props.name}</p>
                    <p id="qty">x {props.quantity}</p>
                </div>
                <div id="text-cart-card-div-2">
                    <p>Description</p>
                </div>
                <div id="text-cart-card-div-3">
                    <p>{props.rating}</p>
                    <p>|</p>
                    <p>{props.category}</p>
                </div>
            </div>
            <div id="price-cart-card-div">
                <button onClick={()=>removeProduct(props.id)}>x</button>
                <p>${Math.round(props.price*props.quantity*100)/100}</p>
                <div>
                    <button onClick={()=>removeItem(props.id)}>-</button>
                    <button onClick={()=>addItem(props.id)}>+</button>
                </div>
            </div>
        </div>
    )
}