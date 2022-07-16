let countGoodsBasket = 0;
const boxCountGoods = document.querySelector('.basket-counter') as HTMLDivElement;
const listBasketGoods: Array<string> = [];

function addGoodsToBasket (btnText: HTMLButtonElement) {
  btnText.innerHTML = 'Удалить из корзины';
  countGoodsBasket = countGoodsBasket + 1;
  listBasketGoods.push(((btnText.parentNode as HTMLDivElement).getAttribute('data-name'))as string);
}

function removeGoodsFromBasket (btnText: HTMLButtonElement) {
  btnText.innerHTML = 'Добавить в корзину';
  countGoodsBasket = countGoodsBasket - 1;
  listBasketGoods.splice(listBasketGoods.indexOf(((btnText.parentNode as HTMLDivElement).getAttribute('data-name'))as string), 1);
}

function toggleClassList(btnText: HTMLButtonElement) {
  btnText.classList.toggle('active-btn');
  (btnText.parentNode as HTMLDivElement).classList.toggle('active-card');
}

function drawQualityGoods (data:number) {
  if (data > 0 && data <=20) {
    boxCountGoods.style.display = 'block';
    boxCountGoods.innerHTML = `${data}`;
  } else if (data === 0){
    boxCountGoods.style.display = 'none';
  }
}

export function getChangeInBasket () {
  const btnBuyGoods = document.querySelectorAll('.good-btn');
  btnBuyGoods.forEach((el) => el.addEventListener('click', e => {
    const btnCard = e.target as HTMLButtonElement;
    if (countGoodsBasket < 20){
      toggleClassList(btnCard);
      if (btnCard.classList.contains('active-btn') && countGoodsBasket < 20){
        addGoodsToBasket(btnCard);
        drawQualityGoods(countGoodsBasket);
      } else if (!btnCard.classList.contains('active-btn') && countGoodsBasket < 20){
        removeGoodsFromBasket(btnCard);
        drawQualityGoods(countGoodsBasket);
      }
    } else if (!btnCard.classList.contains('active-btn') && countGoodsBasket === 20) {
        alert('Корзина переполнена! Допускается не более 20 штук!');
    } else if (btnCard.classList.contains('active-btn') && countGoodsBasket === 20){
      toggleClassList(btnCard);
      removeGoodsFromBasket(btnCard);
      drawQualityGoods(countGoodsBasket);
    }
    findActiveCards();
  }));
}

getChangeInBasket();


export function findActiveCards() {
  const cards = document.querySelectorAll('.card');
  if (listBasketGoods.length !== 0) {
    cards.forEach((card) => {
      const goodsInBasket = listBasketGoods.filter((el) => el === card.getAttribute('data-name'));
      if (goodsInBasket.length !== 0) {
        card.classList.add('active-card');
        const cardButtton = card.querySelector('.good-btn') as HTMLButtonElement;
        cardButtton.classList.add('active-btn');
        cardButtton.innerHTML = 'Удалить из корзины';
      }
    });
  }
}