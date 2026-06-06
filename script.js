const list = document.querySelector('#medicines-list ul');
list.addEventListener('click',function(e){
    console.log(e.target);

    const li = e.target.parentElement;
    
    // delete medicine
    if(e.target.className==='delete'){
        list.removeChild(li);
    }

    // edit and save medicine
    if (e.target.classList.contains('edit')) {

    const medName = li.querySelector('.name');
    const medQuantity = li.querySelector('.quantity');

     // contains editing => save mode
    if (li.classList.contains('editing')) {

    const nameInput = medName.querySelector('input');
    const qtyInput = medQuantity.querySelector('input');

    medName.textContent = nameInput.value;
    medQuantity.textContent = qtyInput.value;

    li.classList.remove('editing');

    checkStock();
    return;
}

    // edit mode
    li.classList.add('editing');

    const nameInput = document.createElement('input');
    const qtyInput = document.createElement('input');

    nameInput.value = medName.textContent;
    qtyInput.value = medQuantity.textContent;
   
    medName.textContent = '';
    medQuantity.textContent = '';

    medName.appendChild(nameInput);
    medQuantity.appendChild(qtyInput);

    nameInput.focus();
   };
});


// Add medicine
const addMed = document.forms['add-medicine'];

addMed.addEventListener('submit',function(e){
    e.preventDefault();

    const name = addMed.querySelector('input[type=text]').value;
    const quantity = addMed.querySelector('input[type=number]').value;

    // create list items
    const li = document.createElement('li');
    const medName = document.createElement('span');
    const medQuantity = document.createElement('span');
    const editBtn = document.createElement('span');
    const deleteBtn = document.createElement('span');

    // add content
    medName.textContent = name;
    medQuantity.textContent = quantity;
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    // add classes
    medName.classList.add('name');
    medQuantity.classList.add('quantity');
    editBtn.classList.add('edit');
    deleteBtn.classList.add('delete');

    // append to list
    li.appendChild(medName);
    li.appendChild(medQuantity);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);

    checkStock();
});

//stock check
function checkStock(){
const medicinesList = document.querySelectorAll('#medicines-list li');

medicinesList.forEach((medicine) => {
    const medquantity = medicine.querySelector('.quantity');
    const medName = medicine.querySelector('.name');

    const value = Number(medquantity.textContent);

    if (value <= 5) {
        medquantity.style.color = 'red';
        medName.style.color = 'red';
    }else {
        medquantity.style.color = '';
        medName.style.color = '';
    }
});
}

checkStock();

// hide medicines list
const hideList = document.querySelector('#hide-medicines #hide-list');
hideList.addEventListener('change', function(e){
    if(hideList.checked){
        list.style.display='none';
    }else{
        list.style.display='block';
    }
});

// search medicines
const searchBar = document.forms['search-medicine'].querySelector('input');
searchBar.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const medicines = list.getElementsByTagName('li');

    Array.from(medicines).forEach(function(medicine){
        const medicineName = medicine.firstElementChild.textContent.toLowerCase();

        if(medicineName.indexOf(term) != -1){
            medicine.style.display = 'flex';
        }else{
            medicine.style.display = 'none';
        }
    })
})
