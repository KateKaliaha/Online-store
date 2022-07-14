import {Chairs} from './interfaces';
import { goods, content, renderContent} from './content';

let result: Array<Chairs>=[];
let new_goods: Chairs[];
const arrFilters:Array<string> = [];
const arrData:Array<string> = [];
let arrSet:Array<string> = [];
const filters = document.querySelectorAll('.filter-checkbox');


function filterGoods(val:string,goods:Array<Chairs>, type:string) {
  goods.forEach( i=>{
    if((i[type as keyof Chairs]as string).indexOf(val)!=-1) {
      result.push(i);
    }
  });
  return result;
}

function getNewGoods(value: string, arr2:Chairs[], type:string) {
  new_goods = filterGoods(value, arr2, type);
  renderContent(new_goods,content);
}


filters.forEach((element) => element.addEventListener ('input',e=>{
  const input = e.target as HTMLInputElement;
  const inputName = input.name as string;  //colorType
  const inputValue = input.value as string; 

  if (input.checked && arrSet.length <= 1) {
    arrFilters.push(inputValue);
    arrData.push(inputName);
    arrSet = Array.from(new Set(arrData));
      getNewGoods(inputValue, goods, inputName);
  }
  if (!input.checked) {
    arrFilters.splice(arrFilters.indexOf(inputValue), 1);
    arrData.splice(arrFilters.indexOf(inputName), 1);
    arrSet = Array.from(new Set(arrData));
    new_goods.forEach((el) => {
      if (el[inputName as keyof Chairs] === inputValue ) {
        new_goods = new_goods.filter((el) => el[inputName as keyof Chairs] !== inputValue );
      }
    });
      if (new_goods.length > 0) {
        result = new_goods;
        renderContent(new_goods,content);
      } else {
        result =[];
        renderContent(goods,content);
      }
    }

    else if (arrSet.length > 1){
      if (input.checked) {
        new_goods.forEach((el) => {
          if (el[inputName as keyof Chairs] === input.value ) {
            new_goods = new_goods.filter((el) => el[inputName as keyof Chairs] == input.value );
        }
      });
      renderContent(new_goods,content);
      } else if (!input.checked) {
        new_goods.forEach((el) => {
          if (el[inputName as keyof Chairs] === input.value ) {
            new_goods = new_goods.filter((el) => el[inputName as keyof Chairs] !== input.value );
          }
        });
        new_goods = result;
        renderContent(new_goods,content);
      }
    }
}));



// function getCountClick(ev:HTMLInputElement, value:string) {
//   if ((ev.checked)) {
//     if (value === 'colorType') {
//       count = count + 1;
//     } 
//   } else {
//     count = count - 1;
//   }
// }


