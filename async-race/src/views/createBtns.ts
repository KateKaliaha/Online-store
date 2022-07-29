const body = document.querySelector('body') as HTMLBodyElement;

function createWrapper(name:string, element: HTMLBodyElement) {
    const wrapper = document.createElement('div') as HTMLDivElement;
    wrapper.className = name;
    element.appendChild(wrapper);

    return wrapper;
}

function createAllWrappers() {
    createWrapper('page-btn-wrapper', body);
    createWrapper('create-block-wrapper', body);
    createWrapper('update-block-wrapper', body);
    createWrapper('btn-active-wrapper', body);
    createWrapper('count-wrapper', body);
    createWrapper('cars-wrapper', body);
    createWrapper('page-switch-btn-wrapper', body);
}

function createInput(name: string, typeInput:string, element: HTMLDivElement) {
    const input = document.createElement('input');
    input.type = typeInput;
    input.className = name;
    element.appendChild(input);
}

function createAllInputs() {
    createInput('create-input-text', 'text', document.querySelector('.create-block-wrapper') as HTMLDivElement);
    createInput('create-input-color', 'color', document.querySelector('.create-block-wrapper') as HTMLDivElement);
    createInput('update-input', 'text', document.querySelector('.update-block-wrapper') as HTMLDivElement);
    createInput('update-input-color', 'color', document.querySelector('.update-block-wrapper') as HTMLDivElement);
}

function createButton(value: string, element: HTMLDivElement) {
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.className = value.replace(/ /g, '-');
    btn.innerHTML = value.toUpperCase();
    element.appendChild(btn);
}

function createAllButtons() {
    createButton('to garage', document.querySelector('.page-btn-wrapper') as HTMLDivElement);
    createButton('to winners', document.querySelector('.page-btn-wrapper') as HTMLDivElement);
    createButton('create', document.querySelector('.create-block-wrapper') as HTMLDivElement);
    createButton('update', document.querySelector('.update-block-wrapper') as HTMLDivElement);
    createButton('race', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
    createButton('reset', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
    createButton('generate cars', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
    createButton('prev', document.querySelector('.page-switch-btn-wrapper') as HTMLDivElement);
    createButton('next', document.querySelector('.page-switch-btn-wrapper') as HTMLDivElement);
    applyDisabledForBtn(2,3);
}

function applyDisabledForBtn(data:number, count:number) {
    const btnPrev = document.querySelector('.prev') as HTMLButtonElement;
    const btnNext = document.querySelector('.next') as HTMLButtonElement;
    if (data === 1) {
        btnPrev.setAttribute('disabled', 'disabled');
        btnNext.setAttribute('disabled', 'disabled');
    } else if (data === count) {
        btnPrev.removeAttribute('disabled');
        btnNext.setAttribute('disabled', 'disabled');
    }
}

export function createViewPage() {
    createAllWrappers();
    createAllInputs();
    const inputCreateColor = document.querySelector('.create-input-color') as HTMLInputElement;
    inputCreateColor.value = '#7A45BA';
    const inputUpdateColor = document.querySelector('.update-input-color') as HTMLInputElement;
    inputUpdateColor.value = '#45BAB8';
    createAllButtons();
}

createViewPage();
