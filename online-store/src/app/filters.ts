import {Chairs} from './interfaces';
import { renderContent, content, goodsCopy} from './content';
import { arrMinMaxSliders, changeStyles} from './slider';
import { getSort, arrSortValue, select} from './sort';
import { getSearchList, searchInput, input} from './search';
import { addEvent, findActiveCards, drawQualityGoods, countGoodsBasket, getChangeInBasket} from './basket';


export const filters = document.querySelectorAll('.filter-checkbox'); // all filters checkbox
export let btnBuyGoods: NodeListOf<Element>;

// arrays from value checkboxes
export const arrSellers:Array<string> = JSON.parse(localStorage.getItem('arrSellers') as string) || [];
export const arrTypeChair:Array<string> = JSON.parse(localStorage.getItem('arrTypeChair') as string) || [];
export const arrColors:Array<string> = JSON.parse(localStorage.getItem('arrColors') as string) || [];
export const arrPopular:Array<string> = JSON.parse(localStorage.getItem('arrPopular') as string) || [];
export const filterSliderPrice:Array<string> = [];


export let newArr:Array<Chairs> = JSON.parse(localStorage.getItem('arrAllFilters') as string) || []; // array after filter
export let arrAllFilters:Array<Chairs> = JSON.parse(localStorage.getItem('arrAllFilters') as string) || []; // array with after filters

export function getActiveFilters () {
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
    setLocalStorage ();
  }));
}

export function resetArrAllFilters () {
  newArr = goodsCopy;
  arrAllFilters = goodsCopy;
  localStorage.setItem('newArr', JSON.stringify(newArr));
  localStorage.setItem('arrAllFilters', JSON.stringify(arrAllFilters));
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
  newArr = newArr.filter(item => (arrMinMaxSliders[0] <= item.quality && item.quality <= arrMinMaxSliders[1]
                                && arrMinMaxSliders[2] <= item.price && item.price <= arrMinMaxSliders[3]));
  localStorage.setItem('newArr', JSON.stringify(newArr));
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
  renderContent(arrAllFilters, content);
  changeStyles(arrAllFilters.length);
  addEvent ();
  findActiveCards();
  localStorage.setItem('arrAllFilters', JSON.stringify(arrAllFilters));
}

export function findButton () {
  btnBuyGoods = document.querySelectorAll('.good-btn');
}

export function setLocalStorage () {
  localStorage.setItem('arrSellers', JSON.stringify(arrSellers));
  localStorage.setItem('arrTypeChair', JSON.stringify(arrTypeChair));
  localStorage.setItem('arrColors', JSON.stringify(arrColors));
  localStorage.setItem('arrPopular', JSON.stringify(arrPopular));
}


function findActiveCheckbox () {
  filters.forEach((filter) => (filter as HTMLInputElement).dispatchEvent(new Event('change')));
  if (JSON.parse(localStorage.getItem('arrSellers')as string)) {
    filters.forEach((filter) => {
      arrSellers.filter((item) => {
        if( item === (filter as HTMLInputElement).value) {
          (filter as HTMLInputElement).checked = true;
        }
    });
      }
  );
  }
  if (JSON.parse(localStorage.getItem('arrTypeChair')as string)) {
    filters.forEach((filter) => {
      arrTypeChair.filter((item) => {
        if( item === (filter as HTMLInputElement).value) {
          (filter as HTMLInputElement).checked = true;
        }
    });
      }
  );
  }
  if (JSON.parse(localStorage.getItem('arrColors')as string)) {
    filters.forEach((filter) => {
      arrColors.filter((item) => {
        if( item === (filter as HTMLInputElement).value) {
          (filter as HTMLInputElement).checked = true;
        }
    });
      }
  );
  }
  if (JSON.parse(localStorage.getItem('arrPopular')as string)) {
    filters.forEach((filter) => {
      arrPopular.filter((item) => {
        if( item === (filter as HTMLInputElement).value) {
          (filter as HTMLInputElement).checked = true;
        }
    });
      }
  );
}
if (JSON.parse(localStorage.getItem('arrAllFilters') as string)) {
  if (JSON.parse(localStorage.getItem('arrSortValue') as string)) {
    renderContent(getSort(arrSortValue) as Chairs[], content);
  } else {
    renderContent(arrAllFilters, content);
  }
  if(arrSortValue[0] === 'price-up') {
    select.selectedIndex = 3;
  }
  if(arrSortValue[0] === 'price-down') {
    select.selectedIndex = 4;
  }
  if(arrSortValue[0] === 'alphabet-up') {
    select.selectedIndex = 1;
  }
  if(arrSortValue[0] === 'alphabet-down') {
    select.selectedIndex = 2;
  }
  if(arrSortValue[0] === 'empty') {
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
getChangeInBasket (document.querySelectorAll('.good-btn'));
findButton();
console.log(newArr, arrAllFilters);
}


findActiveCheckbox();


getActiveFilters ();