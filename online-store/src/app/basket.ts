const btnBuyGoods = document.querySelectorAll('.good-btn');
export let countGoodsBasket = 0;
const boxCountGoods = document.querySelector('.basket-counter') as HTMLDivElement;
export const listBasketGoods: Array<string> = [];
function addGoodsFromBasket (btnText: HTMLButtonElement) {
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

btnBuyGoods.forEach((el) => el.addEventListener('click', e => {
  const btnCard = e.target as HTMLButtonElement;
  if (countGoodsBasket < 20){
    toggleClassList(btnCard);
    if (btnCard.classList.contains('active-btn') && countGoodsBasket < 20){
      addGoodsFromBasket(btnCard);
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
}));





