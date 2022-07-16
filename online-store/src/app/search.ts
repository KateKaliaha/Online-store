import {Chairs} from './interfaces';
import { renderContent, content, goods} from './content';
import { filterQuality } from './filters';
import {changeStyles} from './slider';

const input= document.getElementById('q') as HTMLInputElement;
let newArr: Array<Chairs> = [];
export let searchInput:string;
input.addEventListener('input', (event) => {
  const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
  searchInput = searchValue;
  if (filterQuality.length !== 0) {
    getSearchList(searchInput, filterQuality);
  } else {
    getSearchList(searchInput, goods);
  }
  return searchInput;
});


export function getSearchList (value:string, arr: Array<Chairs>) {
  newArr = [];
  if (arr.length !== 0) {
    if (value != '') {
      arr.forEach((el) => {
        if(el.name.toLowerCase().search(value) !== -1) {
          newArr.push(el);
        }
      });
    } if (value == '') {
      newArr = arr;
    }
  } else {
    newArr = goods;
  }
  changeStyles(newArr.length);
  renderContent(newArr, content);
  return newArr;
}