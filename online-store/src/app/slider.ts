import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
// import {Chairs} from './interfaces';
import { content} from './content';
// import { searchInput, getSearchList, input } from './search';
// import { getFilterList, getAllFilters, newArr } from './filters';
import { getAllFilters} from './filters';


export const sliderQuantity: noUiSlider.target = document.getElementById('slider-quantity') as noUiSlider.target;
export const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;
// let arrFilterBySlider:Chairs[];
function createSliders () {
  if (sliderQuantity) {
    noUiSlider.create(sliderQuantity, {
      start: [1, 15],
      connect: true,
      step: 1,
      range: {
          'min': [1],
          'max': [15]
      }
  });
  }
  if (sliderPrice) {
    noUiSlider.create(sliderPrice, {
      start: [100, 1500],
      connect: true,
      step: 100,
      range: {
          'min': [100],
          'max': [1500]
      }
  });
  }
}
createSliders();

export const minValueSliderQuantity = document.getElementById('min-value-quantity') as HTMLInputElement;
export const maxValueSliderQuantity = document.getElementById('max-value-quantity') as HTMLInputElement;
export const ValueSliderQuantity: Array<HTMLInputElement> = [minValueSliderQuantity, maxValueSliderQuantity];
export let arrMinMaxSliders:Array<number> = [1, 15, 100, 1500];


sliderQuantity.noUiSlider?.on('update', function(values, handle: number): void {
  if (ValueSliderQuantity) {
    ValueSliderQuantity[handle].value = (values[handle] as string).split('.')[0];
  }
  // console.log(arrFilterBySlider);
  // filterRange(newArr, arrMinMaxSliders[0], arrMinMaxSliders[1],arrMinMaxSliders[2],arrMinMaxSliders[3]);
  // getAllFilters();

});

export const minValueSliderPrice = document.getElementById('min-value-price') as HTMLInputElement;
export const maxValueSliderPrice = document.getElementById('max-value-price') as HTMLInputElement;
export const ValueSliderPrice: Array<HTMLInputElement> = [minValueSliderPrice, maxValueSliderPrice];
export let arrSliderPrice:Array<number> = [1, 15, 100, 1500];

sliderPrice.noUiSlider?.on('update', function(values, handle: number): void {
  if (ValueSliderPrice) {
    ValueSliderPrice[handle].value = (values[handle] as string).split('.')[0];
  }
});

// export let filterList:Chairs[];
//========================================================================================
// export function filterRange(arrChairs:Array<Chairs>, valMinQuality:number, valMaxQuality:number, valMinPrice:number, valMaxPrice:number) {
//  filterList = getFilterList(goods).filter(item => (valMinQuality <= item.quality 
//     && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
//     return filterList;
// }
// let arrFilterBySlider:Chairs[] = [];
// export function filterRange(arrChairs:Array<Chairs>, valMinQuality:number, valMaxQuality:number, valMinPrice:number, valMaxPrice:number) {
//   if (arrChairs.length === 0) {
//     arrChairs = goodsCopy;
//     arrFilterBySlider = getFilterList(arrChairs).filter(item => (valMinQuality <= item.quality 
//     && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
//   } else {
//     arrFilterBySlider = getFilterList(arrChairs).filter(item => (valMinQuality <= item.quality 
//       && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
//   }
// return arrFilterBySlider;
// }

sliderQuantity.noUiSlider?.on('change', function () {
  if (sliderQuantity.noUiSlider?.target) {
    arrMinMaxSliders = [];
    arrMinMaxSliders.push(Number(ValueSliderQuantity[0].value), Number(ValueSliderQuantity[1].value), arrSliderPrice[2], arrSliderPrice[3]);
  //   filterSlidersGoods = filterRange(goods, arrMinMaxSliders[0], arrMinMaxSliders[1], arrMinMaxSliders[2], arrMinMaxSliders[3]);
  //   renderContent(filterSlidersGoods, content);
  // }
  // changeStyles(filterSlidersGoods.length);

  // filterRange(newArr, arrMinMaxSliders[0], arrMinMaxSliders[1],arrMinMaxSliders[2],arrMinMaxSliders[3]);
  getAllFilters();
  // changeStyles(arrFilterBySlider.length);
    // getAllFilters();
  }
});

//========================================================================================

sliderPrice.noUiSlider?.on('change', function () {
  if (sliderPrice.noUiSlider?.target) {
    arrSliderPrice = [];
    arrSliderPrice.push(arrMinMaxSliders[0], arrMinMaxSliders[1],Number(ValueSliderPrice[0].value), Number(ValueSliderPrice[1].value));
    arrMinMaxSliders = arrSliderPrice;
  //   filterSlidersGoods = filterRange(goods, arrMinMaxSliders[0], arrMinMaxSliders[1],arrMinMaxSliders[2],arrMinMaxSliders[3]);
  //   renderContent(filterSlidersGoods, content);
  // }

  getAllFilters();
  // filterRange(newArr, arrMinMaxSliders[0], arrMinMaxSliders[1],arrMinMaxSliders[2],arrMinMaxSliders[3]);
  //   changeStyles(arrFilterBySlider.length);
  }
});

//==============================================
const phrase = document.querySelector('.phrase') as HTMLBaseElement;
export function changeStyles (length: number) {
  if (length === 0) {
    content.style.display = 'none';
    phrase.style.display = 'block';
  } else if (length > 0 ) {
    phrase.style.display = 'none';
    content.style.display = '';
  }
}




//====================

// export function filterRange(arrChairs:Array<Chairs>, valMinQuality:number, valMaxQuality:number, valMinPrice:number, valMaxPrice:number) {
//   if (arrChairs.length === 0) {
//     arrChairs = goodsCopy;
//     arrFilterBySlider = getFilterList(arrChairs).filter(item => (valMinQuality <= item.quality 
//     && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
//   } else {
//     arrFilterBySlider = getFilterList(arrChairs).filter(item => (valMinQuality <= item.quality 
//       && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
//   }
//   // renderContent(arrFilterBySlider, content);
// return arrFilterBySlider;
// }
// export function filterRange(arrChairs:Array<Chairs>, valMinQuality:number, valMaxQuality:number, valMinPrice:number, valMaxPrice:number) {
//   if (arrChairs.length === 0) {
//     arrChairs = goodsCopy;
//   }
//   return getFilterList(arrChairs).filter(item => (valMinQuality <= item.quality 
//     && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
 
//   // renderContent(arrFilterBySlider, content);
// //  arrFilterBySlider;
// }
