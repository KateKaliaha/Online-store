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

function createButton (value: string, element: HTMLDivElement) {
    const btn = document.createElement('button') as HTMLButtonElement;
    btn.className = value.replace(/ /g, '-');
    btn.innerHTML = value.toUpperCase();
    element.appendChild(btn);
}

function createAllButtons() {
    createAllWrappers();
    createAllInputs();
    const inputCreateColor = document.querySelector('.create-input-color') as HTMLInputElement;
    inputCreateColor.value = '#7A45BA';
    const inputUpdateColor = document.querySelector('.update-input-color') as HTMLInputElement;
    inputUpdateColor.value = '#45BAB8';
    createButton('to garage', document.querySelector('.page-btn-wrapper') as HTMLDivElement);
    createButton('to winners', document.querySelector('.page-btn-wrapper') as HTMLDivElement);
    createButton('create', document.querySelector('.create-block-wrapper') as HTMLDivElement);
    createButton('update', document.querySelector('.update-block-wrapper') as HTMLDivElement);
    createButton('race', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
    createButton('reset', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
    createButton('generate cards', document.querySelector('.btn-active-wrapper') as HTMLDivElement);
}

createAllButtons();
