import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import {Chairs} from './interfaces';
import { goods, renderContent, content} from './content';
import { filter } from './filters';
import { phrase } from './search';


const sliderQuantity: noUiSlider.target = document.getElementById('slider-quantity') as noUiSlider.target;
const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;

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

export const minValueSliderQuantity = document.getElementById('min-value-quantity') as HTMLInputElement;
export const maxValueSliderQuantity = document.getElementById('max-value-quantity') as HTMLInputElement;
const ValueSliderQuantity: Array<HTMLInputElement> = [minValueSliderQuantity, maxValueSliderQuantity];

export let arrMinMaxSliders:Array<number> = [1, 15, 100, 1500];
let filterSlidersGoods:Array<Chairs>;


sliderQuantity.noUiSlider?.on('update', function(values, handle: number): void {
  if (ValueSliderQuantity) {
    ValueSliderQuantity[handle].value = (values[handle] as string).split('.')[0];
  }
});


//========================================================================================


sliderQuantity.noUiSlider?.on('change', function () {
  if (sliderQuantity.noUiSlider?.target) {
    arrMinMaxSliders = [];
    arrMinMaxSliders.push(Number(ValueSliderQuantity[0].value), Number(ValueSliderQuantity[1].value), arrSliderPrice[2], arrSliderPrice[3]);
    filterSlidersGoods = filterRange(goods, arrMinMaxSliders[0], arrMinMaxSliders[1], arrMinMaxSliders[2], arrMinMaxSliders[3]);
    renderContent(filterSlidersGoods, content);
  }
  changeStyles(filterSlidersGoods.length);
});

export function filterRange(arrChairs:Array<Chairs>, valMinQuality:number, valMaxQuality:number, valMinPrice:number, valMaxPrice:number) {
  return filter(goods).filter(item => (valMinQuality <= item.quality 
    && item.quality <= valMaxQuality && valMinPrice <= item.price && item.price <= valMaxPrice));
}


//========================================================================================

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


export const input2 = document.getElementById('input-2') as HTMLInputElement;
export const input3 = document.getElementById('input-3') as HTMLInputElement;
export const inputSlider: Array<HTMLInputElement> = [input2, input3];

export let arrSliderPrice:Array<number> = [1, 15, 100, 1500];
console.log(arrSliderPrice);

sliderPrice.noUiSlider?.on('update', function(values, handle: number): void {
  if (inputSlider) {
    inputSlider[handle].value = (values[handle] as string).split('.')[0];
  }
});


sliderPrice.noUiSlider?.on('change', function () {

  if (sliderPrice.noUiSlider?.target) {
    arrSliderPrice = [];
    arrSliderPrice.push(arrMinMaxSliders[0], arrMinMaxSliders[1],Number(inputSlider[0].value), Number(inputSlider[1].value));
    arrMinMaxSliders = arrSliderPrice;
    filterSlidersGoods = filterRange(goods, arrMinMaxSliders[0], arrMinMaxSliders[1],arrMinMaxSliders[2],arrMinMaxSliders[3]);
    renderContent(filterSlidersGoods, content);
  }
  changeStyles(filterSlidersGoods.length);
});


//==============================================

export function changeStyles (length: number) {
  if (length === 0) {
    content.style.display = 'none';
    phrase.style.display = 'block';
  } else if (length > 0 ) {
    phrase.style.display = 'none';
    content.style.display = '';
  }
}