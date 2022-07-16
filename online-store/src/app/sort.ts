import {Chairs} from './interfaces';
import { goods, renderContent, content} from './content';
import { filterQuality } from './filters';

const select = document.querySelector('.sort-list') as HTMLSelectElement;
export const arrSortValue:string[] = [];

select.addEventListener('change', function() {
  arrSortValue.splice(0, 1, this.value);
  getSort(arrSortValue);
});

export function sortGoods(products:Array<Chairs>, section:HTMLElement, reverse = false, sortValue:string) {
  if (sortValue === 'data-price'){
    if (reverse) {
      products.sort(sortByPrice).reverse();
    } else {
      products.sort(sortByPrice);
    }
  }
  if (sortValue === 'data-name'){
    if (reverse) {
      products.sort(sortByAlphabet).reverse();
    } else {
      products.sort(sortByAlphabet);
    }
  }
  section.innerHTML = '';
  renderContent(products, content);
}

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

function getFilteredList () {
  let mas: Array<Chairs> = [];
  if (filterQuality.length !== 0) {
    mas = filterQuality;
  } else if (filterQuality.length === 0) {
 mas = goods;
  }
  return mas;
}


export function getSort(value:string[]) {
  if (value[0] === 'price-up') {
    sortGoods(getFilteredList (), content,false, 'data-price');
  }
  if(value[0] === 'price-down') {
    sortGoods(getFilteredList (), content,true, 'data-price');
  }
  if(value[0] === 'alphabet-up') {
    sortGoods(getFilteredList (), content,false,'data-name');
  }
  if(value[0] === 'alphabet-down') {
    sortGoods(getFilteredList (), content,true,'data-name');
  }
}