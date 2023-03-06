const addElement = document.querySelector('.add');
const groceryElement = document.querySelector('.grocery');
const groceryListElement = document.querySelector('.groceryListBody');
const lessElement = document.querySelector('.less');
const moreElement = document.querySelector('.more');
const itemElement = document.querySelector('.item');


// const list = ['bread', 'milk', 'onion'];

let page = 1; // current page
let maxPage; // maximum pages

//! local storage added
let list;

const readFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const setLocalStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    return readFromLocalStorage(key);
}



const read = (list) => {
    
    groceryListElement.innerHTML = '';
    
    loadFirstSix(list, (page - 1) * 6, 6).forEach((element, idx) => {
        groceryListElement.innerHTML += `
        <tr>
            <td>${element}</td>
            <td><button class="btn" data-itemvalue="${element}" onClick="deleteItem(event)"><i class="fa-solid fa-eraser"></i></button></td>
        </tr>`
    })
    list.length % 6 === 0 ? maxPage = list.length / 6 : maxPage = Math.floor(list.length / 6) + 1;
    itemElement.value = page
}

addElement.addEventListener('click', () => {
    if(groceryElement.value !== ''){
        const newList = [...list, groceryElement.value];  // added storage
        list = setLocalStorageItem('groceryList', newList);
    }

    groceryElement.value = '';
    groceryElement.focus();
    read(list);
});

//! local storage added
const deleteItem = (event) => {
    let value = event.target.parentNode.dataset.itemvalue;
    let idx = list.indexOf(value);
    list.splice(idx, 1);
    
    list = setLocalStorageItem('groceryList', list);
    read(list);
}

// ENTER function - DONE
groceryElement.addEventListener('keyup', (props) => {
    if(props.keyCode === 13) {
        props.preventDefault();    
        document.querySelector('.add').click();
    }

    groceryElement.focus();
    read(list);
})



lessElement.addEventListener('click', () => {
    page <= 1 ? page = 1 : page -= 1;
    read(list);
})

moreElement.addEventListener('click', () => {
    page >= maxPage ? page = maxPage : page += 1;
    read(list);
})

const loadFirstSix = (lista, fromElementIdx, noOfElements) => {
    return lista.filter((element, idx) => {
        if(idx >= fromElementIdx && idx < fromElementIdx + noOfElements) {
            return element;
        };
    });
}

window.onload = () => {
    localStorage.getItem('groceryList') === null && localStorage.setItem('groceryList', JSON.stringify(['bread', 'milk', 'onion']));
    list = readFromLocalStorage('groceryList');

    list.length % 6 === 0 ? maxPage = list.length / 6 : maxPage = Math.floor(list.length / 6) + 1;
    console.log(maxPage);

    groceryElement.focus();
    read(list);
}
