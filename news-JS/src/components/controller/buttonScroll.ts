export function scrollFunction(): void {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        (document.getElementById('myBtn') as HTMLElement).style.display = 'block';
    } else {
        (document.getElementById('myBtn') as HTMLElement).style.display = 'none';
    }
}

export function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
