const palco = document.querySelector('#palco');
const num_objetos = document.querySelector('#num_objetos');
const txt_qtde = document.querySelector('#txt_qtde');
const btn_add = document.querySelector('#btn_add');
const btn_remover = document.querySelector('#btn_remover');

let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBola = 0;

class Bola {
    constructor(arrayBolas, palco) {
        this.id = Date.now() + "_" + (numBola + 1);
        this.tam = Math.floor(Math.random() * 30) + 10;
        this.r = Math.floor(Math.random() * 225) + 30;
        this.g = Math.floor(Math.random() * 200);
        this.b = Math.floor(Math.random() * 225) + 20;
        this.px = Math.floor(Math.random() * (larguraPalco - this.tam));
        this.py = Math.floor(Math.random() * (alturaPalco - this.tam));
        this.velx = Math.floor(Math.random() * 4) + 1;
        this.vely = Math.floor(Math.random() * 4) + 1;
        this.dirx = Math.random() * 10 > 5 ? 1 : -1;
        this.diry = Math.random() * 10 > 5 ? 1 : -1;
        this.palco = palco;
        this.arrayBolas = arrayBolas;
        this.somColisao = new Audio('collision.wav');
        this.somAdicionar = new Audio('add.wav');
        this.somRemover = new Audio('remove.wav');
        this.somAdicionar.play();
        this.desenhar();
        this.eu = document.getElementById(this.id);
        this.controle = setInterval(() => this.controlar(), 10);
        numBola++;
        num_objetos.innerHTML = numBola;
        console.log(`Bola criada: ${this.id}`);
    }

    controle_bordas = () => {
        if ((this.px + this.tam >= larguraPalco) || (this.px <= 0)) {
            this.dirx *= -1;
            this.mudarCor();
            this.somColisao.play();
        }
        if ((this.py + this.tam >= alturaPalco) || (this.py <= 0)) {
            this.diry *= -1;
            this.mudarCor();
            this.somColisao.play();
        }
    }

    mudarCor = () => {
        this.r = Math.floor(Math.random() * 225) + 30;
        this.g = Math.floor(Math.random() * 200);
        this.b = Math.floor(Math.random() * 225) + 20;
        this.eu.style.backgroundColor = `rgb(${this.r},${this.g},${this.b})`;
    }

    minhaPos = () => {
        return this.arrayBolas.indexOf(this);
    }

    remover = () => {
        this.somRemover.play();
        clearInterval(this.controle);
        bolas = bolas.filter((b) => b.id != this.id);
        this.eu.remove();
        numBola--;
        num_objetos.innerHTML = numBola;
        console.log(`Bola removida: ${this.id}`);
    }

    desenhar = () => {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "bola");
        div.setAttribute("style", `left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`);
        this.palco.appendChild(div);
    }

    controlar = () => {
        this.controle_bordas();
        this.px += this.dirx * this.velx;
        this.py += this.diry * this.vely;
        this.eu.setAttribute("style", `left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`);
        if ((this.px > larguraPalco) || (this.py > alturaPalco)) {
            this.remover();
        }
    }
}

window.addEventListener('resize', () => {
    larguraPalco = palco.offsetWidth;
    alturaPalco = palco.offsetHeight;
});

btn_add.addEventListener('click', () => {
    const qtde = parseInt(txt_qtde.value);
    for (let i = 0; i < qtde; i++) {
        bolas.push(new Bola(bolas, palco));
    }
    console.log(`Adicionadas ${qtde} bolas`);
});

btn_remover.addEventListener('click', () => {
    bolas.forEach((b) => b.remover());
    console.log('Todas as bolas foram removidas');
});