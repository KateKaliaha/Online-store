import { Car } from '../views/renderGarage';

export interface WinCar {
    id: string,
    wins: string,
    time: number
}

export async function addWinner({ win, time} : { win: Car, time:number}) {
    const winnerStatus = await getWinnerStatus((win.id).toString());

    if (winnerStatus === 404) {
         await createWinner ({
             id:(win.id).toString(),
            wins:'1',
            time:time
         });
    } else {
        const winner:WinCar = await getWinner((win.id).toString());
        await updateWinner((win.id).toString(), {
            id: winner.id,
            wins: (+winner.wins + 1).toString(),
            time: time < winner.time ? time : winner.time
        });
    }
}

async function getWinnerStatus(id:string) {
    const res = await fetch(`http://localhost:3000/winners/${id}`);

    return res.status;
}

async function getWinner(id:string) {
    const res = await fetch(`http://localhost:3000/winners/${id}`);

    return await res.json();
}

async function updateWinner(id:string, body:WinCar) {
    const updateWinner = await fetch(`http://localhost:3000/winners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return updateWinner;
}

async function createWinner(body:WinCar) {
    const createWinner = await fetch('http://localhost:3000/winners/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    return createWinner;
}