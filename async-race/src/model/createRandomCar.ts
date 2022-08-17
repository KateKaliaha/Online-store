import { carMarks, carModel } from './carArray';
import { Car } from '../model/manageGarage';
import { createCar } from './manageGarage';

function getRandomCarMark(): string {
  const carRandomMark = carMarks[Math.floor(Math.random() * carMarks.length)];

  return carRandomMark;
}

function getRandomCarModel(): string {
  const carRandomModel = carModel[Math.floor(Math.random() * carModel.length)];

  return carRandomModel;
}

function getRandomCarName(): string {
  const carRandomName = `${getRandomCarMark()} ${getRandomCarModel()}`;

  return carRandomName;
}

function getRandomCarColor(): string {
  const TOTAL_POSSIBLE_COMBINATIONS_RGB = 16_777_215;
  const carRandomColor = '#' + Math.floor(Math.random() * TOTAL_POSSIBLE_COMBINATIONS_RGB).toString(16).padStart(6, '0');

  return carRandomColor;
}

export function generateRandomCars(): Car[] {
  const AMOUNT_ADD_CARS_TO_PAGE = 100;
  const arrayAddedCars = new Array(AMOUNT_ADD_CARS_TO_PAGE).fill(0).map(() => ({ name: getRandomCarName(), color: getRandomCarColor() }));

  return arrayAddedCars;
}

export function generateAllRandomCars(arrayAddedCars: Array<Car>): Car[] {
  arrayAddedCars.map(async (car: Car) => createCar(car));

  return arrayAddedCars;
}
