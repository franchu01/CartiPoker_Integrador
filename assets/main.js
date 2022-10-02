// Seccion recomendados
const recomendedCards = document.querySelector(".recomended_container");

const renderRecomendedCardsSale = product => {
    const {
        id,
        value,
        price,
        category,
        sale,
        img
    } = product;
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
        data-price='${price}'
        data-sale='${sale}'
        data-img='${img}'>Agregar</button>
    </div>
    `
}

const renderRecomendedCards = product => {
    const {
        id,
        value,
        price,
        category,
        sale,
        img
    } = product;
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
        data-price='${price}'
        data-sale='${sale}'
        data-img='${img}'>Agregar</button>
    </div>
    `
}

const renderProductsRandom = (contenedor, cantidad, funcionRender) => {
    cardsListRandom = [];
    for (var i = 0; i < cantidad; i++) {
        var idRandom = Math.floor(Math.random() * pokerDeckData.length);
        while (cardsListRandom.includes(pokerDeckData[idRandom]) == true) {
            idRandom = Math.floor(Math.random() * pokerDeckData.length);
        }
        cardsListRandom.push(pokerDeckData[idRandom]);
        cardsListRandom[i].sale = true
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
    const categories = [...listCategory];
    categories.forEach((category) => {
        if (category.dataset.category !== selectedCategory) {
            category.classList.remove('active')
        } else {
            category.classList.add('active')
        }
    })
}

const filterProducts = (e) => {
    if (!e.target.classList.contains('category')) return;
    changeFilter(e);
    renderCategory(e.target.dataset.category, 0)
}

// ----------------- CART LOGIC ------------------ //

const cartBtn = document.querySelector(".cart_button")
const cartContainer = document.querySelector(".cart")
const overlay = document.querySelector(".overlay")
const exitCart = document.querySelector(".exit_cart_container")
const cartProductsContainer = document.querySelector('.cart_products_container')

const showCart = () => {
    cartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle("show")
        overlay.classList.toggle("show_overlay")
    })
    exitCart.addEventListener('click', () => {
        cartContainer.classList.toggle("show")
        overlay.classList.toggle("show_overlay")
    })
}

// --- CART LOCAL STORAGE --- //

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = cartList => {
    localStorage.setItem('cart', JSON.stringify(cartList));
};

// --- CART FUNCTIONS --- //

const buyBtn = document.querySelector(".boton_comprar")

const checkForGod = () => {
    var isGodJokerHere = false
    cart.forEach( (card) => {
        if(card.price == "Infinity"){
            isGodJokerHere = true
        }
    })
    return isGodJokerHere
}

const completeBuy = () => {
    const canBuy = checkForGod()
    console.log(canBuy)
    buyBtn.addEventListener('click', () => {
        if (!cart.length) {
            return
        } else if (canBuy){
            alert("No tienes dinero suficiente")
        } else {
            window.confirm('¿Desea finalizar su compra?')
            localStorage.removeItem('cart')
            window.location.reload()
        }
    })

}

var i = 0
const renderCartProduct = cartProduct => {

    const {
        id,
        value,
        category,
        price,
        sale,
        img,
        quantity
    } = cartProduct

    var primeraParteDelCart = ` 
    <div class="product_cart">
            <div class="card_item">
                <img src="${img}" alt="imgCard">
                <div class="product_card--description">
                    <h2 class="title_card--cart" style="text-decoration:none";>${value}</h2>
                    <p class="description_card--cart">${category}</p> 
                    `
    var ultimaParteDelCart = `
    </div>
            </div>
            <div class="item_handler">
                <span class="quantity_handler down" data-id=${id}>-</span>
                <span class="item_quantity">${quantity}</span>
                <span class="quantity_handler up" data-id=${id}>+</span>
            </div>
        </div>
    `

    if (sale == "true") {
        i = i + 1
        return primeraParteDelCart + `
                    <span class="price" style="text-decoration:line-through;" ><span class="spacing-price">$</span>${price}</span>
                    <span class="price" style="color:red;" ><span class="spacing_price sale_price">$</span>${price * 0.85}</span> 
        ` + ultimaParteDelCart
    } else {
        i = i + 1
        return primeraParteDelCart + `
                    <span class="price"><span class="spacing_price">$</span>${price}</span>
        ` + ultimaParteDelCart
    }
}

const renderCart = (cartList) => {
    if (!cartList.length) {
        cartProductsContainer.innerHTML = `<p class="empty-msg"> No hay productos en el carrito</p>`
        return;
    }
    cartProductsContainer.innerHTML = cartList.map(renderCartProduct).join("");
}

const addCardToCart = (e) => {
    if (!e.target.classList.contains('add-btn')) return;
    const selectedCard = {
        id: e.target.dataset.id,
        value: e.target.dataset.value,
        price: e.target.dataset.price,
        category: e.target.dataset.category,
        sale: e.target.dataset.sale,
        img: e.target.dataset.img,
    };
    const existingCardInCart = cart.find(item => item.id === selectedCard.id)
    if (existingCardInCart) {
        cart = cart.map((item) => {
            return item.id === selectedCard.id ? {
                ...item,
                quantity: Number(item.quantity) + 1
            } : item;
        })
    } else {
        cart = [...cart, {
            ...selectedCard,
            quantity: 1
        }]
    }

    saveLocalStorage(cart)
    renderCart(cart)

}

// ------------------ VER TODAS --------------------- // 

const allCards = document.querySelector(".todas_container");
const showAllButton = document.querySelector(".ver_todas_boton")

const showAll = () => {
    allCards.innerHTML = pokerDeckData.map(renderRecomendedCards).join("");
    showAllButton.addEventListener('click', () => {
        allCards.classList.toggle('show')
    })
}

// ------------------------------------ INIT ------------------------------------  //

const init = () => {
    document.addEventListener('DOMContentLoaded', renderProductsRandom(recomendedCards, 5, renderRecomendedCardsSale));
    document.addEventListener('DOMContentLoaded', renderCart(cart));

    categoryProductsContainer.addEventListener('click', addCardToCart)
    recomendedCards.addEventListener('click', addCardToCart)
    allCards.addEventListener('click', addCardToCart)
    cardCategoryContainer.addEventListener('click', filterProducts)
    completeBuy()
    showCart()
    showAll()
}

init();