import { renderCar, renderNumberCarAndPage } from '../views/createCars';
const carsWrapper = document.querySelector('.cars-wrapper') as HTMLDivElement;

const countWrapper = document.querySelector('.count-wrapper') as HTMLDivElement;
const numberPage = 1;

export const getCars = async () => {
    const res = await fetch('http://localhost:3000/garage/');
    const data = await res.json();
    renderCar(data, carsWrapper);
};

export const getHead = async () => {
    const res = await fetch('http://localhost:3000/garage?_limit=10', {
        method: 'HEAD',
    });
    const numberCarInGarage = res.headers.get('X-Total-Count');
    renderNumberCarAndPage(numberCarInGarage as string, numberPage, countWrapper);
};
