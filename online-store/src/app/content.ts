import * as Goods from '../goods.json';
import { Chair } from './interfaces';

export const goods:Array<Chair>= Goods.chairs;
export const catalogGoods = [...goods];
export const content = document.querySelector('.content') as HTMLElement;

export function renderContent(_goods: Array<Chair>, wrapperForContent = document.body): void {
  wrapperForContent.innerHTML='';

  _goods.forEach((good) => {
    const fragment:HTMLDivElement = document.createElement('div');
    fragment.setAttribute('data-price', `${good.price}`);
    fragment.setAttribute('data-name', `${good.name}`);
    fragment.className = 'card';
    fragment.innerHTML = ` <div class="good-picture">
                          <img class="good-picture-img" src="${good.img}" alt = "Type of chair">
                          </div>
                          <div class="good-content">
                          <h3 class="good-name">${good.name}</h3>
                          <p>продавец: ${good.seller}</p>
                          <p>стоимость: ${good.price} BYN</p>
                          <p>${good.type}, сиденье: ${good.seat}, каркас: ${good.frame}</p>
                          <p>цвет: ${good.color}</p>
                          <p>остаток на складе: ${good.quality}шт.</p>
                          <p class="popular-good"></p>
                          </div>
                          <button class="good-btn btn">Добавить в корзину</button>`;

    if (good.popular === 'true') {
      const paragraphPopular = fragment.querySelector('.popular-good');
      if(paragraphPopular) {
        paragraphPopular.innerHTML = 'Выбор покупателей';
      }
    }

    wrapperForContent.appendChild(fragment);
  });
}

renderContent(goods,content);
