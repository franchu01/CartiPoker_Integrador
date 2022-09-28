// Seccion recomendados
const recomendedCards = document.querySelector(".recomended_container");

const renderRecomendedCardsSale = product => {
    const {id, value, price, category, img } = product;
    const newPrice = price * 0.85;
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
                <span class="price" style="text-decoration:line-through;" ><span class="spacing-price">$</span>${price}</span>
                <span class="sale_price"><span class="sale-spacing-price">$</span>${newPrice}</span>
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
                <span class="price" ><span class="spacing-price">$</span>${price}</span>
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

// ----------- ELEGI EL TIPO QUE QUIERAS ----------------- // 

const categoryProductsContainer = document.querySelector(".selected_products_container")
const listCategory = document.querySelectorAll('.card_category');
const cardCategoryContainer = document.querySelector('.card_category_container')

const renderCategory = (category) => {
    const productsList = pokerDeckData.filter(card => card.category === category);
    categoryProductsContainer.innerHTML = productsList.map(renderRecomendedCards).join('')
}

const changeFilter = e => {
    const selectedCategory = e.target.dataset.category;
    const categories = [... listCategory];
    categories.forEach((category) => {
        if (category.dataset.category !== selectedCategory){
            category.classList.remove('active')
        } else {
            category.classList.add('active')
        }
    })
}

const filterProducts = (e) => {
    if(!e.target.classList.contains('category')) return;
    changeFilter(e);
    renderCategory(e.target.dataset.category,0)
}


// ------------------ VER TODAS --------------------- // 

const allCards = document.querySelector(".todas_container");
const showAllButton = document.querySelector(".ver_todas_boton")

const showAll = (e) => {
    
}


// ------------------------------------ INIT ------------------------------------  //

const init = () => {
    document.addEventListener('DOMContentLoaded', renderProductsRandom(recomendedCards,5,renderRecomendedCardsSale));
    document.addEventListener('DOMContentLoaded', renderProductsRandom(categoryProductsContainer,20,renderRecomendedCards))
    cardCategoryContainer.addEventListener('click', filterProducts)
    // selectedTypeButton.addEventListener('click', renderProductsRandom(selectedProductsContainer,12,renderRecomendedCards))
}

init();