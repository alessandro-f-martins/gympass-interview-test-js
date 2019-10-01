/*
* Módulo race_table:
* 
* Este módulo implementa uma estrutura de dados representando o log
* de uma corrida de Kart, de acordo com a descrição do problema.
* Implementa os métodos básicos e suficientes de acesso aos dados do log,
* segundo os requerimentos providenciados.
* 
* Parte integrante do teste prático do processo seletivo para a posição de
* Tech Lead Engineer na Gympass.
* 
*/

const fs = require('fs');

// Estrutura de dados principal
const tabelaLog = {
  cabecalho: [],
  linhas: []
}

exports.carregarDoArquivo = function(arqTabela) {
  /* 
   * Importa os dados do arquivo 'arqTabela'
   */
  const linhasTabela = fs.readFileSync(arqTabela).toString().trim().split('\n');

  // Assume-se que as colunas são separadas por uma sucessão de dois ou
  // mais espaços, uma ou mais marcas de tabulação, ou uma combinação de ambos
  tabelaLog.cabecalho = linhasTabela[0].trim().split(/  +|\t+/);
  for (let i = 1; i < linhasTabela.length; i++) {
    tabelaLog.linhas.push(linhasTabela[i].trim().split(/  +| *\t+ */));
  }
};

exports.getIndiceColuna = function(nomeColuna) {
  /* 
   * Dado o nome da coluna, retorna seu índice (iniciado em 0)
   */
  return tabelaLog.cabecalho.indexOf(nomeColuna);
}

exports.getColuna = function(nomeColuna) {
   /* 
    * Dado o nome da coluna, retorna os seus valores
    * (semelhante a uma cláusula SQL
    * 'SELECT nomeColuna FROM tabelaLog')
    */
  let coluna = [];
  for (linhaLog of tabelaLog.linhas)
    coluna.push(linhaLog[tabelaLog.cabecalho.indexOf(nomeColuna)]);

  return coluna;
}

exports.selecionaLinhas = function(nomeColuna, valorColuna) {
   /* 
    * Dado o nome da coluna e o valor desejado, retorna
    * as linhas associadas (semelhante a uma cláusula SQL
    * 'SELECT * FROM tabelaLog WHERE nomeColuna = valorColuna')
    */
  let linhas = [];
  for (linhaLog of tabelaLog.linhas)
    if (linhaLog[tabelaLog.cabecalho.indexOf(nomeColuna)] == valorColuna)
      linhas.push(linhaLog);

   return linhas;
}
