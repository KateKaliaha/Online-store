import { cars } from '../model/manageGarage';
import {Car} from '../views/renderGarage';

interface ResultPromise {
    id: string; 
    timeRace: number; 
    success: boolean;
}

const animateRequest:Record<string, number>[] = [];

async function startEngine(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=started`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    return (await res.json());
}

async function stopEngine(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=stopped`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return (await res.json());
}

async function driveCar(id:string) {
    const res = await fetch (`http://localhost:3000/engine?id=${id}&status=drive`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch();

    if (res.status === 200) {
        return {...await res.json()};
    } else {
        return {'success':false};
    }
}

export async function startRace(id:string): Promise<{ id: string; timeRace: number; success: boolean; }> {
    const startButton = document.getElementById(`start-btn-${id}`) as HTMLButtonElement;
    const finishButton = document.getElementById(`finish-btn-${id}`) as HTMLButtonElement;
    startButton.disabled = true;
    const {velocity, distance} = await startEngine(id);
    const timeRace = Math.round(distance / velocity);
    finishButton.disabled = false;
    animateRequest[Number(id)-1] = animation(timeRace, id);
    const {success} = await driveCar(id);

    if (success === false) {
        clearInterval(animateRequest[Number(id)-1].request);
    }

    return { id, success, timeRace};
}


export async function stopRace(id:string) {
    const startButton = document.getElementById(`start-btn-${id}`) as HTMLButtonElement;
    const finishButton = document.getElementById(`finish-btn-${id}`) as HTMLButtonElement;
    const car = document.getElementById(`image-car-${id}`) as HTMLDivElement;
    finishButton.disabled = true;

    if (animateRequest[Number(id)-1].request) {
        clearInterval(animateRequest[Number(id)-1].request);
    }
    await stopEngine(id);

    car.style.transform = 'translateX(0px)';
    startButton.disabled = false;
}

export function animation(duration:number, id:string) {
    const car = document.getElementById(`image-car-${id}`) as HTMLDivElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
    const endPoint = flag.offsetLeft- 25;
    const framesCount = duration / 1000;
    let pos = 0;
    const result:Record<string, number> = {};

    result.request = window.setInterval(frame, framesCount);

    function frame() {
        if (pos === endPoint) {
            clearInterval(result.request);
        } else {
            pos = pos + 1;
            car.style.transform = `translateX(${pos}px)`;
        }
    }

    return result;
}

export async function raceAllCars() {
    const promises:Promise<ResultPromise>[] = [...cars.map( async (car:Car) => await startRace(car.id.toString()))];
    const win = await winner(promises, cars.map((car:Car) => car.id));

    return win;
}

async function winner (prom:Promise<ResultPromise>[], ind:number[]): Promise<{ cars: { cars: Car; }; time: string; }> {
    const { id, timeRace, success,}:ResultPromise = await Promise.race(prom);

    if(!success) {
        const fail:number = ind.findIndex((i:number) => (i).toString() == id);
        const resProm:Promise<ResultPromise>[] = [...[...prom.slice(0, fail)], ...[...prom.slice((fail + 1), prom.length)]];
        const resInd = [...ind.slice(0, fail), ...ind.slice((fail+1), ind.length)];
        return winner(resProm, resInd);
    }

    const result = {cars: cars.find((car:Car) => (car.id).toString() === id), time: (timeRace / 1000).toFixed(2)};

    return result;
}

export async function stopRaceAllCars() {
    await Promise.all(cars.map( async (car:Car) => await stopRace(car.id.toString())));
}


