const list = document.querySelector('#medicines-list ul');
list.addEventListener('click',function(e){
    console.log(e.target);

    const li = e.target.parentElement;
    
    // delete medicine
    if(e.target.className==='delete'){
        list.removeChild(li);
    }

    // edit medicine
    if (e.target.className==='edit') {

    const medName = li.querySelector('.name');
    const medQuantity = li.querySelector('.quantity');

    if (li.classList.contains('editing')) return;

    // Edit mode
    li.classList.add('editing');

    const nameInput = document.createElement('input');
    const qtyInput = document.createElement('input');

    nameInput.value = medName.textContent;
    qtyInput.value = medQuantity.textContent;
   
    medName.textContent = '';
    medQuantity.textContent = '';

    medName.appendChild(nameInput);
    medQuantity.appendChild(qtyInput);

}
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