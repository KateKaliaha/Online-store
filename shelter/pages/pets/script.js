
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


//Burger

const btnBurger = document.querySelector('.burger');
const navWrapper = document.querySelector('.list');
const body = document.querySelector('.body');
const navList = document.querySelector('.nav-list');
const itemLink = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.link-logo')



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



     //modal window

     const modal = document.querySelector(".modal");
    //  const body = document.querySelector(".body");
     const modalContainer = document.querySelector(".modal-container");
     let cardPets = document.querySelectorAll(".pet");
     
     

let modalWrap = document.querySelector(".modal-wrapper");
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
        


// Pagination

    const btnCount = document.querySelector('.active-btn');
    const btnCountText = document.querySelector('.active-btn h4')
    const nextBtn = document.querySelector('.right-btn');
    const prevBtn = document.querySelector('.left-btn');
    const leftEndBtn = document.querySelector('.left-end');
    const rightEndBtn = document.querySelector('.right-end');
    const container = document.querySelector('.cards-content');
    let countItems = 8;
    let count = 1;
    let countOfPages = pet.length / countItems;



 //Random array
  let massivePets=[]
      if (window.innerWidth >= 1280) {
      function changeRandomPets(arr) {
          return arr
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
      }
      for (let i = 0; i < 6; i++) {
        massivePets.push(changeRandomPets(pet));
        }
      } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        function changeRandomPets(arr) {
          return arr
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          .slice(-6);
      }
      for (let i = 0; i < 8; i++) {
        massivePets.push(changeRandomPets(pet));
        }
      } else if (window.innerWidth < 768) {
        function changeRandomPets(arr) {
    
          return arr
          .map((a) => ({ sort: Math.random(), value: a }))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
          .slice(-3);
      }
      for (let i = 0; i < 16; i++) {
        massivePets.push(changeRandomPets(pet));
        }
      }
      massivePets = massivePets.flat();

// function start page

window.onload = () => {
  
  if (window.innerWidth >= 1280) {
    count = 1;
    let start = (count - 1) * countItems;
    let end = start + countItems;
    
    let pets = massivePets.slice(start, end);
    console.log(start)
    container.innerHTML = '';
    for (let item of pets) {
        const card = document.createElement("div");
       
        card.innerHTML = ` <div class="pet" id = "${item.id}">
        <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
        <div class="pet-name">${item.name}</div>
        <div class="pet-btn-wrapper">
            <button class="pet-btn">Learn more</button>
        </div>
        `
        container.appendChild(card);
}
    btnCountText.innerHTML = count;
} else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
  countItems = 6;
            count = 1;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
            
                card.innerHTML = `<div class="pet" id ="p${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>`
                container.appendChild(card);
}
btnCountText.innerHTML = count;
} else if (window.innerWidth < 768) {
  countItems = 3;
  count = 1;
  let start = (count - 1) * countItems;
  let end = start + countItems;
  
  let pets = massivePets.slice(start, end);
  console.log(start)
  container.innerHTML = '';
  for (let item of pets) {
      const card = document.createElement("div");
 
      card.innerHTML = ` <div class="pet" id ="p${item.id}">
      <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
      <div class="pet-name">${item.name}</div>
      <div class="pet-btn-wrapper">
          <button class="pet-btn">Learn more</button>
      </div>`
      container.appendChild(card);
}
btnCountText.innerHTML = count;
}
cardPets = document.querySelectorAll(".pet");
if (cardPets.length > 0) {
    for (let cardPet of cardPets) {
      cardPet.addEventListener("click", () => {
        let currentModal = cardPet.getAttribute("id").replace(/[a-zа-яё]/gi, '');
        openModalWindow(currentModal);
      });
    }
  }
}
    
  

// button right

        nextBtn.addEventListener('click', () => {
            
            if (window.innerWidth >= 1280) {
                count ++;
                let start = (count - 1) * countItems;
                let end = start + countItems;
                
                let pets = massivePets.slice(start, end);
                console.log(start)
                container.innerHTML = '';
                for (let item of pets) {
                    const card = document.createElement("div");
                 
                    card.innerHTML = `<div class="pet" id ="${item.id}">
                    <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                    <div class="pet-name">${item.name}</div>
                    <div class="pet-btn-wrapper">
                        <button class="pet-btn">Learn more</button>
                    </div>`
                    container.appendChild(card);
            }
                btnCountText.innerHTML = count;
        if (count > 1 && count < 6) {
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                prevBtn.removeAttribute('disabled');
                leftEndBtn.removeAttribute('disabled')
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active');
            } else if (count = 6) {
                nextBtn.setAttribute('disabled', true);
                nextBtn.classList.add('no-active');
                nextBtn.classList.remove('right-btn');
                rightEndBtn.setAttribute('disabled', true);
                rightEndBtn.classList.add('no-active');
                rightEndBtn.classList.remove('right-btn'); 
            }
            } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            countItems = 6;
            count ++;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
        
                card.innerHTML = `<div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>`
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
    if (count > 1 && count < 8) {
            prevBtn.classList.add('active-left-btn');
            prevBtn.classList.remove('no-active');
            prevBtn.removeAttribute('disabled');
            leftEndBtn.removeAttribute('disabled')
            leftEndBtn.classList.add('active-left-btn');
            leftEndBtn.classList.remove('no-active');
        } else if (count = 8) {
            nextBtn.setAttribute('disabled', true);
            nextBtn.classList.add('no-active');
            nextBtn.classList.remove('right-btn');
            rightEndBtn.setAttribute('disabled', true);
            rightEndBtn.classList.add('no-active');
            rightEndBtn.classList.remove('right-btn'); 
        }
        }  else if (window.innerWidth < 768) {
        countItems = 3;
        count ++;
        let start = (count - 1) * countItems;
        let end = start + countItems;
        
        let pets = massivePets.slice(start, end);
        console.log(start)
        container.innerHTML = '';
        for (let item of pets) {
            const card = document.createElement("div");
          
            card.innerHTML = ` <div class="pet" id ="${item.id}">
            <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
            <div class="pet-name">${item.name}</div>
            <div class="pet-btn-wrapper">
                <button class="pet-btn">Learn more</button>
            </div>`
            container.appendChild(card);
    }
        btnCountText.innerHTML = count;
    if (count > 1 && count < 16) {
        prevBtn.classList.add('active-left-btn');
        prevBtn.classList.remove('no-active');
        prevBtn.removeAttribute('disabled');
        leftEndBtn.removeAttribute('disabled')
        leftEndBtn.classList.add('active-left-btn');
        leftEndBtn.classList.remove('no-active');
    } else if (count = 16) {
        nextBtn.setAttribute('disabled', true);
        nextBtn.classList.add('no-active');
        nextBtn.classList.remove('right-btn');
        rightEndBtn.setAttribute('disabled', true);
        rightEndBtn.classList.add('no-active');
        rightEndBtn.classList.remove('right-btn'); 
    }
    }
    cardPets = document.querySelectorAll(".pet");
    if (cardPets.length > 0) {
        for (let cardPet of cardPets) {
          cardPet.addEventListener("click", () => {
            let currentModal = cardPet.getAttribute("id").replace(/[a-zа-яё]/gi, '');
            openModalWindow(currentModal);
          });
        }
      }
        }
        )

//button left
    
        prevBtn.addEventListener('click', () => {
            if (window.innerWidth >= 1280) {
            count --;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
              
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            if (count > 1 && count < 6) {
                nextBtn.removeAttribute('disabled')
                nextBtn.classList.add('right-btn');
                nextBtn.classList.remove('no-active');
                rightEndBtn.removeAttribute('disabled')
                rightEndBtn.classList.add('right-btn');
                rightEndBtn.classList.remove('no-active')
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active');
            } 
        else if (count = 1) {
            prevBtn.setAttribute('disabled', true)
                prevBtn.classList.add('no-active');
                prevBtn.classList.remove('active-left-btn');
                leftEndBtn.setAttribute('disabled', true)
                leftEndBtn.classList.add('no-active');
                leftEndBtn.classList.remove('active-left-btn');
            }
            } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
                countItems = 6;
            count --;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
             
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            if (count > 1 && count < 8) {
                nextBtn.removeAttribute('disabled')
                nextBtn.classList.add('right-btn');
                nextBtn.classList.remove('no-active');
                rightEndBtn.removeAttribute('disabled')
                rightEndBtn.classList.add('right-btn');
                rightEndBtn.classList.remove('no-active')
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active');
            } 
        else if (count = 1) {
            prevBtn.setAttribute('disabled', true)
                prevBtn.classList.add('no-active');
                prevBtn.classList.remove('active-left-btn');
                leftEndBtn.setAttribute('disabled', true)
                leftEndBtn.classList.add('no-active');
                leftEndBtn.classList.remove('active-left-btn');
            }
            } else if (window.innerWidth < 768) {
                countItems = 3;
                count --;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
           
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            if (count > 1 && count < 16) {
                nextBtn.removeAttribute('disabled')
                nextBtn.classList.add('right-btn');
                nextBtn.classList.remove('no-active');
                rightEndBtn.removeAttribute('disabled')
                rightEndBtn.classList.add('right-btn');
                rightEndBtn.classList.remove('no-active')
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active');
            } 
        else if (count = 1) {
            prevBtn.setAttribute('disabled', true)
                prevBtn.classList.add('no-active');
                prevBtn.classList.remove('active-left-btn');
                leftEndBtn.setAttribute('disabled', true)
                leftEndBtn.classList.add('no-active');
                leftEndBtn.classList.remove('active-left-btn');
            }
            }
            cardPets = document.querySelectorAll(".pet");
            if (cardPets.length > 0) {
                for (let cardPet of cardPets) {
                  cardPet.addEventListener("click", () => {
                    let currentModal = cardPet.getAttribute("id").replace(/[a-zа-яё]/gi, '');
                    openModalWindow(currentModal);
                  });
                }
              }
        }
        )


// common button right

        rightEndBtn.addEventListener('click', () => {
            if (window.innerWidth >= 1280) {
                count = 6;
                let start = (count - 1) * countItems;
                let end = start + countItems;
                
                let pets = massivePets.slice(start, end);
                console.log(start)
                container.innerHTML = '';
                for (let item of pets) {
                    const card = document.createElement("div");
                 
                    card.innerHTML = ` <div class="pet" id ="${item.id}">
                    <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                    <div class="pet-name">${item.name}</div>
                    <div class="pet-btn-wrapper">
                        <button class="pet-btn">Learn more</button>
                    </div>
                    `
                    container.appendChild(card);
            }
                btnCountText.innerHTML = count;
                nextBtn.setAttribute('disabled', true);
                nextBtn.classList.add('no-active');
                nextBtn.classList.remove('right-btn');
                rightEndBtn.setAttribute('disabled', true);
                rightEndBtn.classList.add('no-active');
                rightEndBtn.classList.remove('right-btn'); 
                
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                prevBtn.removeAttribute('disabled');
                leftEndBtn.removeAttribute('disabled')
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active')  
            } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
                count = 8;
                countItems = 6;
                let start = (count - 1) * countItems;
                let end = start + countItems;
                
                let pets = massivePets.slice(start, end);
                console.log(start)
                container.innerHTML = '';
                for (let item of pets) {
                    const card = document.createElement("div");
              
                    card.innerHTML = ` <div class="pet" id ="${item.id}">
                    <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                    <div class="pet-name">${item.name}</div>
                    <div class="pet-btn-wrapper">
                        <button class="pet-btn">Learn more</button>
                    </div>
                    `
                    container.appendChild(card);
            }
                btnCountText.innerHTML = count;
                nextBtn.setAttribute('disabled', true);
                nextBtn.classList.add('no-active');
                nextBtn.classList.remove('right-btn');
                rightEndBtn.setAttribute('disabled', true);
                rightEndBtn.classList.add('no-active');
                rightEndBtn.classList.remove('right-btn'); 
                
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                prevBtn.removeAttribute('disabled');
                leftEndBtn.removeAttribute('disabled')
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active')  
            } else if (window.innerWidth < 768) {
                count = 16;
                countItems = 3;
                let start = (count - 1) * countItems;
                let end = start + countItems;
                
                let pets = massivePets.slice(start, end);
                console.log(start)
                container.innerHTML = '';
                for (let item of pets) {
                    const card = document.createElement("div");
                  
                    card.innerHTML = ` <div class="pet" id ="${item.id}">
                    <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                    <div class="pet-name">${item.name}</div>
                    <div class="pet-btn-wrapper">
                        <button class="pet-btn">Learn more</button>
                    </div>
                    `
                    container.appendChild(card);
            }
                btnCountText.innerHTML = count;
                nextBtn.setAttribute('disabled', true);
                nextBtn.classList.add('no-active');
                nextBtn.classList.remove('right-btn');
                rightEndBtn.setAttribute('disabled', true);
                rightEndBtn.classList.add('no-active');
                rightEndBtn.classList.remove('right-btn'); 
                
                prevBtn.classList.add('active-left-btn');
                prevBtn.classList.remove('no-active');
                prevBtn.removeAttribute('disabled');
                leftEndBtn.removeAttribute('disabled')
                leftEndBtn.classList.add('active-left-btn');
                leftEndBtn.classList.remove('no-active')  
            }
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
    

// common button left
        leftEndBtn.addEventListener('click', () => {
            if (window.innerWidth >= 1280) {
            count = 1;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
              
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            prevBtn.setAttribute('disabled', true)
            prevBtn.classList.add('no-active');
            prevBtn.classList.remove('active-left-btn');
            leftEndBtn.setAttribute('disabled', true)
            leftEndBtn.classList.add('no-active');
            leftEndBtn.classList.remove('active-left-btn');

            nextBtn.removeAttribute('disabled')
            nextBtn.classList.add('right-btn');
            nextBtn.classList.remove('no-active');
            rightEndBtn.classList.add('right-btn');
            rightEndBtn.classList.remove('no-active')
            rightEndBtn.removeAttribute('disabled')
    } else if (window.innerWidth >= 768 && window.innerWidth < 1280) {
            count = 1;
            countItems = 6;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
             
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            prevBtn.setAttribute('disabled', true)
            prevBtn.classList.add('no-active');
            prevBtn.classList.remove('active-left-btn');
            leftEndBtn.setAttribute('disabled', true)
            leftEndBtn.classList.add('no-active');
            leftEndBtn.classList.remove('active-left-btn');

            nextBtn.removeAttribute('disabled')
            nextBtn.classList.add('right-btn');
            nextBtn.classList.remove('no-active');
            rightEndBtn.classList.add('right-btn');
            rightEndBtn.classList.remove('no-active')
            rightEndBtn.removeAttribute('disabled')
    } else if (window.innerWidth < 768) {
        count = 1;
            countItems = 3;
            let start = (count - 1) * countItems;
            let end = start + countItems;
            
            let pets = massivePets.slice(start, end);
            console.log(start)
            container.innerHTML = '';
            for (let item of pets) {
                const card = document.createElement("div");
                card.innerHTML = ` <div class="pet" id ="${item.id}">
                <div class="pet-picture ${item.name}"><img class="pet-picture-img" src="${item.img}" alt = "pets"></div>
                <div class="pet-name">${item.name}</div>
                <div class="pet-btn-wrapper">
                    <button class="pet-btn">Learn more</button>
                </div>
                `
                container.appendChild(card);
        }
            btnCountText.innerHTML = count;
            prevBtn.setAttribute('disabled', true)
            prevBtn.classList.add('no-active');
            prevBtn.classList.remove('active-left-btn');
            leftEndBtn.setAttribute('disabled', true)
            leftEndBtn.classList.add('no-active');
            leftEndBtn.classList.remove('active-left-btn');

            nextBtn.removeAttribute('disabled')
            nextBtn.classList.add('right-btn');
            nextBtn.classList.remove('no-active');
            rightEndBtn.classList.add('right-btn');
            rightEndBtn.classList.remove('no-active')
            rightEndBtn.removeAttribute('disabled')
    }
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





 
         
         