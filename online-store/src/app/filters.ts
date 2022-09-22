import {Chair} from './interfaces';
import { renderContent, content, catalogGoods} from './content';
import { arrMinMaxSliders, changeStyles} from './slider';
import { getSort, arrSortValue, select} from './sort';
import { getSearchList, searchInput, input} from './search';
import { addEvent, findActiveCards, drawQualityGoods, countGoodsBasket, applyChangeInBasket} from './basket';

export const filters = document.querySelectorAll('.filter-checkbox'); // all filters checkbox
export let btnBuyGoods: NodeListOf<Element>;

const localStorageArrSellers = JSON.parse(localStorage.getItem('arrSellers') as string);
const localStorageArrTypeChair = JSON.parse(localStorage.getItem('arrTypeChair') as string);
const localStorageArrColors = JSON.parse(localStorage.getItem('arrColors') as string);
const localStorageArrPopular = JSON.parse(localStorage.getItem('arrPopular') as string);

export const filterSliderPrice:Array<string> = [];
export const arrSellers:Array<string> = localStorageArrSellers || [];
export const arrTypeChair:Array<string> = localStorageArrTypeChair || [];
export const arrColors:Array<string> = localStorageArrColors || [];
export const arrPopular:Array<string> = localStorageArrPopular || [];

export let filteredGoods:Array<Chair> = JSON.parse(localStorage.getItem('arrAllFilters') as string) || []; // array after filter
export let arrAllFilters:Array<Chair> = JSON.parse(localStorage.getItem('arrAllFilters') as string) || []; // array with after filters

export function getActiveFilters() {
  filters.forEach( (filter) => filter.addEventListener ('change', event => {
    const input = event.target as HTMLInputElement; //checkbox
    const inputName = input.name as string; //checkbox name ('seller', 'typeChair', 'colorType', 'popular')
    const inputValue = input.value as string; //checkbox value

    if (input.checked) {
      if (inputName === 'seller') {
        arrSellers.push(inputValue);
      }

      if (inputName === 'typeChair') {
        arrTypeChair.push(inputValue);
      }

      if (inputName === 'colorType') {
        arrColors.push(inputValue);
      }

      if (inputName === 'popular') {
        arrPopular.push(inputValue);
      }

      getAllFilters();
    }

    if (!input.checked) {
      if (inputName === 'seller') {
        arrSellers.splice(arrSellers.indexOf(inputValue), 1);
      }

      if (inputName === 'typeChair') {
        arrTypeChair.splice(arrTypeChair.indexOf(inputValue), 1);
      }

      if (inputName === 'colorType') {
        arrColors.splice(arrColors.indexOf(inputValue), 1);
      }

      if (inputName === 'popular') {
        arrPopular.splice(arrPopular.indexOf(inputValue), 1);
      }

      getAllFilters();
    }

    setLocalStorage();
  }));
}

export function resetArrAllFilters() {
  filteredGoods = catalogGoods;
  arrAllFilters = catalogGoods;
  localStorage.setItem('filteredGoods', JSON.stringify(filteredGoods));
  localStorage.setItem('arrAllFilters', JSON.stringify(arrAllFilters));
}

export function getFilterList(goods:Array<Chair>) {
  filteredGoods = [];

  goods.forEach( (good) => {
    const filterSellers = arrSellers.length === 0 || arrSellers.includes(good.seller);
    const filterTypes = arrTypeChair.length === 0 || arrTypeChair.includes(good.typeChair);
    const filterColors = arrColors.length === 0 || arrColors.includes(good.colorType);
    const filterPopular = arrPopular.length === 0 || arrPopular.includes(good.popular);

    if (filterSellers && filterTypes && filterColors && filterPopular) {
        filteredGoods.push(good);
    }
  });

  filteredGoods = filteredGoods.filter((good) => (arrMinMaxSliders[0] <= good.quality
                                && good.quality <= arrMinMaxSliders[1]
                                && arrMinMaxSliders[2] <= good.price
                                && good.price <= arrMinMaxSliders[3]));

  localStorage.setItem('arrAllFilters', JSON.stringify(filteredGoods));

  return filteredGoods;
}

export function getAllFilters() {
  getFilterList(catalogGoods);
  arrAllFilters = filteredGoods;

  if (searchInput !== '') {
    input.dispatchEvent(new Event('input'));
    arrAllFilters = getSearchList(searchInput, filteredGoods);
  }

  if (arrSortValue.length !== 0) {
    select.dispatchEvent(new Event('change'));
    getSort(arrSortValue);
  }

  renderContent(arrAllFilters, content);
  changeStyles(arrAllFilters.length);
  addEvent();
  findActiveCards();
  localStorage.setItem('arrAllFilters', JSON.stringify(arrAllFilters));
}

export function findButton() {
  btnBuyGoods = document.querySelectorAll('.good-btn');
}

export function setLocalStorage() {
  localStorage.setItem('arrSellers', JSON.stringify(arrSellers));
  localStorage.setItem('arrTypeChair', JSON.stringify(arrTypeChair));
  localStorage.setItem('arrColors', JSON.stringify(arrColors));
  localStorage.setItem('arrPopular', JSON.stringify(arrPopular));
}

function findActiveCheckbox() {
  filters.forEach((filter) => (filter as HTMLInputElement).dispatchEvent(new Event('change')));

  getLocalStorageGoods (localStorageArrSellers, arrSellers);
  getLocalStorageGoods (localStorageArrTypeChair, arrTypeChair);
  getLocalStorageGoods (localStorageArrColors, arrColors);
  getLocalStorageGoods (localStorageArrPopular, arrPopular);

  if (JSON.parse(localStorage.getItem('arrAllFilters') as string)) {
    if (JSON.parse(localStorage.getItem('arrSortValue') as string)) {
      renderContent(getSort(arrSortValue) as Chair[], content);
    } else {
      renderContent(arrAllFilters, content);
    }

    if (arrSortValue[0] === 'price-up') {
      select.selectedIndex = 3;
    }

    if (arrSortValue[0] === 'price-down') {
      select.selectedIndex = 4;
    }
    if (arrSortValue[0] === 'alphabet-up') {
      select.selectedIndex = 1;
    }

    if (arrSortValue[0] === 'alphabet-down') {
      select.selectedIndex = 2;
    }

    if (arrSortValue[0] === 'empty') {
      select.selectedIndex = 0;
    }

    if (arrAllFilters.length === 0) {
      (document.querySelector('.phrase') as HTMLSpanElement).style.display = 'block';
      (document.querySelector('.content') as HTMLElement).style.display = 'none';
    } else {
      (document.querySelector('.phrase') as HTMLSpanElement).style.display = '';
      (document.querySelector('.content') as HTMLElement).style.display = '';
    }
  }

  drawQualityGoods(countGoodsBasket);

  if (JSON.parse(localStorage.getItem('listBasketGoods') as string)) {
    findActiveCards();
    addEvent();
  }

  addEvent();
  applyChangeInBasket (document.querySelectorAll('.good-btn'));
  findButton();
}

function getLocalStorageGoods(localStorageFilterArray: string, filterArray: Array<string>) {
  if (localStorageFilterArray) {
    filters.forEach((filter) => {
      filterArray.filter((good) => {
        if (good === (filter as HTMLInputElement).value) {
          (filter as HTMLInputElement).checked = true;
        }
      });
    });
  }
}

findActiveCheckbox();

getActiveFilters();