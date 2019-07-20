var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var itemsObject = new Array();

// Check for items saved in Local Storage and list them
if(localStorageLookup()){
    listLStorageItems();
}

// No Items message
function noItemsToList() {
    var noItemsElement = document.createElement('h3');
    noItemsElement.setAttribute('id', 'noItems');
    noItemsElement.classList.add('text-center');
    noItemsElement.innerText = 'No Items to be Displayed, add some tasks';

    var firstUl = document.querySelector('ul');
    firstUl.appendChild(noItemsElement);
}

// Look for local storage items
function localStorageLookup() {
    if(localStorage.items) {
        console.log('Items in Local Storage found');
        return true;
    } else {
        console.log('No items found in Local Storage');

        // Run noItemsToList()
        noItemsToList();

        return false;
    }
}

// List Local Storage Items
function listLStorageItems() {
    itemsObject = JSON.parse(localStorage.getItem('items'));
    for(var i = 0; i < itemsObject.length; i++) {
        buildLi(itemsObject[i]);
        // console.log(Object.entries(itemsObject)[i][1]);
    }
}

// Build container for each item
function buildLi(itemValue) {
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(itemValue));

    var delButton = document.createElement('button');
    delButton.className = 'btn btn-danger btn-sm float-right delete';
    delButton.appendChild(document.createTextNode('X'));

    li.appendChild(delButton);

    itemList.appendChild(li);

    if(document.getElementById('noItems')) {
        document.getElementById('noItems').remove();
    }
}

// Store items in local storage after they get added
function storeItems(valueToStore) {
    // Find next ID (+1)
    itemsObject.push(valueToStore);
    // Write new list of items to Local Storage
    localStorage.setItem('items', JSON.stringify(itemsObject));
    // itemsObject
    // itemsArray.push(valueToStore);
    // console.log('ItemsArray = ' + itemsArray);
    // localStorage.setItem('items', JSON.stringify(itemsArray));
}

// Form submit event
form.addEventListener('submit', addItem);

// Delete event
itemList.addEventListener('click', removeItem);

// Filter event
filter.addEventListener('keyup', filterItems);

// Display Message when no items to list

// Add item
function addItem(e) {
    e.preventDefault();
    
    // Fetch text input value
    var newItemField = document.getElementById('item').value;

    buildLi(newItemField);

    // Save added item to local storage
    console.log(newItemField);
    storeItems(newItemField);

    // Clean text input value after item is added
    cleanTextInput();

    // Check for applied filter (issue #1 fixed)
    if(filter.value != ''){
        filterItems();
        console.log('Item added and filtered');
    } else{
        console.log('Filter not being applied');
    }
}

function removeItem(e) {
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            // Remove from memory
            delItemLocalStorage(li.firstChild.textContent)
            itemList.removeChild(li);
        }
    }
}

// Filter Items
function filterItems(){
    // Convert input to lowercase
    var text = filter.value.toLowerCase();

    // Get List of Items
    var items = itemList.getElementsByTagName('li');

    // Convert to an Array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })

}

// Clean/Flush text input value
function cleanTextInput() {
    document.getElementById('item').value = '';
}

function clearLocalStorage(){
    itemsArray = {};
    localStorage.clear();
}

function delItemLocalStorage(itemToDelete) {
    // Find item Index
    idToDelete = itemsObject.indexOf(itemToDelete);
    
    // Using splice() to remove item from array
    itemsObject.splice(idToDelete, 1);

    // Update Local Storage
    if(itemsObject.length === 0) {
        // If Items Object empty remote items from Local Storage object
        localStorage.removeItem('items');
        noItemsToList();
    } else {
        localStorage.setItem('items', JSON.stringify(itemsObject));
    }
}