import * as Goods from '../goods.json';
import { Chairs } from './interfaces';
// import { listBasketGoods} from './basket';

export const goods:Array<Chairs>= Goods.chairs;
export const content = document.querySelector('.content') as HTMLElement;


export function renderContent(_goods: Array<Chairs>,el=document.body): void {
  el.innerHTML='';
  _goods.forEach(i=>{
    const fragment:HTMLDivElement = document.createElement('div');
    fragment.className = 'card';
    fragment.setAttribute('data-price', `${i.price}`);
    fragment.setAttribute('data-name', `${i.name}`);
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
    // if (listBasketGoods.length !== 0) {
    //   const c = listBasketGoods.length === 0 || listBasketGoods.filter((item) => item === fragment.getAttribute(('data-name')as string));
    //   if (c) {
    //     console.log(c);
    //   }
    // }
    el.appendChild(fragment);
  });
}

renderContent(goods,content);