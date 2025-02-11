const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cart = new Map();

function addProduct(id, name, price, quantity) {
  if (cart.has(id)) {
    console.log("Product ID already exists.");
    return;
  }
  cart.set(id, { name, price, quantity });
  console.log(`${name} added to cart.`);
}

function updateQuantity(id, quantity) {
  if (cart.has(id)) {
    let product = cart.get(id);
    product.quantity = quantity;
    console.log(`Updated quantity of ${product.name} to ${quantity}.`);
  } else {
    console.log("Product not found in cart.");
  }
}

function removeProduct(id) {
  if (cart.delete(id)) {
    console.log("Product removed from cart.");
  } else {
    console.log("Product not found.");
  }
}

function viewCart() {
  if (cart.size === 0) {
    console.log("Cart is empty.");
    return;
  }
  let total = 0;
  console.log("\nShopping Cart:");
  cart.forEach((product, id) => {
    let subTotal = product.price * product.quantity;
    total += subTotal;
    console.log(`ID: ${id}, Name: ${product.name}, Price: ${product.price}, Quantity: ${product.quantity}, Subtotal: ${subTotal}`);
  });
  if (total > 500) {
    total *= 0.95; // Apply 5% discount
    console.log("5% discount applied.");
  }
  console.log(`Total Price: ${total.toFixed(2)}`);
}

function clearCart() {
  cart.clear();
  console.log("Cart cleared.");
}

function showMenu() {
  console.log("\nShopping Cart System");
  console.log("1. Add Product");
  console.log("2. Update Product Quantity");
  console.log("3. Remove Product");
  console.log("4. View Cart");
  console.log("5. Clear Cart");
  console.log("6. Exit");
  rl.question("Choose an option: ", (choice) => {
    switch (choice) {
      case "1":
        rl.question("Enter Product ID: ", (id) => {
          rl.question("Enter Product Name: ", (name) => {
            rl.question("Enter Product Price: ", (price) => {
              rl.question("Enter Quantity: ", (quantity) => {
                addProduct(id, name, parseFloat(price), parseInt(quantity));
                showMenu();
              });
            });
          });
        });
        break;
      case "2":
        rl.question("Enter Product ID to update: ", (id) => {
          rl.question("Enter new Quantity: ", (quantity) => {
            updateQuantity(id, parseInt(quantity));
            showMenu();
          });
        });
        break;
      case "3":
        rl.question("Enter Product ID to remove: ", (id) => {
          removeProduct(id);
          showMenu();
        });
        break;
      case "4":
        viewCart();
        showMenu();
        break;
      case "5":
        clearCart();
        showMenu();
        break;
      case "6":
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid option, try again.");
        showMenu();
    }
  });
}

showMenu();