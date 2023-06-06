import React from "react";
import CartCard from "./CartCard";

export default function Checkout(props) {

  const [isCheckoutShown, setisCheckoutShown] = React.useState(false);

  function toggleCheckout() {
    setisCheckoutShown((prevState) => !prevState);
  }

  function checkout() {
    let message = props.subtotal ? `Checkout - Subtotal: $${props.subtotal}` : "Add some products in the cart!"
    window.alert(message)
  }

  function removeItem(id) {
    props.removeItem(id)
  }

  function addItem(id) {
    props.addItem(id)
  }

  function removeProduct(id) {
    props.removeProduct(id)
  }

  let dataItems

  if (props.count > 0) {
    dataItems = props.data.map((dataEl) => (
      <CartCard
        key={dataEl.id}
        name={
          dataEl.title.length > 21
            ? `${dataEl.title.slice(0, 20)}...`
            : dataEl.title
        }
        price={dataEl.price}
        image={dataEl.image}
        description={dataEl.description}
        rating={dataEl.rating.rate}
        category={dataEl.category}
        added={dataEl.added}
        id={dataEl.id}
        quantity={dataEl.quantity}
        removeItem={removeItem}
        addItem={addItem}
        removeProduct={removeProduct}
      />
    ));
  } else {
    dataItems = <p>Add item(s) to cart to proceed.</p>
  }

  return (
    <div id="checkout-div">
      <button id="checkout-toggle-btn" onClick={toggleCheckout}>
        {isCheckoutShown ? 
        <p id="x">x</p> : 
        <div id="outside-cart-div">
            <img src="https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg"/>
            <div>{props.count}</div>
        </div>
        }
      </button>
      {isCheckoutShown && (
        <div>
          <div id="top-checkout-div">
            <img src="https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg"/>
            <p>Cart</p>
            <div>{props.count}</div>
          </div>
          <div id="content-checkout-div">{dataItems}</div>
          <div id="subtotal-checkout-div">
            <div id="top-subtotal-checkout-div">
              <p id="subtotal">SUBTOTAL</p>
              <p id="checkout-price">$ {Math.round(props.subtotal*100)/100}</p>
            </div>
            <div id="bottom-subtotal-checkout-div">
              <button onClick={checkout}>CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
