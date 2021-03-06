
let list;
let listAdd;
let itemCount;
let totalPrice;

let email = sessionStorage.getItem('email'); //gets the users email from sessionStorage

getCart(email);

function getCart($email) {
    $.ajax({
        url: Url + 'GetCart',
        type: 'get',
        dataType: 'json',
        data: {"email":$email},
        contentType: 'text/plain',
        success: function (data) {

            list = '';
            listAdd = '';
            itemCount = 0;
            totalPrice = 0;

            $.each(data['data']['List'], function (i, item) {
                listAdd = '<div class="row main align-items-center">\n' +
                    '                        <div class="col-2"><img class="img-fluid" src="' + item['image'] + '"></div>\n' +
                    '                        <div class="col">\n' +
                    '                            <div class="row text-muted">' + item['operating_system'] + '</div>\n' +
                    '                            <div class="row">' + item['title'] + '</div>\n' +
                    '                        </div>\n' +
                    '                        <div class="col"> <a class="border">1</a></div>\n' +
                    '                        <div class="col">&dollar; ' + item['money_price'] + ' <a onclick="deleteItem(' + item['id'] + ')" type="button">&#10005;</a></div>\n' +
                    '                    </div>';
                list = list + listAdd;
                itemCount++;
                totalPrice += parseInt(item['money_price']);
            });

            $('#cart-list').html(list);
            $('#item-count').html(itemCount + ' items');
            $('#item-total').html(itemCount + ' items');
            $('#item-price').html('&dollar; ' + totalPrice);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function deleteItem($id) {
let email =$.trim($('#email').val()); //gets the user's email

    $.ajax({
        url: Url + 'Cart/' + $id,
        type: 'delete',
        dataType: 'json',
        data: {"product_id": $id},
        contentType: 'text/plain',

        success: function (data) {
            getCart(email);
            //list.getItem($id);
            itemCount--;
            alert("Item deleted.")
        }

    });
    

function clearCart() {
    var cartItems = [];

    // get cart items first
    $.ajax({
        url: Url+'GetCart',
        type: 'get',
        dataType: 'json',
        data: { 'email': email },
        contentType: 'json',

        success: function (data) {
            cartItems = data.data.List;

            console.log(cartItems); 

            $.each( cartItems, function( key, value ) {
                $.ajax({
                    url: Url+'Cart/'+${value.id},
                    type: 'delete',
                    contentType: 'json',

                });
                getCart(email);
          });
        },
    });
}

function checkOut() {
    let email =$.trim($('#email').val()); //gets the user's email

    $.ajax({
        url: Url + 'Cart',
        type: 'put',
        dataType: 'json',
        data: {"email": email},
        contentType: 'text/plain',
        success: function (data) {
            getCart(email);
            var name = window.prompt("Enter in Full Name: ", "");
            var address = window.prompt("Enter in Your Address: ", "");
            address += " " + window.prompt("Enter in Your City: ", "");
            address += ", " + window.prompt("Enter in Your State (Ex: CA): ", "");
            address += " " + window.prompt("Enter in Your ZipCode: ", "");
            if(address != null){
                alert("ORDER CONFIRMATION \nName :  "+ name + "\nTotal Payment Charged: $"+ totalPrice + ".00\nShipping address: " + address + "\nThank You for your Order!");
                document.write("Order Confirmation Number: " + (Math.floor(Math.random() * (9999999999999 - 1000000000000) + 1000000000000)))
            }else{
                alert("invalid");
            }

        }

    })


}
   
    
    //alert("cart.js/deleteItem() is not implemented")
    document.getElementById("btnDarkmode").onclick = function Darkmode(){
        //console.log("dark button working")
        document.body.style.backgroundColor = "rgb(32, 33, 36)";
        //document.getElementsByClassName(".card").style.backgroundColor = "rgb(55,57,59)";
    }
    document.getElementById("btnLightmode").onclick = function Lightmode(){
        //console.log("light button working")
        document.body.style.backgroundColor = "rgb(255, 255, 255)";
        //document.getElementsByClassName(".card").style.backgroundColor = "rgb(55,57,59)";
    }

}
