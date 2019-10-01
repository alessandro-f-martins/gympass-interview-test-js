Avaliador de Corridas 
=====================
*Um teste de desenvolvimento para o processo seletivo de Tech Lead Engineer para a Gympass*

***Autor:*** Alessandro Martins  
***Data***: 01/10/2019



Introdução
----------

A presente aplicação foi desenvolvida por Alessandro Martins em 1º de outubro de 2019 de acordo com as especificações encontradas no site https://github.com/Gympass/interview-test.

A aplicação baseia-se nos módulos `process_race.js` e `race_table.js`. A aplicação é inicializada com um arquivo de dados sobre uma prova de Kart e realiza as seguintes análises:

  - Tabela com o resultado final da prova, contendo, por piloto:
    - Posição de chegada
    - Código do piloto
    - Nome do piloto
    - Número de voltas completadas
    - Tempo total de prova
    - Volta mais rápida
    - Velocidade média na prova
    - Diferença de tempo para o vencedor

  - Volta mais rápida da prova



Utilização
----------

### Pré-requisitos

A aplicação é escrita em *Javascript* para *NodeJS*, logo certifique-se de ter o *node* instalado no computador. 

### Execução

A aplicação envolve dois módulos:

  - `process_race.js`: Módulo executável. Implementa o avaliador de resultados para corridas de Kart. Apresenta as seguintes funções:
    * `converteTempoStringToMilis(strTempo)`: Função auxiliar. Converte tempo no formato MM:SS.mmm para milissegundos.
    * `milisEmTempoStr(tempoMilis)`: Função auxiliar. Converte tempo em milissegundos em uma string com o formato 'MM:SS.mmm'.
    * `calculaRanking()`: Função principal do módulo. Realiza os cálculos dos valores solicitados
    * `imprimeResultado(rankingPilotos, melhorVoltaCorrida)`: Função de impressão na tela dos resultados obtidos.

  - `race_table.js`: implementa uma estrutura de dados representando o log de uma corrida de Kart, de acordo com a descrição do problema. Implementa os métodos básicos e suficientes de acesso aos dados do log, segundo os requerimentos providenciados. Expõe as seguintes funções/métodos:
    * `carregarDoArquivo(arqTabela)`: Importa os dados do arquivo 'arqTabela'
    * `getIndiceColuna(nomeColuna)`: Dado o nome da coluna, retorna seu índice (iniciado em 0) 
    * `getColuna(nomeColuna)`: Dado o nome da coluna, retorna os seus valores (semelhante a uma cláusula SQL `SELECT nomeColuna FROM tabelaLog`)
    * `selecionaLinhas(nomeColuna, valorColuna)`: Dado o nome da coluna e o valor desejado, retorna as linhas associadas (semelhante a uma cláusula SQL `SELECT * FROM tabelaLog WHERE nomeColuna = valorColuna`)

A aplicação é executada com o seguinte comando:

```shell
$ node process_race.js <arqDados>
```

, onde *<arqDados>* é o arquivo de log de prova a ser analisado. Se omitido, assumirá por default o valor "*corredores.data*".

Detalhes da implementação
-------------------------

### Utilização de recursos básicos da linguagem Javascript para NodeJS

Cumprindo um dos requerimentos do teste, não foi utilizado qualquer *framework* Javascript na construção desta aplicação. Desta forma, não se faz necessária a instalação de nenhuma biblioteca adicional além do módulo `fs` (manipulação de arquivos), já fornecido pela linguagem.


### Sobre a obtenção e tratamento do arquivo de dados

Os dados foram obtidos pela cópia e colagem do painel de texto fornecido na página do teste. 

O arquivo dado como exemplo possui irregularidades na separação dos campos, com caracteres de espaço e tabulação combinados. Para respeitar a proposta do teste, assumiu-se que o *programa deva ser capaz de tratar tais pontos*, e toda limpeza de dados é realizada pelo código, sem modificação ou preparação externa. A única correção realizada foi no valor do nome "038 – F.MASS", na linha 17, para "038 – F.MASSA", por uma questão de consistência e assumindo-se que se trata de um erro de digitação.



Testes
------

A tela de resultados abaixo é resultado da execução do módulo `process_race.js`:

```shell 

$ node process_race.js corredores.data

 -- Resultados da Prova --

| Posição | Cód. Piloto | Nome Piloto   | Tempo Total de Prova | Voltas Completas | Melhor Volta   | Velocidade Média | Diferença para o Vencedor |
|=========|=============|===============|======================|==================|================|==================|===========================|
| 1       | 038         | F.MASSA       | 4:11.578             | 4                | 3ª (1:02.769)  | 44.25 km/h       | 0:00.000                  |
| 2       | 002         | K.RAIKKONEN   | 4:15.153             | 4                | 4ª (1:03.076)  | 43.63 km/h       | 0:03.575                  |
| 3       | 033         | R.BARRICHELLO | 4:16.080             | 4                | 3ª (1:03.716)  | 43.47 km/h       | 0:04.502                  |
| 4       | 023         | M.WEBBER      | 4:17.722             | 4                | 4ª (1:04.216)  | 43.19 km/h       | 0:06.144                  |
| 5       | 015         | F.ALONSO      | 4:54.221             | 4                | 2ª (1:07.011)  | 38.07 km/h       | 0:42.643                  |
| 6       | 011         | S.VETTEL      | 6:27.276             | 3                | 3ª (1:18.097)  | 25.75 km/h       | 2:15.698                  |

==========

Melhor volta da prova: 038 – F.MASSA: 3ª volta (1:02.769)


```

