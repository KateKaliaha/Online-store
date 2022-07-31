import {carMarks} from './carArray';

function getRandomCarName() {
    const carRandomName = carMarks[Math.floor(Math.random() * carMarks.length)];

    return carRandomName;
}

function getRandomCarColor() {
    const totalPossibleCombinationsRGB = 16_777_215;
    const carRandomColor = '#' + Math.floor(Math.random() * totalPossibleCombinationsRGB).toString(16).padStart(6, '0');

    return carRandomColor;
}

export function generateRandomCars(amountAddCars:number) {
    const arrayAddedCars = new Array(amountAddCars).fill(0).map(() => ({name:getRandomCarName(), color:getRandomCarColor()}));
    return arrayAddedCars;
}


