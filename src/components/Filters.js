import React from "react"

export default function Filters(props) {

    function categoryFilter(event) {
        props.categoryFilter(event.target.value)
    }

    function ratingFilter(rating) {
        props.ratingFilter(rating)
    } 

    return (
        <div id="filters-div">
            <div id="category-div">
                <p>Category:</p>
                <select onChange={categoryFilter}>
                    <option value="all products">All products</option>
                    <option value="men's clothing">Men's clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="electronics">Electronics</option>
                    <option value="women's clothing">Women's clothing</option>
                </select>
            </div>
            <div id="rating-div">
                <p>Rating:</p>
                <div id="rating-button-div">
                    <button onClick={()=>ratingFilter(5)} className={props.buttonState.rating5}>5</button>
                    <button onClick={()=>ratingFilter(4)} className={props.buttonState.rating4}>4</button>
                    <button onClick={()=>ratingFilter(3)} className={props.buttonState.rating3}>3</button>
                    <button onClick={()=>ratingFilter(2)} className={props.buttonState.rating2}>2</button>
                    <button onClick={()=>ratingFilter(1)} className={props.buttonState.rating1}>1</button>
                    <button onClick={()=>ratingFilter(0)} className={props.buttonState.rating0}>0</button>
                </div>
            </div>
        </div>
    )
}