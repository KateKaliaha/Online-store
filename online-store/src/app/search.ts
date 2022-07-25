import {Chair} from './interfaces';
import { catalogGoods} from './content';
import { getAllFilters,arrAllFilters} from './filters';
import {changeStyles} from './slider';

export const input= document.getElementById('search-input') as HTMLInputElement;
let arrSearch: Array<Chair> = [];
export let searchInput:string = (localStorage.getItem('searchValue') as string) || '';

if (localStorage.getItem('searchValue')) {
  input.innerHTML = localStorage.getItem('searchValue') as string;
}

input.addEventListener('input', (event) => {
  const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  searchInput = searchValue;
  getSearchList(searchInput, arrAllFilters);
  getAllFilters();
  localStorage.setItem('searchValue', input.value);
  return searchInput;
});

export function getSearchList(inputText:string, goodsArray: Array<Chair>) {
  arrSearch = [];

  if (goodsArray.length === 0) {
    goodsArray = catalogGoods;

    if (inputText !== '') {
      goodsArray.forEach((good) => {
        if (good.name.toLowerCase().includes(inputText.toLowerCase())) {
          arrSearch.push(good);
        }
      });
    }

    if (inputText === '') {
      arrSearch = goodsArray;
    }

  } else if (goodsArray.length !== 0) {
    if (inputText !== '') {
      goodsArray.forEach((good) => {
        if (good.name.toLowerCase().includes(inputText.toLowerCase())) {
          arrSearch.push(good);
        }
      });
    }

    if (inputText === '') {
      arrSearch = goodsArray;
    }
  }

  if ((goodsArray.filter((good) => arrSearch.includes(good))).length === 0) {
    changeStyles((goodsArray.filter((good) => arrSearch.includes(good))).length);
  }

  return goodsArray.filter((good) => arrSearch.includes(good));
}

input.addEventListener('search', () => {
  input.dispatchEvent(new Event('input'));
  getAllFilters();
});
