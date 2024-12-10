const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const toggleModeButton = document.getElementById('toggleMode');
const shoppingList = document.getElementById('shoppingList');
const itemInput = document.getElementById('itemInput');
const priceInput = document.getElementById('priceInput');
let isDarkMode = false;

let shoppingArray = JSON.parse(localStorage.getItem('shoppingArray')) || []; // Retrieve data from localStorage

// Save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('shoppingArray', JSON.stringify(shoppingArray));
}

// Add item to list
addButton.addEventListener('click', () => {
  const item = itemInput.value;
  const price = parseFloat(priceInput.value).toFixed(2);

  if (item && price) {
    shoppingArray.push({ item, price, purchased: false, inCart: false });
    saveToLocalStorage();
    updateList();
    itemInput.value = '';
    priceInput.value = '';
  }
});

// Clear all items from the list
clearButton.addEventListener('click', () => {
  shoppingArray = [];
  saveToLocalStorage();
  updateList();
});

// Toggle Dark Mode
toggleModeButton.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode', isDarkMode);
  toggleModeButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

// Mark item as purchased
function markPurchased(index) {
  shoppingArray[index].purchased = !shoppingArray[index].purchased;
  saveToLocalStorage();
  updateList();
}

// Remove item from list
function removeItem(index) {
  shoppingArray.splice(index, 1);
  saveToLocalStorage();
  updateList();
}

// Add to Cart
function addToCart(index) {
  shoppingArray[index].inCart = true;
  saveToLocalStorage();
  updateList();
}

// Update the shopping list DOM
function updateList() {
  shoppingList.innerHTML = '';
  shoppingArray.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.toggle('purchased', item.purchased);

    const itemText = document.createElement('span');
    itemText.textContent = `${item.item} - Ksh ${item.price}`;

    const purchasedButton = document.createElement('button');
    purchasedButton.textContent = item.purchased ? 'Unmark' : 'Mark as Purchased';
    purchasedButton.addEventListener('click', () => markPurchased(index));

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = item.inCart ? 'In Cart' : 'Add to Cart';
    addToCartButton.disabled = item.inCart;
    addToCartButton.addEventListener('click', () => addToCart(index));

    li.append(itemText, purchasedButton, addToCartButton, removeButton);
    shoppingList.appendChild(li);
  });
}

// Initial render
updateList();
