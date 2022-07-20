import * as Goods from '../goods.json';
import { Chairs } from './interfaces';
// import { changeStyles } from './slider';

export const goods:Array<Chairs>= Goods.chairs;
export const goodsCopy = [...goods];
export const content = document.querySelector('.content') as HTMLElement;

export function renderContent(_goods: Array<Chairs>,el=document.body): void {
  el.innerHTML='';
  _goods.forEach(i=>{
    const fragment:HTMLDivElement = document.createElement('div');
    fragment.setAttribute('data-price', `${i.price}`);
    fragment.setAttribute('data-name', `${i.name}`);
    fragment.className = 'card';
    fragment.innerHTML = ` <div class="good-picture">
                          <img class="good-picture-img" src="${i.img}" alt = "Type of chair">
                          </div>
                          <div class="good-content">
                          <h3 class="good-name">${i.name}</h3>
                          <p> продавец: ${i.seller}</p>
                          <p>стоимость: ${i.price} BYN</p>
                          <p>${i.type}, сиденье: ${i.seat}, каркас: ${i.frame}</p>
                          <p>цвет: ${i.color}</p>
                          <p>остаток на складе: ${i.quality}шт.</p>
                          <p class="popular-good"></p>
                          </div>
                          <button class="good-btn btn">Добавить в корзину</button>`;
    if (i.popular === 'true') {
      const p = fragment.querySelector('.popular-good');
      if(p) {
        p.innerHTML = 'Выбор покупателей';
      }
    }
    el.appendChild(fragment);
  });
}

renderContent(goods,content);
