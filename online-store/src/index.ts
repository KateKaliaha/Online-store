import './style.css';
import './app/slider';
import './app/search';
import './app/sort';
import * as Goods from './goods.json';

const goods= Goods.chairs;
const content:Element | null = document.querySelector('.content');


function createDocument ():void {
for (let i = 0; i < goods.length; i++) {
  const fragment:HTMLDivElement = document.createElement('div');
  fragment.className = 'card';
fragment.setAttribute('data-price', `${goods[i].price}`);
fragment.setAttribute('data-name', `${goods[i].name}`);
  fragment.innerHTML = ` <div class="good-picture"><img class="good-picture-img" src="${goods[i].img}" alt = "Type of chair"></div>
  <div class="good-content">
  <h3 class="good-name">${goods[i].name}</h3>
  <p> продавец: ${goods[i].seller}</p>
  <p>стоимость: ${goods[i].price} BYN</p>
  <p>${goods[i].type}, сиденье: ${goods[i].seat}, каркас: ${goods[i].frame}</p>
  <p>цвет: ${goods[i].color}</p>
  <p>остаток на складе: ${goods[i].quality}шт.</p>
  <p class="popular-good"></p>
  </div>
   <div class="good-btn-wrapper">
   <button class="good-btn btn">Добавить в корзину</button>
   </div>`;
   if (goods[i].popular) {
     const p = fragment.querySelector('.popular-good');
     if(p) {
      p.innerHTML = 'Выбор покупателей';
     }
   }
   if (content) {
    content.appendChild(fragment);
  }
}
}


createDocument();