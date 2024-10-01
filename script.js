const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')

function addItem (e) {
    e.preventDefault()
    const newItem = itemInput.value
    if (newItem === '') {
        alert('Please Enter An Item')
        return
    }

  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  

  const button = document.createElement('button')
  button.className = 'remove-item btn-link text-red'

  const i = document.createElement('i')
  i.className = 'fa-solid fa-xmark'

  button.appendChild(i)
  li.appendChild(button)
  document.querySelector('ul').appendChild(li)
  itemInput.value = ''
}


itemForm.addEventListener('submit',addItem)