import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header"
import Filters from "./components/Filters";
import Content from "./components/Content";
import Checkout from "./components/Checkout";
import "./style.css";

function App() {
  
  const [allProducts, setAllProducts] = React.useState([]);
  const [checkoutProducts, setCheckoutProducts] = React.useState([]);
  const [displayProducts, setDisplayProducts] = React.useState([])
  const [displayVariables, setDisplayVariables] = React.useState({rating: "N/A",category: "all products"})
  const [count,setCount] = React.useState(0)
  const [subtotal,setSubtotal] = React.useState(0)
  const [buttonState,setButtonState] = React.useState({
    rating5: "inactive",
    rating4: "inactive",
    rating3: "inactive",
    rating2: "inactive",
    rating1: "inactive",
    rating0: "inactive"
  })
 
  React.useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => updateAllProducts(data));
  }, []);

  function updateAllProducts(arrayOfObjects) {
    for (let i = 0; i < arrayOfObjects.length; i++) {
      arrayOfObjects[i] = { ...arrayOfObjects[i], added: false, quantity: 0 };
    }
    setAllProducts(arrayOfObjects);
  }

  function updateCheckoutProducts(arrayOfObjects) {
    let newArrayOfObjects = []
    let newCount = 0
    let newSubtotal = 0
    for (let i = 0; i < arrayOfObjects.length; i++) {
      if (arrayOfObjects[i].added == true) {
        newArrayOfObjects.push(arrayOfObjects[i])
        newCount += arrayOfObjects[i].quantity
        newSubtotal += arrayOfObjects[i].price * arrayOfObjects[i].quantity
      }
    }
    setCheckoutProducts(newArrayOfObjects)
    setCount(newCount)
    setSubtotal(Math.round(newSubtotal*100)/100)
  }

  function addToCart(id) {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id == id) {
        if (allProducts[i].added == true) {
          // increase the quantity
          setAllProducts(prevAllProducts => {
            let newAllProducts = [...prevAllProducts]
            newAllProducts[i].quantity += 1
            prevAllProducts = [...newAllProducts]
            updateCheckoutProducts(prevAllProducts)
            return prevAllProducts
          })
          // call updateCheckoutProducts function
        } else {
          // change added to true
          setAllProducts(prevAllProducts => {
            let newAllProducts = [...prevAllProducts]
            newAllProducts[i].added = true
            newAllProducts[i].quantity += 1
            prevAllProducts = [...newAllProducts]
            updateCheckoutProducts(prevAllProducts)
            return prevAllProducts
          })
          // call updateCheckoutProducts function
        }
      }
    }
  }

  function removeItem(id) {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id == id) {
        if (allProducts[i].quantity > 1) {
          // descrease the quantity
          setAllProducts(prevAllProducts => {
            let newAllProducts = [...prevAllProducts]
            newAllProducts[i].quantity -= 1
            prevAllProducts = [...newAllProducts]
            updateCheckoutProducts(prevAllProducts)
            return prevAllProducts
          })
          // call updateCheckoutProducts function
        } else {
          // change added to false
          setAllProducts(prevAllProducts => {
            let newAllProducts = [...prevAllProducts]
            newAllProducts[i].added = false
            newAllProducts[i].quantity -= 1
            prevAllProducts = [...newAllProducts]
            updateCheckoutProducts(prevAllProducts)
            return prevAllProducts
          })
          // call updateCheckoutProducts function
        }
      }
    }
  }

  function removeProduct(id) {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id == id) {
        // change added to false
        setAllProducts(prevAllProducts => {
          let newAllProducts = [...prevAllProducts]
          newAllProducts[i].added = false
          newAllProducts[i].quantity = 0
          prevAllProducts = [...newAllProducts]
          updateCheckoutProducts(prevAllProducts)
          return prevAllProducts
        })
        // call updateCheckoutProducts function
      }
    }
  }

  function updateDisplayProducts(category,rating) {
    let newArrayOfObjects = []
    for (let i = 0; i < allProducts.length; i++) {
      if (category == "all products") {
        if (Math.round(allProducts[i].rating.rate) >= rating) {
          newArrayOfObjects.push(allProducts[i])
        } 
      } else if (rating == "N/A") {
        if (allProducts[i].category == category) {
          newArrayOfObjects.push(allProducts[i])
        } 
      } else {
        if (allProducts[i].category == category && Math.round(allProducts[i].rating.rate) >= rating) {
          newArrayOfObjects.push(allProducts[i])
      }
    }
    setDisplayProducts(newArrayOfObjects)
  }
}

  function categoryFilter(category) {
      updateDisplayProducts(category,displayVariables.rating)
      setDisplayVariables(prevDisplayVariables => ({...prevDisplayVariables,category: category}))
  }

  function ratingFilter(rating) {
    let ratingVariable = `rating${rating}`
    if (displayVariables.rating == rating) {
      updateDisplayProducts(displayVariables.category,0)
      setDisplayVariables(prevDisplayVariables => ({...prevDisplayVariables, rating: "N/A"}))
      setButtonState(prevButtonState => ({...prevButtonState,[ratingVariable]: "inactive"}))
    } else {
      updateDisplayProducts(displayVariables.category,rating)
      setDisplayVariables(prevDisplayVariables => ({...prevDisplayVariables, rating: rating}))
      setButtonState(prevButtonState => ({...prevButtonState,[ratingVariable]: "active"}))
    }
    for (let i = 0; i <= 5; i++) {
      if (i != rating) {
        let notRatingVariable = `rating${i}`
        setButtonState(prevButtonState => ({...prevButtonState,[notRatingVariable]: "inactive"}))
      }
    }
  }

  return (
    <div id="app-div">
      <Header />
      <Filters
        categoryFilter={categoryFilter}
        ratingFilter={ratingFilter}
        buttonState={buttonState}
      />
      <Content 
        data={displayProducts.length == 0 ? allProducts : displayProducts} 
        setState={addToCart}
      />
      <Checkout 
        data={checkoutProducts} 
        count={count} subtotal={subtotal} 
        addItem={addToCart} 
        removeItem={removeItem} 
        removeProduct={removeProduct}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);