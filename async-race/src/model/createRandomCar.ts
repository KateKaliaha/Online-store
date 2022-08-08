import {carMarks, carModel} from './carArray';
import { Car } from '../views/renderGarage';
import { createCar } from './manageGarage';



function getRandomCarMark():string {
    const carRandomMark = carMarks[Math.floor(Math.random() * carMarks.length)];

    return carRandomMark;
}

function getRandomCarModel() {
    const carRandomModel = carModel[Math.floor(Math.random() * carModel.length)];

    return carRandomModel;
}

function getRandomCarName() {
    const carRandomName = `${getRandomCarMark()} ${getRandomCarModel()}`;

    return carRandomName;
}

function getRandomCarColor() {
    const totalPossibleCombinationsRGB = 16_777_215;
    const carRandomColor = '#' + Math.floor(Math.random() * totalPossibleCombinationsRGB).toString(16).padStart(6, '0');

    return carRandomColor;
}

export function generateRandomCars(): Car[] {
    const amountAddCarsToPage = 100;
    const arrayAddedCars = new Array(amountAddCarsToPage).fill(0).map(() => ({name:getRandomCarName(), color:getRandomCarColor()}));
    return arrayAddedCars;
}

export function generateAllRandomCars(arrayAddedCars:Array<Car>) {
    arrayAddedCars.map(async(car:Car) => await createCar(car));
    return arrayAddedCars;
}

