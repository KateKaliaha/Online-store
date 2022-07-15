import {Chairs} from './interfaces';
import { goods, renderContent, content} from './content';
import { phrase } from './search';

const filters = document.querySelectorAll('.filter-checkbox'); // all filters checkbox

// arrays from value checkboxes
const arrSellers:Array<string> = [];
const arrTypeChair:Array<string> = [];
const arrColors:Array<string> = [];
const arrPopular:Array<string> = [];

let newArr:Array<Chairs> = []; // array after filter

filters.forEach((element) => element.addEventListener ('input', e => {
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
    renderContent(filter(goods),content);
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
    renderContent(filter(goods),content);
  }
}));

function filter(arr:Array<Chairs>) {
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
  if (newArr.length === 0) {
    content.style.display = 'none';
    phrase.style.display = 'block';
  } else if (newArr.length > 0 ) {
    phrase.style.display = 'none';
    content.style.display = '';
  }
  return newArr;
}


