import {Chair} from './interfaces';
import { goods, renderContent, content} from './content';
import {arrAllFilters } from './filters';

export const select = document.querySelector('.sort-list') as HTMLSelectElement;
export const copyGoodsSort = [...goods];
export const arrSortValue:string[] = JSON.parse(localStorage.getItem('arrSortValue') as string) || [];

select.addEventListener('change', function() {
  arrSortValue.splice(0, 1, this.value);
  renderContent(getSort(arrSortValue) as Chair[], content);
  localStorage.setItem('arrSortValue', JSON.stringify(arrSortValue));
});

function sortByPrice(goodCurr:Chair, goodNext:Chair) {
  if (goodCurr.price < goodNext.price) {return -1;}

  if (goodCurr.price > goodNext.price) {return 1;}

  return 0;
}

function sortByAlphabet(goodCurr:Chair, goodNext:Chair) {
  if (goodCurr.name < goodNext.name) {return -1;}

  if (goodCurr.name > goodNext.name) {return 1;}

  return 0;
}

function sortContent(goodsArray:Chair[], selectValue: string, reverse = false) {
  if (goodsArray.length === 0) {
    if (selectValue === 'data-price') {
      goodsArray = copyGoodsSort;
      if (reverse) {
        goodsArray.sort(sortByPrice).reverse();
      } else {
        goodsArray.sort(sortByPrice);
      }
    }

    if (selectValue === 'data-name') {
      goodsArray = copyGoodsSort;
      if (reverse) {
        goodsArray.sort(sortByAlphabet).reverse();
      } else {
        goodsArray.sort(sortByAlphabet);
      }
    }

  } else if (goodsArray.length > 0) {
    if (selectValue === 'data-price') {
      if (reverse) {
        goodsArray.sort(sortByPrice).reverse();
      } else {
        goodsArray.sort(sortByPrice);
      }
    }

    if (selectValue === 'data-name') {
      if (reverse) {
        goodsArray.sort(sortByAlphabet).reverse();
      } else {
        goodsArray.sort(sortByAlphabet);
      }
    }
  }

  return goodsArray;
}

export function getSort(value:string[]) {
  if (value[0] === 'price-up') {
    return sortContent(arrAllFilters, 'data-price',false);
  }

  if (value[0] === 'price-down') {
    return sortContent(arrAllFilters, 'data-price',true );
  }
  
  if (value[0] === 'alphabet-up') {
    return sortContent(arrAllFilters, 'data-name',false);
  }

  if (value[0] === 'alphabet-down') {
    return sortContent(arrAllFilters, 'data-name',true);
  }
}
