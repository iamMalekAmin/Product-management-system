let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let create = document.getElementById('create');
let deletee = document.getElementById('delete');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let mood = 'create';
let temp;

//calculate total !!!
function gettotal(){
    if(price.value!=""){
        let result = (+price.value + +ads.value + +taxes.value ) - +discount.value ;
        // to transform from str to int use + before variable
        total.innerHTML = result;
    }else{
        total.innerHTML = "";
    }
}

//create new product !!!
let datapro;
// to save data when refresh and add a new product 
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
}
create.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != ''&& category.value != '' ){
    if(mood === 'create'){
         if(count.value > 1){
        for(let i=0; i<count.value ; i++){
            datapro.push(newpro);
        }
    }else{
    //put the object in array
    datapro.push(newpro);
    }
    }else{
        datapro[temp] = newpro;
        mood = 'create';
        count.style.display = 'block'; 
        create.innerHTML = 'CREATE New Item'
    }    cleardata()
}
   
    //save the array data in local storage
    localStorage.setItem('product', JSON.stringify(datapro));


savedata()
}

//clear inputs !!!
function cleardata(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value = '';
    category.value = '';
}

//show data !!!
function savedata(){
    let table = '';
    for(let i = 0 ; i< datapro.length ;i++){
        table += 
       `
               <tr>
                    <td>${i+1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].count}</td>
                    <td>${datapro[i].category}</td>
                    <td><button type="button" onclick="update(${i})" class="btn btn-outline-primary" id="update">update</button></td>
                    <td><button type="button" onclick="deletitem(${i})" class="btn btn-outline-danger" id="dlt">delete</button></td>
                </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    if(datapro.length >0){
        deletee.classList.add('yzhr');
    }
}
savedata()

//delete one item !!!
function deletitem(i){
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    savedata();
    datapro.count--;
}

// update one item !!!
function update(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    ads.value = datapro[i].ads;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    total.innerHTML = datapro[i].total;
    category.value = datapro[i].category;
    count.style.display = 'none';    
    create.innerHTML = 'Update';
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior: "smooth",
    })

}

//delete all items
deletee.onclick = function(){
   localStorage.clear();
   datapro.splice(0);
   savedata();

}

let searchmood = 'title';
//search btn !!! 
function searchclick(id){

    if(id == 'searchbytitle'){
        searchmood = 'title';
    }else{
        searchmood = 'category';
    }
    search.placeholder= 'search by ' + searchmood;
    search.focus()
    search.value ='';
    savedata()
}

function searchbox(value){
    let table= '';
     for(let i = 0 ; i < datapro.length ; i++ ){
        if(searchmood == 'title'){
            if(datapro[i].title.includes(value.toLowerCase() ) ) {
                table += 
                `
                        <tr>
                             <td>${i}</td>
                             <td>${datapro[i].title}</td>
                             <td>${datapro[i].price}</td>
                             <td>${datapro[i].taxes}</td>
                             <td>${datapro[i].ads}</td>
                             <td>${datapro[i].discount}</td>
                             <td>${datapro[i].total}</td>
                             <td>${datapro[i].count}</td>
                             <td>${datapro[i].category}</td>
                             <td><button type="button" onclick="update(${i})" class="btn btn-outline-primary" id="update">update</button></td>
                             <td><button type="button" onclick="deletitem(${i})" class="btn btn-outline-danger" id="dlt">delete</button></td>
                         </tr>
                 `
            }
        }
        else{
            if(datapro[i].category.includes(value.toLowerCase() ) ) {
                table += 
                `
                        <tr>
                             <td>${i}</td>
                             <td>${datapro[i].title}</td>
                             <td>${datapro[i].price}</td>
                             <td>${datapro[i].taxes}</td>
                             <td>${datapro[i].ads}</td>
                             <td>${datapro[i].discount}</td>
                             <td>${datapro[i].total}</td>
                             <td>${datapro[i].count}</td>
                             <td>${datapro[i].category}</td>
                             <td><button type="button" onclick="update(${i})" class="btn btn-outline-primary" id="update">update</button></td>
                             <td><button type="button" onclick="deletitem(${i})" class="btn btn-outline-danger" id="dlt">delete</button></td>
                         </tr>
                 `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}