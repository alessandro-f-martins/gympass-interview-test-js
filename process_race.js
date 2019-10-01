/*
* +++ Módulo process_race +++
*
* Este módulo implementa um avaliador simples de resultados para corridas de Kart,
* de acordo com o solicitado para o teste prático do processo seletivo para a posição
* de Tech Lead Engineer na Gympass.
*
*/

function converteTempoStringToMilis(strTempo) {
  /*
   * Função auxiliar. Converte tempo no formato MM:SS.mmm para
   * milissegundos.
   */
  let tempoLista = strTempo.split(/:|\./);
  return parseInt(tempoLista[0])*60000 + parseInt(tempoLista[1])*1000 + 
            parseInt(tempoLista[2]);
}

function milisEmTempoStr(tempoMilis) {
  /*
   * Função auxiliar. Converte tempo em milissegundos em uma string
   * com o formato 'MM:SS.mmm'.
   */
  const mins = Math.floor(tempoMilis / 60000); 
  let segs = Math.floor((tempoMilis % 60000) / 1000);
  segs = (segs < 10 ? '0' + segs : segs);
  let milis = tempoMilis % 1000;
  if (milis < 10)
    milis = '00' + milis
  else if (milis >= 10 && milis < 100)
    milis = '0' + milis

  return mins + ':' + segs + '.' + milis;
}

function calculaRanking() {
  /*
   * Função principal do módulo. Realiza os cálculos dos valores solicitados
   */

  // Recupera os nomes dos pilotos e elimina duplicações 
  const pilotos = [...new Set(tabelaCorrida.getColuna("Piloto"))];
  const infoPilotos = {};
  
  // Estrutura de dados para conter as informações da melhor volta da prova. Seus valores são:
  // ['Cod. do piloto - Nome do piloto', Numero da melhor volta, Tempo da melhor volta]
  let melhorVoltaCorrida = ['', 0, Infinity];

  for (piloto of pilotos) {
    if (!(piloto in infoPilotos))

      // Estrutura de dados para conter as informações de cada piloto. Seus valores são:
      // {'Cod. do piloto - Nome do piloto':
      //   [Tempo total de prova, Voltas completadas, Melhor volta, Tempo da melhor volta,
      //   Velocidade media]}
      infoPilotos[piloto] = [0, 0, 0, Infinity, 0];

    let linhasPiloto = tabelaCorrida.selecionaLinhas("Piloto", piloto);
    for (linha of linhasPiloto) {

      // Os tempos das voltas são guardados em milissegundos,
      // para comodidade de cálculo
      let tempoVoltaAtual = converteTempoStringToMilis(linha[tabelaCorrida.getIndiceColuna("Tempo Volta")]);
      let velocidadeAtual = parseFloat(linha[tabelaCorrida.getIndiceColuna("Velocidade média da volta")].replace(',','.'));
      infoPilotos[piloto][1] = parseInt(linha[tabelaCorrida.getIndiceColuna("Nº Volta")]);

      // Se a volta atual for mais rápida que a anterior,
      // atribui como a melhor volta até então
      if (tempoVoltaAtual < infoPilotos[piloto][3]) {
        infoPilotos[piloto][3] = tempoVoltaAtual;
        infoPilotos[piloto][2] = infoPilotos[piloto][1];
      }

      // Acumula as voltas para totalizar o tempo de prova
      infoPilotos[piloto][0] += tempoVoltaAtual;

      // Acumula a velocidade média da volta atual para
      // posterior cálculo da velocidade média da prova
      infoPilotos[piloto][4] += velocidadeAtual;
    }

    // Verifica se a melhor volta deste piloto é a melhor volta da prova e
    // a atribui em caso positivo
    if (infoPilotos[piloto][3] < melhorVoltaCorrida[2])
      melhorVoltaCorrida = [piloto, infoPilotos[piloto][2], infoPilotos[piloto][3]];

    // Divide a velocidade média acumulada pelo número de voltas para obter
    // a média da prova para este piloto
    infoPilotos[piloto][4] = infoPilotos[piloto][4]/infoPilotos[piloto][1];
  }

  // Transfere os dados de prova obtidos para um array, para que se possam
  // ordenar suas linhas por tempo de prova
  let rankingPilotos = [];
  for (k of Object.keys(infoPilotos))
    rankingPilotos.push([k, infoPilotos[k]]);

  rankingPilotos.sort((a, b) => {return a[1][0] - b[1][0]});

  return [rankingPilotos, melhorVoltaCorrida];
}

function imprimeResultado(rankingPilotos, melhorVoltaCorrida) {
  /*
   * Função de impressão na tela dos resultados obtidos.
   */

  // Cabeçalho da tabela
  console.log('\n -- Resultados da Prova --\n');
  console.log('| Posição | Cód. Piloto | Nome Piloto   | Tempo Total de Prova | Voltas Completas | Melhor Volta   | Velocidade Média | Diferença para o Vencedor |')
  console.log('|=========|=============|===============|======================|==================|================|==================|===========================|')

  for (let i = 0; i < rankingPilotos.length; i++) {
    
    // Separam-se o código e o nome do piloto para impressão
    const pilotoCodNome = rankingPilotos[i][0].split(' – ');

    // Ajuste de espaços para a coluna 'Nome Piloto'
    let espacos = '';
    const ajusteEspacoNome = 14 - pilotoCodNome[1].length;
    for (let i = 0; i < ajusteEspacoNome; i++) {
      espacos += ' ';
    }

    // Linhas de dados da tabela. Note que rankingPilotos[0][1][0] guarda
    // o valor do tempo total de corrida do vencedor, a partir do qual são
    // calculadas as diferenças para cada piloto.
    console.log(`| ${i+1}       | ${pilotoCodNome[0]}         | ${pilotoCodNome[1]}${espacos}| ${milisEmTempoStr(rankingPilotos[i][1][0])}             | ${rankingPilotos[i][1][1]}                | ${rankingPilotos[i][1][2]}ª (${milisEmTempoStr(rankingPilotos[i][1][3])})  | ${rankingPilotos[i][1][4].toFixed(2)} km/h       | ${milisEmTempoStr(rankingPilotos[i][1][0] - rankingPilotos[0][1][0])}                  |`);
  }

  console.log('\n==========');
  console.log(`\nMelhor volta da prova: ${melhorVoltaCorrida[0]}: ${melhorVoltaCorrida[1]}ª volta (${milisEmTempoStr(melhorVoltaCorrida[2])})\n`);
}

// ++++++++++++ Execução ++++++++++++

let nomeArquivo = './corredores.data'
const tabelaCorrida = require('./race_table');

// Por default, utiliza-se o arquivo './corredores.data' para os dados,
// mas pode-se escolher na linha de comando
if (process.argv.length == 3)
  nomeArquivo = process.argv[2]

// Execução do programa propriamente dito
tabelaCorrida.carregarDoArquivo(nomeArquivo);
imprimeResultado(...calculaRanking())

