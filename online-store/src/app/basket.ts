
export let countGoodsBasket = Number (JSON.parse(localStorage.getItem('countGoodsBasket') as string)) || 0;
const boxCountGoods = document.querySelector('.basket-counter') as HTMLDivElement;
let listBasketGoods: Array<string> = JSON.parse(localStorage.getItem('listBasketGoods') as string) || [];

function addGoodsToBasket (btnText: HTMLButtonElement) {
  btnText.innerHTML = 'Удалить из корзины';
  countGoodsBasket = countGoodsBasket + 1;
  listBasketGoods.push(((btnText.parentNode as HTMLDivElement).getAttribute('data-name'))as string);
  localStorage.setItem('countGoodsBasket', JSON.stringify(countGoodsBasket));
  localStorage.setItem('listBasketGoods', JSON.stringify(listBasketGoods));
}

function removeGoodsFromBasket (btnText: HTMLButtonElement) {
  btnText.innerHTML = 'Добавить в корзину';
  countGoodsBasket = countGoodsBasket - 1;
  listBasketGoods.splice(listBasketGoods.indexOf(((btnText.parentNode as HTMLDivElement).getAttribute('data-name'))as string), 1);
  localStorage.setItem('countGoodsBasket', JSON.stringify(countGoodsBasket));
  localStorage.setItem('listBasketGoods', JSON.stringify(listBasketGoods));
}

function toggleClassList(btnText: HTMLButtonElement) {
  btnText.classList.toggle('active-btn');
  (btnText.parentNode as HTMLDivElement).classList.toggle('active-card');
}

export function drawQualityGoods (data:number) {
  if (data > 0 && data <=20) {
    boxCountGoods.style.display = 'block';
    boxCountGoods.innerHTML = `${data}`;
  } else if (data === 0){
    boxCountGoods.style.display = 'none';
  }
}

export function getChangeInBasket (btns:NodeListOf<Element>) {
  btns.forEach((el) => el.addEventListener('click', e => {
    console.log('hi');
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

export function resetBasket () {
  countGoodsBasket = 0;
  listBasketGoods = [];
  boxCountGoods.innerHTML = '';
  boxCountGoods.style.display = 'none';
  addEvent();
  findActiveCards();
}

export function addEvent () {
  getChangeInBasket (document.querySelectorAll('.good-btn'));
  findActiveCards();
}

getChangeInBasket (document.querySelectorAll('.good-btn'));
addEvent ();