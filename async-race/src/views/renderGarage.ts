import { Car, cars, count } from '../model/manageGarage';
import { pageGarage } from '../controllers/catchEvents';

function renderViewGarage(): string {
  const numberCarAndPagesInGarage = `<div class="number-car">Garage (${count})</div>
                                      <div class="number-page">Page #${pageGarage}</div>
                                      <div class="cars-wrapper">
                                          ${cars.map((car:Car) => `<li>${renderCar(car)}</li>`).join('')}
                                      </div>`;

  return numberCarAndPagesInGarage;
}

function renderCar({ id, name, color }: Car): string {
  const fragment = `<div class="car" id="car-${id}">
                        <div class="btn-change-car">
                            <button class="select-btn" id="select-${id}">SELECT</button>
                            <button class="remove-btn" id="remove-${id}">REMOVE</button>
                            ${name}</div>
                        <div class="btn-move-car">
                            <button class="start-btn active" id="start-btn-${id}">A</button>
                            <button class="finish-btn" id="finish-btn-${id}" disabled>B</button>
                            <div class="image-car" id="image-car-${id}">${renderImageCar(color, '60')}</div>
                            <img class="flag" id="flag-${id}"src="./assets/flag.png" alt="Image flag for finish car"></img>
                        </div>
                    </div>`;

  return fragment;
}

export function renderImageCar(color: string, width: string): string {
  const svg = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="${width}px" viewBox="0 0 79.536 79.536" style="enable-background:new 0 0 79.536 79.536;"
                xml:space="preserve">
                <path style="fill:${color};" d="M15.532,56.706c-3.977,0-7.213-3.242-7.213-7.197c0-3.998,3.236-7.224,7.213-7.224
                c3.987,0,7.226,3.226,7.226,7.224C22.758,53.463,19.519,56.706,15.532,56.706z M15.532,45.604c-2.128,0-3.876,1.75-3.876,3.883
                c0,2.129,1.748,3.879,3.876,3.879c2.141,0,3.886-1.75,3.886-3.879C19.418,47.354,17.673,45.604,15.532,45.604z M64.137,56.706
                c-3.987,0-7.219-3.242-7.219-7.197c0-3.998,3.231-7.224,7.219-7.224c3.977,0,7.208,3.226,7.208,7.224
                C71.345,53.463,68.113,56.706,64.137,56.706z M64.137,45.604c-2.144,0-3.895,1.75-3.895,3.883c0,2.129,1.751,3.879,3.895,3.879
                c2.139,0,3.884-1.75,3.884-3.879C68.021,47.354,66.275,45.604,64.137,45.604z M78.138,44.091c0-7.011-4.365-7.842-4.365-7.842
                c-6.426-0.912-17.496-1.38-17.496-1.38c-1.016-1.766-5.707-12.039-8.44-12.039c-0.911,0-20.508,0-23.975,0
                c-3.472,0-9.167,10.024-10.413,12.285c0,0-4.36,0.758-6.416,1.219c-1.142,0.265-4.301,0.324-4.301,9.155H0v3.997h6.654
                c0-4.908,3.982-8.885,8.878-8.885c4.914,0,8.886,3.977,8.886,8.885h30.827c0-4.908,3.967-8.885,8.892-8.885
                c4.898,0,8.875,3.977,8.875,8.885h6.524v-5.396H78.138z M35.589,34.191H21.751c1.872-5.831,5.339-9.994,6.801-9.994
                c1.841,0,7.037,0,7.037,0V34.191z M38.168,34.191v-9.994c0,0,7.141,0,8.974,0c1.854,0,5.893,8.461,7.032,10.625L38.168,34.191z"/>`;

  return svg;
}

export function renderPageGarage(): string {
  const garagePage = `<div class="create-block-wrapper">
                            <input class="create-input-text" type=text></input>
                            <input class="create-input-color" type=color value="#7A45BA"></input>
                            <button class="create">CREATE</button>
                        </div>
                        <div class="update-block-wrapper">
                            <input class="update-input-text" type=text></input>
                            <input class="update-input-color" type=color value="#45BAB8"></input>
                            <button class="update">UPDATE</button>
                        </div>
                        <div class="btn-active-wrapper">
                            <button class="race">RACE</button>
                            <button class="reset" disabled>RESET</button>
                            <button class="generate-cars">GENERATE CARS</button>
                        </div>
                        <div class="garage-wrapper">${renderViewGarage()}</div>`;

  return garagePage;
}
