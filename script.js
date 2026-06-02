const list = document.querySelector('#medicines-list ul');
list.addEventListener('click',function(e){
    if(e.target.className==='delete'){
        const li = e.target.parentElement;
        list.removeChild(li);
    }
})



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
    const deleteBtn = document.createElement('span');

    // add content
    medName.textContent = name;
    medQuantity.textContent = quantity;
    deleteBtn.textContent = 'Delete';

    // add classes
    medName.classList.add('name');
    medQuantity.classList.add('quantity');
    deleteBtn.classList.add('delete');

    // append to list
    li.appendChild(medName);
    li.appendChild(medQuantity);
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
    }
});
}

checkStock();