// Seccion recomendados
const recomendedCards = document.querySelector(".recomended_container");

const renderRecomendedCards = product => {
    const {id, value, price, category, img } = product;

    return `
    <div class="product_recomendation">
        <div class="favorito"> 
        <span class="material-symbols-outlined favorito_icon">
        favorite
        </span> </div>
        <div class="item-product">
            <img src="${img}" alt="imagen de carta">
            <div class="product_cart--value">
                <h2 class="title-card">${value}</h2>
                <p class="value-card">${category}</p>
                <span class="price"><span class="spacing-price">$</span>${price}</span>
            </div>
        </div>
        <button class="add-btn" 
        data-id='${id}' 
        data-name='${category}' 
        data-value='${value}'
        data-price='${price} 
        'data-img='${img}'>Agregar</button>
    </div>
    `
}

const renderProductsRandom = (contenedor, cantidad, funcionRender) => {
    cardsListRandom = [];
    for(var i = 0; i < cantidad; i++ ){
        var idRandom = Math.floor(Math.random()*pokerDeckData.length);
        while(cardsListRandom.includes(pokerDeckData[idRandom]) == true){
            idRandom = Math.floor(Math.random() * pokerDeckData.length);
        }
        cardsListRandom.push(pokerDeckData[idRandom]);
    }
    contenedor.innerHTML = cardsListRandom.map(funcionRender).join("");
}

// -----------  INIT ----------  //

const init = () => {
    document.addEventListener('DOMContentLoaded', renderProductsRandom(recomendedCards,5,renderRecomendedCards));
}

init();