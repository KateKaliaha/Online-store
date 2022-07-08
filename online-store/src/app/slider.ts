import * as noUiSlider from '../../node_modules/nouislider/dist/nouislider';


const slider: noUiSlider.target = document.getElementById('slider') as noUiSlider.target;
const slider1: noUiSlider.target = document.getElementById('slider1') as noUiSlider.target;

if (slider) {
  noUiSlider.create(slider, {
    start: [1, 15],
    connect: true,
    step: 1,
    range: {
        'min': [1],
        'max': [15]
    }
});
}

const input0 = document.getElementById('input-0') as HTMLInputElement;
const input1 = document.getElementById('input-1') as HTMLInputElement;
const input: Array<HTMLInputElement> = [input0, input1];



slider.noUiSlider?.on('update', function(values, handle: number): void {
  if (input) {
    input[handle].value = (values[handle] as string).split('.')[0];
  }
});


if (slider1) {
  noUiSlider.create(slider1, {
    start: [100, 1500],
    connect: true,
    step: 100,
    range: {
        'min': [100],
        'max': [1500]
    }
});
}

const input2 = document.getElementById('input-2') as HTMLInputElement;
const input3 = document.getElementById('input-3') as HTMLInputElement;
const input4: Array<HTMLInputElement> = [input2, input3];



slider1.noUiSlider?.on('update', function(values, handle: number): void {
  if (input4) {
    input4[handle].value = (values[handle] as string).split('.')[0];
  }
});