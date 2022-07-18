import {Chairs} from './interfaces';
import { renderContent, content, goodsCopy} from './content';
import { arrMinMaxSliders, changeStyles} from './slider';
import { getSort, arrSortValue, select } from './sort';
import { getSearchList, searchInput, input } from './search';
import { getChangeInBasket, findActiveCards } from './basket';


export const filters = document.querySelectorAll('.filter-checkbox'); // all filters checkbox
export let btnBuyGoods: NodeListOf<Element>;

// arrays from value checkboxes
export const arrSellers:Array<string> = [];
export const arrTypeChair:Array<string> = [];
// export const arrTypeChair:Array<string> = JSON.parse(localStorage.getItem('arrTypeChair') as string) || [];
export const arrColors:Array<string> = [];
export const arrPopular:Array<string> = [];
export const filterSliderPrice:Array<string> = [];
// export const filterQuality:Chairs[] =[];

export let newArr:Array<Chairs> = []; // array after filter
export let arrAllFilters:Array<Chairs> = []; // array with after filters


function getActiveFilters () {
  filters.forEach((element) => element.addEventListener ('change', e => {
    const input = e.target as HTMLInputElement; //checkbox
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
  }));
  changeInputStyle();
}

export function getFilterList(arr:Array<Chairs>) {
  newArr = [];
  arr.forEach((el) => {
    const filterSellers = arrSellers.length === 0 || arrSellers.filter((item) => item === el.seller);
    const filterTypes = arrTypeChair.length === 0 || arrTypeChair.filter((item) => item === el.typeChair);
    const filterColors = arrColors.length === 0 || arrColors.filter((item) => item === el.colorType);
    const filterPopular = arrPopular.length === 0 || arrPopular.filter((item) => item === el.popular);
    if ((filterSellers as Array<string>).length !== 0
      && (filterTypes as Array<string>).length !== 0 
      && (filterColors as Array<string>).length !== 0 
      && (filterPopular as Array<string>).length !== 0 
      && filterSellers && filterTypes && filterColors
      && filterPopular) {
        newArr.push(el);
    }
  });
  newArr = newArr.filter(item => (arrMinMaxSliders[0] <= item.quality 
    && item.quality <= arrMinMaxSliders[1] && arrMinMaxSliders[2] <= item.price && item.price <= arrMinMaxSliders[3]));
  changeStyles(newArr.length);
  return newArr;
}

export function getAllFilters() {
  getFilterList(goodsCopy);
  arrAllFilters = newArr;
    if (searchInput !== '') {
      input.dispatchEvent(new Event('input'));
      arrAllFilters = getSearchList(searchInput, newArr);
  }
  if (arrSortValue.length !== 0) {
    select.dispatchEvent(new Event('change'));
    getSort(arrSortValue);
  }
  changeStyles(arrAllFilters.length);
  renderContent(arrAllFilters, content);
  getChangeInBasket();
  findActiveCards();
  localStorage.setItem('arrSellers', JSON.stringify(arrSellers));
  localStorage.setItem('arrTypeChair', JSON.stringify(arrTypeChair));
  localStorage.setItem('arrColors', JSON.stringify(arrColors));
  localStorage.setItem('arrPopular', JSON.stringify(arrPopular));
}


export function findButton () {
  btnBuyGoods = document.querySelectorAll('.good-btn');
}

function changeInputStyle () {
  if (JSON.parse(localStorage.getItem('arrTypeChair') as string) !== 0) {
    filters.forEach ((checkbox) => {
    const activeCheckbox = arrTypeChair.filter((item) => item === (checkbox as HTMLInputElement).value);
      if (activeCheckbox.length !== 0 ) {
        (checkbox as HTMLInputElement).checked = true;
      }
    });
  }
}

getActiveFilters ();
// window.addEventListener('load', getLocalStorage);
