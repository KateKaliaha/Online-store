import {Chairs} from './interfaces';
import { goodsCopy} from './content';
import { getAllFilters,arrAllFilters} from './filters';
import {changeStyles} from './slider';


export const input= document.getElementById('q') as HTMLInputElement;
let arrSearch: Array<Chairs> = [];
if (localStorage.getItem('searchValue') ) {
  input.innerHTML = localStorage.getItem('searchValue') as string;
}

export let searchInput:string = (localStorage.getItem('searchValue') as string) || '';
input.addEventListener('input', (event) => {
  const searchValue =(event.target as HTMLInputElement).value.toLowerCase();
  searchInput = searchValue;
  getSearchList(searchInput, arrAllFilters);
  getAllFilters();
  localStorage.setItem('searchValue', input.value);
  return searchInput;
});

export function getSearchList (value:string, arr: Array<Chairs>) {
  arrSearch = [];
  if (arr.length === 0) {
    arr = goodsCopy;
    if (value !== '') {
      arr.forEach((el) => {
        if (el.name.toLowerCase().includes(value.toLowerCase())) {
          arrSearch.push(el);
        } 
      });
    }
    if (value === '') {
      arrSearch = arr;
    }
  } else
  if (arr.length !== 0) {
    if (value !== '') {
      arr.forEach((el) => {
        if (el.name.toLowerCase().includes(value.toLowerCase())) {
          arrSearch.push(el);
        }
      });
    }
    if (value === '') {
      arrSearch = arr;
    }
  }
  if ((arr.filter(i => arrSearch.includes(i))).length === 0) {
    changeStyles((arr.filter(i => arrSearch.includes(i))).length);
  }
  return arr.filter(i => arrSearch.includes(i));
}

input.addEventListener('search', () => {
  input.dispatchEvent(new Event('input'));
  getAllFilters();
});
