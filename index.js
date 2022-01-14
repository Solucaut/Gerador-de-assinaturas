// encontra o botao
const buttonCopiar = document.getElementById('btn-copiar')
//configura a funcao que sera chamada uando ele for pressionado
buttonCopiar.onclick = copiar;

// Encontra as inputs
const nomeInput = document.getElementById('nome');
const sobrenomeInput = document.getElementById('sobrenome');
const celularInput = document.getElementById('celular');
const cargosInput = document.getElementById('cargos');

// adiciona um metodo que realiza uma funcao quando um eventoacontece
// no caso o evento chama-se: "input" e ocorre quando o texto digitado se altera
// ou quando o valor selecionado altera
nomeInput.addEventListener('input', () => btn())
sobrenomeInput.addEventListener('input', () => btn())
celularInput.addEventListener('input', () => btn())
cargosInput.addEventListener('input', () => btn())

// encontra os campos a serem preenchidos na assinatura
const nomeCompletoField = document.getElementById('nome-assinatura');
const celularField = document.getElementById('celular-assinatura');
const cargoField = document.getElementById('cargo-assinatura');

function btn() {
  // recebe as informacoes das inputs
  var nome = nomeInput.value;
  var sobrenome = sobrenomeInput.value;
  var celular = celularInput.value;
  var cargo = cargosInput.options[cargosInput.selectedIndex].value;

  let nomeCompleto = nome + ' ' + sobrenome

  // coloca os valores nos lugares na assinatura
  nomeCompletoField.innerHTML = editaNome(nomeCompleto);
  celularField.innerHTML = editaCelular(celular)
  cargoField.innerHTML = cargo;

  // configura os atributos de link
  celularField.setAttribute('href', `https://wa.me/55${editaCelular(celular).replace(/ /g, '')}`);
  // wa.me e o site que redireciona para o whatsapp com o numero a frente
}

function editaNome(nome) {
  let palavras = nome.split(' ')
  // separa o nome em palavras: "diego ferreira" -> ["diego", "ferreira"]
  for (let i = 0; i < palavras.length; i++) {
    // itera entre cada palavra, transformando a primeira letra em maiuscula
    palavras[i] = primeirasMaiusculas(palavras[i])
  }
  if (palavras.join(' ') == ' ') {
    // se não houver nada, quer dizer que o usuario apagou tudo nas inputs
    // portanto, retorna o valor inicial
    return 'Nome Sobrenome'
  }
  // senão, retorna as palavras juntas
  //["Diego", "Ferreira"] -> "Diego Ferreira"
  return palavras.join(' ')
}

function primeirasMaiusculas(palavra) {
  // Retorna a palavra com a primeira letra maiuscula
  let n = palavra.length;
  if (n > 1) {
    // se a palavra tiver mais de uma letra
    let primeiraLetra = palavra[0].toUpperCase() //coloca a primeira maiuscula
    let resto = palavra.slice(1) //coloca da segunda letra para frente: "diego".slice(1) = "iego"
    palavra = primeiraLetra + resto; //junta tudo
    return palavra
  } else {
    // se for só uma letra, coloca ela maiuscula
    return palavra.toUpperCase()
  }
}

function editaCelular(cel) {
  try {
    // retira todos os espacos e simbolos que o usuario possa ter digitado
    cel = cel.replace(/ /g, '');
    cel = cel.replace(/\(/g, '');
    cel = cel.replace(/\)/g, '');
    cel = cel.replace(/\-/g, '');
    let n = cel.length;
    // retorna o celular no formato certo com espaçamentos
    // para facilitar a visualizacao esse processo e feito em partes:
    if (n === 0) {
      // se nao houver numero, retorna o padrao
      return '99 99999 9999'
    } else if (n < 3) {
      // se for menor que 3, o usuario so digitou o DDD
      // portanto retorna o que ele digitou
      return cel
    } else if (n < 7) {
      // se for menor que 7, o usuario so digitou o DDD e os 5 primeiros numeros
      // portanto retorna o que ele digitou com o espaco depois do DDD
      // ex: "14997..." -> "14 997..."
      return cel.slice(0, 2) + ' ' + cel.slice(2)
    } else if (n <= 11) {
      // se for menor ou igual a 11
      // o usuario so digitou o DDD e os 5 primeiros numeros e iniciou (ou completou) o resto
      // portanto retorna o que ele digitou com o espaco depois do DDD e mais um espaço separando o umero em 2
      // ex: "141234567..." -> "14 12345 67..."
      return cel.slice(0, 2) + ' ' + cel.slice(2, 7) + ' ' + cel.slice(7)
    } else {
      // se passar de 11, envie a mensagem de erro
      alert('Coloque o telefone no formato 12 12345 1234 (com 11 números)')
      return '99 99999 9999'
    }
  } catch (err) { }
}

function copiar() {
  // seleciona a area onde a assinatura esta
  var area = document.getElementById("assinatura-div");
  if (document.body.createTextRange) {
    // para browsers antigos
    // cria um elemento chamado "range", move a area para dentro dele e o seleciona
    var range = document.body.createTextRange();
    range.moveToElementText(area);
    range.select();
    // executa o comando de copiar
    document.execCommand("Copy");
    alert("Copiado para a area de transferência");
  } else if (window.getSelection) {
    // para os outros
    // cria um elemento chamado "range", move a area para dentro dele e o seleciona
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(area);
    selection.removeAllRanges();
    selection.addRange(range);
    // executa o comando de copiar
    document.execCommand("Copy");
    alert("Copiado para a area de transferência");
  }
}
