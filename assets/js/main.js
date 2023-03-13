const form = document.querySelector('#form');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');
  const inputIdade = e.target.querySelector('#idade')
  const inputGenero = e.target.querySelector('#genero')

  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);
  const idade = Number(inputIdade.value);
  const genero = (inputGenero.value);

  if (!peso) {
      setResultado('Peso inválido', false);
      return;
  }
  if (!altura) {
      setResultado('Altura inválida', false);
      return;
  }
  if (!genero) {
    setResultado('Gênero inválido', false);
    return;
  }
  if (!idade) {
    setResultado('Idade inválida', false);
    return;
  }
  
  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);
  const agua = getAgua(peso);
  const calorias = getCalorias(genero, peso, altura, idade)

  const msg = `Seu IMC é ${imc} (${nivelImc}). <br/> Precisa beber ${agua} Litros de Água por dia. <br/> Precisa ingerir por dia ${calorias} Calorias.`
  setResultado(msg, true);
});

function getNivelImc (imc) {
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) {
    return nivel[5];
  }
  if (imc >= 34.9) {
    return nivel[4];
  }
  if (imc >= 29.9) {
    return nivel[3];
  }
  if (imc >= 24.9) {
    return nivel[2];
  }
  if (imc >= 18.5) {
    return nivel[1];
  }
  if (imc < 18.5) {
    return nivel[0];
  }
}

function getCalorias (genero, peso, altura, idade) {
  if (genero === 'M') {
    const calorias = (13.75 * peso) + (5 * altura) - (6.75 * idade) + 66.5;
    return calorias.toFixed(2)
  } 

  if (genero === 'F') {
    const calorias = (9.56 * peso) + (1.85 * altura) - (4.68 * idade) + 665;
    return calorias.toFixed(2)
  }
}

function getImc (peso, altura) {
  altura = altura.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1.")
  const imc = peso / Number(altura) ** 2;
  return imc.toFixed(2);
}

function getAgua (peso) {
  const agua = peso * 35
  const formatNumber = agua.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  return formatNumber
}

function criaP () {
  const p = document.createElement('p');
  return p;
}

function setResultado (msg, isValid){
  const resultado = document.querySelector('#resultado')
  resultado.innerHTML = '';

  const p = criaP();

  if (isValid) {
    p.classList.add('paragrafo-resultado')
  } else {
    p.classList.add('bad')
  }
  p.innerHTML = msg
  resultado.appendChild(p);
}