const pet = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"],
      "id": "pet0"
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/pets-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"],
      "id": "pet1"
    },
    {
      "name": "Woody",
      "img": "../../assets/images/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"],
      "id": "pet2"
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlet is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"],
      "id": "pet3"
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"],
      "id": "pet4"
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"],
      "id": "pet5"
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"],
      "id": "pet6"
    },
    {
      "name": "Charly",
      "img": "../../assets/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"],
      "id": "pet7"
    }
  ]





const btnBurger = document.querySelector('.burger');
const navWrapper = document.querySelector('.list');
const body = document.querySelector('.body');
const navList = document.querySelector('.nav-list');
const itemLink = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo')



// const spanBurger = document.querySelectorAll('.line');


btnBurger.addEventListener('click', function () {

  navWrapper.classList.toggle('active-nav');
	btnBurger.classList.toggle('active-btn');
  body.classList.toggle("active");
  logo.classList.toggle("active-logo");
})


navWrapper.addEventListener('click', (event) => {
  if (event.target.classList.contains('list' || 'nav-link')) {
    navWrapper.classList.toggle('active-nav');
    body.classList.toggle("active");
    btnBurger.classList.toggle('active-btn');
    logo.classList.toggle("active-logo");
  }
})


function changeStatusLink (event) {
    if (event.target.classList.contains('nav-link')) {
      if(window.innerWidth >= 768) {
        itemLink.forEach (el => el.classList.remove('active'));
        event.target.classList.add('active');
      } else {
        itemLink.forEach (el => el.classList.remove('active'));
        event.target.classList.add('active');
        navWrapper.classList.toggle('active-nav');
        body.classList.toggle("active");
        btnBurger.classList.toggle('active-btn');
        logo.classList.toggle("active-logo");
      }
    }
}

navList.addEventListener('click', changeStatusLink)


    


//Slider

const btnLeft = document.querySelector('.left-btn');
const btnRight = document.querySelector('.right-btn');
const carousel = document.querySelector('.carousel');
const itemPets = document.querySelectorAll('.carousel-item');
const itemLeft = document.querySelector('#left-item');
const itemRight = document.querySelector('#right-item');
const itemActive = document.querySelector('#active-item');



let slide = [4, 0, 2];
const makeSlide = () => {
  if (window.innerWidth >= 1280) {
    while(slide.length < 6){
      let number = Math.floor(Math.random() * 8)
      if(!slide.includes(number)){
          slide.push(number)
      }
  }
  slide.splice(0, 3)
  console.log(slide)
  } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
    while(slide.length < 6){
      let number = Math.floor(Math.random() * 8)
      if(!slide.includes(number)){
          slide.push(number)
      }
  }
  slide.splice(0, 4)
  console.log(slide)
  } else if (window.innerWidth < 768) {
    while(slide.length < 6){
      let number = Math.floor(Math.random() * 8)
      if(!slide.includes(number)){
          slide.push(number)
      }
  }
  slide.splice(0, 5)
  }
  
}

// let number;

const moveLeft = () => {
  cardPets = document.querySelectorAll(".pet");
  makeSlide()
  itemLeft.innerHTML = "";
 for (let k of slide) {
    const card = document.createElement("div");
    card.classList.add("pet");
    card.id = 'p' + k;
    card.innerHTML = `
         <div class="pet-picture ${pet[k].name}"><img class="pet-picture-img" src="${pet[k].img}" alt = "pets"></div>
         <div class="pet-name">${pet[k].name}</div>
          <div class="pet-btn-wrapper">
          <button class="pet-btn">Learn more</button>
          </div>`;
    itemLeft.appendChild(card);
    }
 
    carousel.classList.add("transition-left");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  };
  



const moveRight = () => {
 
 
  

  console.log(cardPets)
  makeSlide()
  itemRight.innerHTML = "";
 for (let k of slide) {
    const card = document.createElement("div");
    card.classList.add("pet");
    card.id = 'p' + k;
    card.innerHTML = `
         <div class="pet-picture ${pet[k].name}"><img class="pet-picture-img" src="${pet[k].img}" alt = "pets"></div>
         <div class="pet-name">${pet[k].name}</div>
          <div class="pet-btn-wrapper">
          <button class="pet-btn">Learn more</button>
          </div>`;
    itemRight.appendChild(card);
    }
    carousel.classList.add("transition-right");
    btnLeft.removeEventListener("click", moveLeft);
    btnRight.removeEventListener("click", moveRight);
  
  };



btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);



carousel.addEventListener("animationend", (animationEvent) => {
    let changedItem = "";
    if (animationEvent.animationName === "move-left") {
      carousel.classList.remove("transition-left");
      changedItem = itemLeft;
    itemActive.innerHTML = itemLeft.innerHTML;
    } else {
      carousel.classList.remove("transition-right");
      changedItem = itemRight;
    itemActive.innerHTML = itemRight.innerHTML;
    }
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    cardPets = document.querySelectorAll(".pet");
    if (cardPets.length > 0) {
      for (let cardPet of cardPets) {
        cardPet.addEventListener("click", () => {
          let currentModal = cardPet.getAttribute("id").replace(/[a-zа-яё]/gi, '');
          openModalWindow(currentModal);
        });
      }
    }
  })



  //modal window


const modal = document.querySelector(".modal");
// const body = document.querySelector(".body");
let cardPets = document.querySelectorAll(".pet");
const modalContainer = document.querySelector(".modal-container");

let modalWrap = document.querySelector(".modal-wrapper")
let modalBtn = document.querySelector(".button-modal");


if (cardPets.length > 0) {
    for (let cardPet of cardPets) {
      cardPet.addEventListener("click", () => {
        let currentModal = cardPet.getAttribute("id").replace(/[a-zа-яё]/gi, '');
        openModalWindow(currentModal);
      });
    }
  }



  function openModalWindow (id) {
    
   modal.classList.add("open");
   
   let modalWrapper = `<div class="modal-wrapper">
     <div class="button-modal"></div>
    <div class="modal-container">
     <div class="modal-img"><img class="modal-img" src="${pet[id].img}" alt = "pets"/></div>
 <div class="modal-content">
  <div class="modal-title">
 <h3 class="modal-header">${pet[id].name}</h3>
  <h4 class="modal-subtitle">${pet[id].type} - ${pet[id].breed}</h4>
 </div>
  <h5 class="modal-text">${pet[id].description} </h5>
  <ul class="modal-list">
<li class="modal-item"><span class="span">Age: </span>${pet[id].age} </li>
  <li class="list-item"><span class="span">Inoculations:</span>${pet[id].inoculations} </li>
 <li class="list-item"> <span class="span">Diseases:</span>${pet[id].diseases}</li>
<li class="list-item"><span class="span">Parasites:</span>${pet[id].parasites}</li>
 </ul>
  </div>
</div>`;
modal.innerHTML = modalWrapper;
body.classList.add("active");
console.log(modal)
modalBtn = document.querySelector(".button-modal");
modal.addEventListener("click", (event) => {
  if ( event.target.classList.contains("modal")||
    event.target.classList.contains("modal-wrapper") || 
    event.target.classList.contains("button-modal")) 
    {
    closeModalWindow();
  }
});
  }


  console.log(modal)


 
  
  modal.addEventListener("mouseover", (event) => {
   
    if (
      event.target === event.currentTarget ||
      event.target.classList.contains("button-modal")
    ) {
      modalBtn.classList.add("active-modal");
    }
  });

  modal.addEventListener("mouseout", (event) => {
   
    if (event.target === event.currentTarget) {
      modalBtn.classList.remove("active-modal");
    }
  });




function closeModalWindow () {
  modal.classList.remove("open");
 body.classList.remove("active");
  modal.innerHTML = "";
}


