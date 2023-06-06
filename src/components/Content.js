import React from "react"
import Card from "./Card"

export default function Content(props) {

    function addToCart(id) {
        props.setState(id)
    }

    const dataItems = props.data.map(dataEl => (
        <Card
            key={dataEl.id}
            name={dataEl.title.length > 30 ? `${dataEl.title.slice(0,29)}...` : dataEl.title}
            price={dataEl.price}
            image={dataEl.image}
            description={dataEl.description}
            rating={dataEl.rating.rate}
            count={dataEl.rating.count}
            category={dataEl.category}
            id={dataEl.id}
            setState={addToCart}
        />
    ))

    return (
        <div id="content-div">
            {dataItems}
        </div>
    )
}