const searchInput = document.getElementById('search');
const productsWrapperEl = document.getElementById('main');
const form = document.getElementById('form')
const checkEls = document.querySelectorAll('.check');
const filtersContainer = document.getElementById('filters-container');
url = '/getall'

// Initialize cart item count

getfecth()

// Initialize products
const productsEls = [];



async function getfecth() {
    // Loop over the products and create the product element
    const res = await fetch(url)
    const data = await res.json()
        //productsWrapperEl.innerHTML = ''
    data.forEach((product) => {
        const productEl = createProductElement(product);
        productsEls.push(productEl);
        productsWrapperEl.appendChild(productEl);
    });

};
//}

filtersContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product element
function createProductElement(product) {
    const productEl = document.createElement('div');
    productEl.innerHTML = `<a style="text-decoration:none;" onclick="movieselected('${product.id}')"href="#">
    <div class="movie">
    <img src="${product.client}">
    <div class="movie-info">
  <h3>${product.Aname.Name} ${product.Aname.Mname} ${product.Aname.Surname} </h3>
    </div></div> </a> `
    return productEl;
}

async function filterProducts() {
    const res = await fetch(url)
    const data = await res.json()
        // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkEls)
        .filter((check) => check.checked)
        .map((check) => check.id);

    // Loop over products and check for matches
    productsEls.forEach((productEl, index) => {
        const product = data[index];

        // Check to see if product matches the search or checked items
        const matchesSearchTerm = productEl.innerText.toLowerCase().includes(searchTerm);
        const isInCheckedCategory =
            checkedCategories.length === 0 ||
            checkedCategories.includes(product.YearofAdmin);

        // Show or hide product based on matches
        if (matchesSearchTerm && isInCheckedCategory) {
            productEl.classList.remove('hide');
        } else {
            productEl.classList.add('hide');
        }
    });
}
getmovieee();
async function getmovieee() {
    let objects = document.getElementById("objects");
    const res = await fetch(url)
    const data = await res.json()
    let allObject = data.filter((val) => {
        if (typeof val == 'object') {
            return true;
        } else { return false; }
    });
    let objectsLen = allObject.length;
    objects.innerHTML += "" + objectsLen
}


function movieselected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'samplepreview.html';
    return false;

}

async function getmovie() {
    let movieId = sessionStorage.getItem('movieId');
    console.log(movieId)
    const res = await fetch(url)
    const data = await res.json()
    let id = data.filter(ids => ids.id === movieId);
    console.log(id)

    const html = id.map(user => {
        const li = document.createElement('li')
        li.innerHTML = `
            <div class="user-profile">
                <div style="justify-content:center; padding:5% 0% ;width:100%;justify-self:center;background-color:green;heigh:auto;" class="profile-top">
                <div style="justify-content:center;padding:5% 18%; width:100%;justify-self:center;background-color:green;heigh:auto;">
                    <img src="${user.client}">
                    </div>
                    <div style="padding: 0px 25px;" class="profile-info">
                        <h2 style="text-align:center;margin-bottom:0px;line-height:2rem;color:white;">${user.Aname.Name} ${user.Aname.Mname} ${user.Aname.Surname}</h2>  
                        <h1 style="margin-top:3px;margin-bottom:0px;line-height:1rem;text-align:center;color:yellow;">>>>ID NO: ${user.pine}<<<</h1>
                    </div>
                
                </div>
                <div class="profile-bottom">
                <h1 style="font-size:12px;margin-bottom:0px;text-align:center;padding:0 1rem;margin-top:-10px;">SCHOOL</h1>
                    <div style="flex-direction:column;margin-bottom:15px;text-align:center;" class="profile-info"> 
                        <h1>- ${user.School} ${user.sn} -</h1>
                    </div>
                
                <h1 style="font-size:12px;margin-bottom:15px;text-align:center;padding:0 1rem;">DATE OF BIRTH</h1>
                    <div style="flex-direction:column;margin:-11px 0px;" class="profile-info"> 
                        <h1>- ${user.Ddateofbirth.Day} ${user.Ddateofbirth.Month} ${user.Ddateofbirth.Year} -</h1>
                     </div>
                </div>
                    <div class="profile-bottom">
                        <div style="display:flex;">
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">B/G</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Bloodgroup}</h1>
                                </div>
                            </div>
                            <div style="width:45%;margin:0 1px;">
                            <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1rem;">STATUS/VALIDITY</h1>
                                <div style="flex-direction:column;"class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;margin-top:-5px;">${user.Status}</h1>
                                <h1 style="margin:0px;color:red;font-size:12px;margin-bottom:0px;line-height:.5rem;">- ${user.Presentclass} -</h1>
                                </div>
                            </div>
                            <div style="width:25%;margin:0 1px;">
                                <h1 style="font-size:12px;margin-top:-5px;text-align:center;padding:0 1.5rem;">GENDER</h1>
                                <div class="profile-info">
                                <h1 style="color:black;padding:0 .8rem;">${user.Gender}</h1>
                                </div>
                            </div>
                        </div>
                        
                        <h1 style="font-size:12px;margin-top:-8px;text-align:center;padding:0 0rem;">LGA/STATE OF ORIGIN</h1>
                            <div style="flex-direction:column;"class="profile-info"> 
                                <h1 style="margin-top:-1px;">- ${user.State} -</h1>
                                <h1 style="margin:-5px;color:red;font-size:12px;">- ${user.HometownCommunity} -</h1>
                            </div> 
                            
                           <div style="margin-bottom:1rem;jusify-self:center">
                                 <div style="display:flex;margin:-9px 0px;;justify-content:center;">
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 1:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo}">
                                        <div style="margin-left: 0px;"class="p1">
                                            <p2 style="margin-left: 0px;">${user.ParentPhoneNo}</p2>
                                        </div>
                                    </a>                   
                                </div>
                            </div>
                            <div>
                                <h1 style="font-size:12px;margin:0px;text-align:center;">PARENT CONTACT 2:</h1>
                                <div class="profile-info">
                                    <a style="text-decoration: none;" href="Tel:${user.ParentPhoneNo2}">
                                        <div style="margin-left: 0px;"class="p2">
                                            <p2 style="margin-left: 0px;">${user.ParentPhoneNo2}</p2>
                                        </div>
                                    </a>                   
                                </div>                           
                            </div>
                        </div>
                            </div>
                    </div>
                       
                    </div>       
                </div>
            </div>`
        facttext.appendChild(li)

    });
}


  
   
          window.addEventListenersetTimeout(("pageshow", function(event) {
            var historyTraversal = event.persisted,
                perf = window.performance,
                perfEntries = perf && perf.getEntriesByType && perf.getEntriesByType("navigation"),
                perfEntryType = perfEntries && perfEntries[0] && perfEntries[0].type,
                navigationType = perf && perf.navigation && perf.navigation.type;
            if (
                historyTraversal || perfEntryType === "back_forward" || navigationType === 2
            ) {
                window.location.reload();
            }
        }),19* 60 * 1000)

        setTimeout(() =>{
            window.location.href = '/ISEMB/ASSO.html';

        },20* 60 * 1000)
