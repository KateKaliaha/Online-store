import {Chairs} from './interfaces';
import { goods, renderContent, content} from './content';
import {arrAllFilters } from './filters';

export const select = document.querySelector('.sort-list') as HTMLSelectElement;
export const copyGoodsSort = [...goods];
export const arrSortValue:string[] = JSON.parse(localStorage.getItem('arrSortValue') as string) || [];



select.addEventListener('change', function() {
  arrSortValue.splice(0, 1, this.value);
  renderContent(getSort(arrSortValue) as Chairs[], content);
  localStorage.setItem('arrSortValue', JSON.stringify(arrSortValue));
});

function sortByPrice(goodCurr:Chairs, goodNext:Chairs) {
  if (goodCurr.price < goodNext.price) {return -1;}
  if (goodCurr.price > goodNext.price) {return 1;}
  return 0;
}

function sortByAlphabet(goodCurr:Chairs, goodNext:Chairs) {
  if (goodCurr.name < goodNext.name) {return -1;}
  if (goodCurr.name > goodNext.name) {return 1;}
  return 0;
}

function sortContent (arr:Chairs[], selectValue: string, reverse = false) {
  if (arr.length === 0) {
    if (selectValue === 'data-price') {
      arr = copyGoodsSort;
      if (reverse) {
        arr.sort(sortByPrice).reverse();
      } else {
        arr.sort(sortByPrice);
      }
    }
    if (selectValue === 'data-name') {
      arr = copyGoodsSort;
      if (reverse) {
        arr.sort(sortByAlphabet).reverse();
      } else {
        arr.sort(sortByAlphabet);
      }
    }
  } else if (arr.length > 0) {
    if (selectValue === 'data-price') {
      if (reverse) {
        arr.sort(sortByPrice).reverse();
      } else {
        arr.sort(sortByPrice);
      }
    }
    if (selectValue === 'data-name') {
      if (reverse) {
        arr.sort(sortByAlphabet).reverse();
      } else {
        arr.sort(sortByAlphabet);
      }
    }
  }
  return arr;
}

export function getSort(value:string[]) {
  if (value[0] === 'price-up') {
    return sortContent(arrAllFilters, 'data-price',false);
  }
  if(value[0] === 'price-down') {
    return sortContent(arrAllFilters, 'data-price',true );
  }
  if(value[0] === 'alphabet-up') {
    return sortContent(arrAllFilters, 'data-name',false);
  }
  if(value[0] === 'alphabet-down') {
    return sortContent(arrAllFilters, 'data-name',true);
  }
}
