const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const icon = document.querySelectorAll('li')
const clear = document.getElementById('clear')
const filter = document.querySelector('.filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false;

function displayStorage() {
  let items = getItemFromLocalStorage()
  items.forEach(item => addItemToDom(item))
  clearUI()
}
function addItem(e) {

  e.preventDefault()
  if (itemInput.value ===''){
     alert('Enter An Item')
     return
  }
  
  const newItem = itemInput.value

  if(isEditMode){
    const itemToEdit = itemList.querySelector('.edit-mode');
    removeFromStorage(itemToEdit)
    itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false;
  }else{
    if(checkDuplicates(newItem)){
      alert('item already exists')
      return
    }
  }


  addItemToDom(newItem)

  addItemToLocalStorage(newItem)
  clearUI()
}

function addItemToDom (item) {

  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))

  const btn = document.createElement('button')
  btn.className = 'remove-item btn-link text-red'
  
  const icon = document.createElement('i')
  icon.className = 'fa-solid fa-xmark'

  btn.appendChild(icon)
  li.appendChild(btn)
  itemList.appendChild(li)
}

function addItemToLocalStorage (item) {
  let itemStorage = getItemFromLocalStorage();

  itemStorage.push(item)  

  localStorage.setItem('items',JSON.stringify(itemStorage))

}

function getItemFromLocalStorage (item) {
  let itemStorage;

  if(localStorage.getItem('items') === null){
    itemStorage = []
  }else{
    itemStorage = JSON.parse(localStorage.getItem('items'))
  }
  return itemStorage

}

function onClickItem (e) {
  if(e.target.parentElement.classList.contains('remove-item')){
      
      removeItem(e.target.parentElement.parentElement)
      removeFromStorage(e.target.parentElement.parentElement)
   }else{
    setItemToEdit(e.target)
   }
}

function setItemToEdit(item){

  isEditMode = true;
  
  itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'))

  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class= "fa-solid fa-pen"><i/> Update Item'
  formBtn.style.backgroundColor='#228B22'
  itemInput.value = item.textContent

}

function removeItem(item) {
  if(confirm('Are You Sure You Want To Delete')){
   item.remove() 
   clearUI() 
}
 
}

function removeFromStorage(item) {
  const text = item.textContent

  let items = getItemFromLocalStorage()

  items = items.filter( i => i !== text )
  
  localStorage.setItem('items',JSON.stringify(items))
}

function checkDuplicates(item) {
  

  const items = getItemFromLocalStorage()
  return items.includes(item)

 
}
function clearUI () {
  itemInput.value = ''
  const items = itemList.querySelectorAll('li')
  if (items.length === 0){
    filter.style.display = 'none'
    clear.style.display = 'none'
  }else{
    filter.style.display= 'block'
    clear.style.display = 'block'
  }

  formBtn.innerHTML = ' <i class="fa-solid fa-plus"></i> Add Item'
}
function clearItem(item) {
  while(itemList.firstChild){
  itemList.removeChild(itemList.firstChild)
  }

  localStorage.removeItem('items')
  clearUI()
}
function filterItems(e){
  const items = document.querySelectorAll('li')
  const text = e.target.value.toLowerCase()

  items.forEach(item => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if(itemName.indexOf(text) != -1){
       item.style.display = 'flex'
    }else{
       item.style.display = 'none'
    }
  })
}

itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',onClickItem)
clear.addEventListener('click',clearItem)
filter.addEventListener('input',filterItems)
document.addEventListener('DOMContentLoaded',displayStorage)

clearUI()