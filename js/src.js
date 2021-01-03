let buttons = document.querySelectorAll('button');
let jogada = 1;
let playerOne = '';
let playerTwo = '';
let winner = '';
let timeBefore = [];
let timeAfter = [];
let timeExacle = [];
let time;

let options = document.querySelectorAll('img');

function horizontal(matrix) {
    //horizontal
    if (matrix[0][0] === matrix[0][1] && matrix[0][0] === matrix[0][2]) {
        return true;
    } else if (matrix[1][0] === matrix[1][1] && matrix[1][0] === matrix[1][2]) {
        return true;
    } else if (matrix[2][0] === matrix[2][1] && matrix[2][0] === matrix[2][2]) {
        return true;
    } else {
        return false;
    }
}

function vertical(matrix) {
    //vertical
    if (matrix[0][0] !== null && matrix[0][0] === matrix[1][0] && matrix[0][0] === matrix[2][0]) {
        return true;
    } else if (matrix[0][0] !== null && matrix[0][1] === matrix[1][1] && matrix[0][1] === matrix[2][1]) {
        return true;
    } else if (matrix[0][0] !== null && matrix[0][2] === matrix[1][2] && matrix[0][2] === matrix[2][2]) {
        return true;
    } else {
        return false;
    }
}

function diagonal(matrix) {
    //diaganal
    if (matrix[0][0] !== null && matrix[0][0] === matrix[1][1] && matrix[0][0] === matrix[2][2]) {
        return true;
    } else if (matrix[0][0] !== null && matrix[0][2] === matrix[1][1] && matrix[0][2] === matrix[2][0]) {
        return true;
    } else {
        return false;
    }
}

function defineWinner(winer) {
    if (horizontal(matrix)) {
        winner = winer;
    } else if (vertical(matrix)) {
        winner = winer;
    } else if (diagonal(matrix)) {
        winner = winer;
    }
}

function verify(indexButton, indexMatrix001, indexMatrix002) {
    if (winner !== '' || jogada > 9) {
        let reiniciar = confirm('Jogo finalizado, deseja reiniciar?');
        reiniciar ? location.reload() : '';
    } else if (playerOne !== '') {
        exibirSimbolo(indexButton, indexMatrix001, indexMatrix002);
    } else {
        alert('Escolha o símbolo antes de jogar!');
    }
}

function timeHHmmss() {
    timeAfter[0] *= 3600;
    timeAfter[1] *= 60;

    timeBefore[0] *= 3600;
    timeBefore[1] *= 60;

    let soma1 = timeAfter.reduce((v1, v2) => {
        return v1 + v2;
    });

    let soma2 = timeBefore.reduce((v1, v2) => {
        return v1 + v2;
    });

    time = soma1 - soma2;

    if (time / 3600 >= 1) {
        timeExacle.push(Math.trunc(time / 3600));

        time = ((time / 3600) - timeExacle[0]) * 60;
        timeExacle.push(Math.trunc(time));

        time = (time - timeExacle[1]) * 60;
        timeExacle.push(Math.round(time));
    } else if (time / 60 >= 1) {
        timeExacle.push(Math.trunc(time / 60));

        time = ((time / 60) - timeExacle[0]) * 60;
        timeExacle.push(Math.round(time));
    } else {
        timeExacle.push(time);
    }

    getTime();
}

function getTime() {
    if (timeExacle.length === 3) {
        time = `${timeExacle[0]} hora(s) e ${timeExacle[1]} minuto(s) e ${timeExacle[2]} segundo(s).`;
    } else if (timeExacle.length === 2) {
        time = `${timeExacle[0]} minuto(s) e ${timeExacle[1]} segundo(s).`;
    } else {
        time = `${timeExacle[0]} segundo(s).`;
    }
}

function result() {
    let jogadasPlayer1;
    let jogadasPlayer2;
    let jogadas = jogada - 1;
    if (jogadas % 2 === 0) {
        jogadasPlayer1 = jogadas / 2;
        jogadasPlayer2 = jogadas / 2;
    } else {
        jogadasPlayer1 = Math.round(jogadas / 2);
        jogadasPlayer2 = Math.trunc(jogadas / 2);
    }

    timeHHmmss();

    let result = document.querySelector('#result');
    result.setAttribute('style', 'border: solid 1px black;');
    result.innerHTML += `<h3>Resultado:</h3>`;
    result.innerHTML += `<p><strong>Vencedor: ${winner}</strong></p>`;
    result.innerHTML += `<p><strong>Player 1(jogadas): ${jogadasPlayer1}.</strong></p>`;
    result.innerHTML += `<p><strong>Player 2(jogadas): ${jogadasPlayer2}.</strong></p>`;
    result.innerHTML += `<p><strong>Tempo: ${time}</strong></p>`;
    result.innerHTML += `<button style = "margin-bottom: 20px; width: 120px; height: 30px; cursor: pointer;"  onclick="reiniciar();">Reiniciar</button>`;
}

function exibirSimbolo(indexButton, indexMatrix001, indexMatrix002) {
    if (jogada % 2 !== 0) {
        if (matrix[indexMatrix001][indexMatrix002] !== 'xis' && matrix[indexMatrix001][indexMatrix002] !== 'circle') {
            buttons[indexButton].setAttribute('style', `background: url('icons/${playerOne}.png'); background-color: #cccccc;`);
            matrix[indexMatrix001][indexMatrix002] = playerOne;
            defineWinner('player 1!');
            if (jogada === 1) {
                let data = new Date();
                timeBefore.push(data.getHours());
                timeBefore.push(data.getMinutes());
                timeBefore.push(data.getSeconds());
            }
            jogada++;
        }
    } else {
        if (matrix[indexMatrix001][indexMatrix002] !== 'xis' && matrix[indexMatrix001][indexMatrix002] !== 'circle') {
            buttons[indexButton].setAttribute('style', `background: url('icons/${playerTwo}.png'); background-color: #cccccc;`);
            matrix[indexMatrix001][indexMatrix002] = playerTwo;
            defineWinner('player 2!');
            jogada++;
        }
    }

    if (winner !== '') {
        setTimeout(() => {
            alert(`Vitória do ${winner}`);
        });
        let data = new Date();
        timeAfter.push(data.getHours());
        timeAfter.push(data.getMinutes());
        timeAfter.push(data.getSeconds());
        result();
    } else if (jogada > 9) {
        setTimeout(() => {
            let draw = confirm(`DRAW!`);
            draw ? reiniciar() : '';
        });
        let data = new Date();
        timeBefore.push(data.getHours());
        timeBefore.push(data.getMinutes());
        timeBefore.push(data.getSeconds());
        result();
    }
}

function reiniciar() {
    location.reload();
}

options[0].onclick = function() {
    let escolha = confirm('Deseja realmente este símbolo?');
    if (escolha) {
        playerOne = 'circle';
        playerTwo = 'xis';
        document.querySelector('#player1').innerText = 'Player 1:';
        document.querySelector('#img1').innerHTML = '<img src="icons/circle.png" alt="Circulo">';
        document.querySelector('#player2').innerText = 'Player 2:';
        document.querySelector('#img2').innerHTML = '<img src="icons/xis.png" alt="Circulo">';
    }
}

options[1].onclick = function() {
    let escolha = confirm('Deseja realmente este símbolo?');
    if (escolha) {
        playerOne = 'xis';
        playerTwo = 'circle';
        document.querySelector('#player1').innerText = 'Player 1:';
        document.querySelector('#img1').innerHTML = '<img src="icons/xis.png" alt="Circulo">';
        document.querySelector('#player2').innerText = 'Player 2:';
        document.querySelector('#img2').innerHTML = '<img src="icons/circle.png" alt="Circulo">';
    }
}

let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

buttons[0].onclick = function() {
    verify(0, 0, 0);
};

buttons[1].onclick = function() {
    verify(1, 0, 1);
};

buttons[2].onclick = function() {
    verify(2, 0, 2);
};

buttons[3].onclick = function() {
    verify(3, 1, 0);
};

buttons[4].onclick = function() {
    verify(4, 1, 1);
};

buttons[5].onclick = function() {
    verify(5, 1, 2);
};

buttons[6].onclick = function() {
    verify(6, 2, 0);
};

buttons[7].onclick = function() {
    verify(7, 2, 1);
};

buttons[8].onclick = function() {
    verify(8, 2, 2);
};