import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';
import { content} from './content';
import { getAllFilters} from './filters';

export const sliderQuantity: noUiSlider.target = document.getElementById('slider-quantity') as noUiSlider.target;
export const sliderPrice: noUiSlider.target = document.getElementById('slider-price') as noUiSlider.target;
const phrase = document.querySelector('.phrase') as HTMLBaseElement;

function createSliders() {
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
export let arrMinMaxSliders:Array<number> = JSON.parse(localStorage.getItem('arrSliderPrice') as string) || [1, 15, 100, 1500];

sliderQuantity.noUiSlider?.on('update', function(values, handle: number): void {
  if (ValueSliderQuantity) {
    ValueSliderQuantity[handle].value = (values[handle] as string).split('.')[0];
  }
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

sliderQuantity.noUiSlider?.on('change', function () {
  if (sliderQuantity.noUiSlider?.target) {
    arrMinMaxSliders = [];
    arrMinMaxSliders.push(Number(ValueSliderQuantity[0].value), Number(ValueSliderQuantity[1].value), arrSliderPrice[2], arrSliderPrice[3]);
    getAllFilters();
  }

  localStorage.setItem('arrMinMaxSliders', JSON.stringify(arrMinMaxSliders));
});

sliderPrice.noUiSlider?.on('change', function () {
  if (sliderPrice.noUiSlider?.target) {
    arrSliderPrice = [];
    arrSliderPrice.push(arrMinMaxSliders[0], arrMinMaxSliders[1],Number(ValueSliderPrice[0].value), Number(ValueSliderPrice[1].value));
    arrMinMaxSliders = arrSliderPrice;
    getAllFilters();
    localStorage.setItem('arrMinMaxSliders', JSON.stringify(arrMinMaxSliders));
  }
});

export function changeStyles(length: number) {
  if (length === 0) {
    content.style.display = 'none';
    phrase.style.display = 'block';
  } else if (length > 0 ) {
    phrase.style.display = 'none';
    content.style.display = '';
  }
}

export function valueSlider() {
  if (JSON.parse(localStorage.getItem('arrMinMaxSliders') as string)) {
    const copyArrMinMaxSliders = JSON.parse(localStorage.getItem('arrMinMaxSliders') as string);
    const valueQuantitySlider = copyArrMinMaxSliders.splice(0,2);
    sliderQuantity.noUiSlider?.set(valueQuantitySlider);
    sliderPrice.noUiSlider?.set(copyArrMinMaxSliders);
  }
}

valueSlider();