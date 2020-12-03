if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


    var addToCartButtons = document.getElementsByClassName('item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var parking = shopItem.getElementsByClassName('parking_cost')[0].innerText
    var RealGym = shopItem.getElementsByClassName('Gym_cost')[0].innerText
    console.log(RealGym);
    var imageSrc = shopItem.getElementsByClassName('item-image')[0].src
    addItemToCart(title, price, parking, RealGym, imageSrc)
    updateCartTotal()
}
function SearchFun() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    // ul = document.getElementById("lis");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h5")[0];

        txtValue = a.textContent || a.innerText;
        console.log(txtValue);
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
            if (filter == "") {
                li[i].style.display = "";
            }
        }
    }
}

function addItemToCart(title, price, parking, RealGym, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" id="MyElement" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title cart-text">${title}</span>
        </div>
        <span class="cart-price cart-column cart-text">${price}</span>
         <span class="parking-price cart-column" style="display:none">${parking}</span>
          <span class="Gym-RealGym cart-column" style="display:none">${RealGym}</span>
        <div class="cart-quantity cart-column">
           
             <label for="parking_Slot">Parking</label>
            <input type="checkbox" class="cart-quantity-input check" name="parking_Slot" id="parking_Slot" checked>


            <label for="Gym">Gym</label>
            <input type="checkbox" onClick=updateGym() class="Gym" name="Gym" id="Gym" checked>
            <button onclick ="remove_cart()" class="btn btn-danger cd-cart__delete-item" type="button">-</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
// function val(){
//    document.getElementsByClassName("cart-quantity-input").value = 2
// }
// var Gym = shopItem.getElementsByClassName('shop-Gym')[0].innerText

function updateGym() {
    updateCartTotal()
}
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]

        var priceElement = cartRow.getElementsByClassName('cart-price')[0]


        var gymElement = cartRow.getElementsByClassName('parking-price')[0]
        var gyms = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var Gym = parseFloat(gymElement.innerText.replace('$', ''))


        var RealGymElement = cartRow.getElementsByClassName('Gym-RealGym')[0]
        var RealGym = parseFloat(RealGymElement.innerText.replace('$', ''))
        var RealGyms = cartRow.getElementsByClassName('Gym')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))


        // var quantity = quantityElement.value
        if (gyms.checked && RealGyms.checked) {
            total = total + (price + Gym + RealGym)
        } else if (RealGyms.checked && !gyms.checked) {
            total = total + (price + RealGym)
        }
        else if (gyms.checked && !RealGyms.checked) {
            total = total + (price + Gym)
        }
        else {
            total = total + (price)
        }

    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = total
    document.getElementsByClassName("cart-total-cost")[0].innerHTML = total;
}

function remove_cart() {
    //console.log("its removed")
    var li = document.getElementsByClassName("cd-cartsss")[0].innerHTML
    console.log(li)
    var lis = document.getElementsByClassName("cd-cartsss")[0].innerText = li - 1;

    console.log(lis)



}
