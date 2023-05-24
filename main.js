const data=[
    {
        id:1,
        price:230000,
        location:'Neriman Nerimanov m.',
        date:'Baki, dunen 15:53',
        area: 85,
        numberOfRoom:2,
        img:"photo1.jpg",
    },
    {
        id:2,
        price:290000,
        location:'Nardaran q.',
        date:'Baki, dunen 15:53',
        area: 52,
        numberOfRoom:1,
        img:"photo2.jpg",
    },
    {
        id:3,
        price:320000,
        location:'Genclik m.',
        date:'Baki, dunen 15:53',
        area: 120,
        numberOfRoom:3,
        img:"photo3.jpg",
    },
    {
        id:4,
        price:800000,
        location:'Merdekan q.',
        date:'Baki, dunen 15:53',
        area: 400,
        numberOfRoom:6,
        img:"photo4.jpg",
    },
    {
        id:5,
        price:230000,
        location:'Merdekan q.',
        date:'Baki, dunen 15:53',
        area: 170,
        numberOfRoom:4,
        img:"photo5.jpg",
    },
    {
        id:6,
        price:167000,
        location:'Sah Ismail Xetai  m.',
        date:'Baki, dunen 15:53',
        area: 60,
        numberOfRoom:2,
        img:"photo6.jpg",
    },
    {
        id:7,
        price:45000,
        location:'Elimler Akademiyasi m.',
        date:'Baki, dunen 15:53',
        area: 3000,
        numberOfRoom:10,
        img:"photo7.jpg",
    },
    {
        id:8,
        price:500000,
        location:'Nesimi m.',
        date:'Baki, dunen 15:53',
        area: 100,
        numberOfRoom:5,
        img:"photo8.jpg",
    },
    {
        id:9,
        price:192000,
        location:'Qara Qarayev m.',
        date:'Baki, dunen 15:53',
        area: 96,
        numberOfRoom:3,
        img:"photo9.jpg",
    },
]

let activeFilter=[]

const container = document.querySelector(".container").querySelector('.right')

const room = document.querySelector('.filter').querySelectorAll('.room')
room.forEach(x=>{
    x.addEventListener('click', e=>{
        const id = e.target.id
        if (e.target.checked) {
            activeFilter.push(id)
        }else{
            activeFilter = activeFilter.filter(x=>x!=id)
        }
        renderProducts()
    })
})

function createProduct(data) {
    const card = document.createElement('div')
    
    card.innerHTML=`<div class="card">
    <img src="./images/${data.img}" alt="">
    <p class="price">${data.price}</p>
    <p class="location">${data.location}</p>
    <p class="about">•${data.numberOfRoom} • ${data.area}m² •</p>
    <p class="date">${data.date}</p>
    </div>`

    return card;
}

const minAreaInput = document.querySelector(".min-area");
minAreaInput.value = 0;

const maxAreaInput = document.querySelector(".max-area");
maxAreaInput.value = 500;

const minAreaSpan = document.querySelector(".min-area-value");
minAreaSpan.innerText = minAreaInput.value;

const maxAreaSpan = document.querySelector(".max-area-value");
maxAreaSpan.innerText = maxAreaInput.value;

minAreaInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (parseInt(value) > parseInt(maxAreaInput.value)) {
    value = maxAreaInput.value;
    e.target.value = maxAreaInput.value;
  }

  minAreaSpan.innerText = value;
  renderProducts();
});

maxAreaInput.addEventListener("input", (e) => {
  let value = e.target.value;

  if (parseInt(value) < parseInt(minAreaInput.value)) {
    value = minAreaInput.value;
    e.target.value = minAreaInput.value;
  }

  maxAreaSpan.innerText = value;
  renderProducts();
});

const minInput = document.querySelector(".min");
minInput.value = 10000;

const maxInput = document.querySelector(".max");
maxInput.value = 1000000;

const minSpan = document.querySelector(".min-value");
minSpan.innerText = minInput.value;

const maxSpan = document.querySelector(".max-value");
maxSpan.innerText = maxInput.value;

minInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value);

  if (value > parseInt(maxInput.value)) {
    value = parseInt(maxInput.value);
    e.target.value = value;
  }

  minSpan.innerText = value;
  renderProducts();
});

maxInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value);

  if (value < parseInt(minInput.value)) {
    value = parseInt(minInput.value);
    e.target.value = value;
  }

  maxSpan.innerText = value;
  renderProducts();
});

function renderProducts() {
    container.innerHTML = "";
    let _temp = [...data];
  
    if (activeFilter.length > 0) {
      _temp = _temp.filter((x) => activeFilter.some((y) => y == x.numberOfRoom));
    }
  
    const minPrice = parseInt(minInput.value);
    const maxPrice = parseInt(maxInput.value);
    _temp = _temp.filter((x) => x.price >= minPrice && x.price <= maxPrice);
  
    const minArea = parseInt(minAreaInput.value);
    const maxArea = parseInt(maxAreaInput.value);
    _temp = _temp.filter((x) => {
      if (x.area) {
        return x.area >= minArea && x.area <= maxArea;
      }
      return false;
    });
  
    _temp.forEach((x) => {
      const productDiv = createProduct(x);
      container.append(productDiv);
    });
  }
  

renderProducts()
