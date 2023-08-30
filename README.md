# O que aprendi com esse projeto?

- Ao iniciar, criamos um arquivo package.json com o comando npm init (ou yarn init)
- para instalação de libs externas: "npm install <\nome do pacote>" (ou "yarn add <\nome do pacote>")
- Oque são npm e yarn? gerenciadores de pacote.


## Gerenciadores de pacote (npm = node package manager)

- São repositórios de código aberto com soluções já feitas de problemas recorrentes.
- Pacote é o conjunto de código disponibilizado para execução.

### instalação global vs. local

- default: utilize a instalação local.
- Local: servirá apenas para o projeto atual onde está instalado (localmente).
- Global: servirá pra todos os projetos que você trabalha na sua máquina. (instalado no diretório geral do NPM)
	- instalação global: "npm install -g <\nome do pacote>" ou em yarn: "yarn add global <\nome do pacote>"

### instalando dependências

Este exemplo será feito utilizando o [chalk](https://www.npmjs.com/package/chalk).

- instalação padrão é feita por "npm install chalk" ou "npm i chalk"
- alternativamente, caso queira especificar uma versão diferente:
	comando: "npm install chalk@n.n.n --save-exact"
Onde: n.n.n é o número da versão específica.
Após rodar o comando, os arquivos do Chalk serão puxados do repositório do NPM pro terminal local.
no IDE, a pasta "node_modules" foi baixada.

![[Pasted image 20230829180650.png]]

Não pode esquecer de importar a biblioteca dentro do projeto
	" import chalk from 'chalk' "

E de adcionar, dentro do arquivo "package.json"  o tipo "modulo"
	"type": "module"
sem isso o terminal indicará um erro: "não podemos usar o _statement_ `import` fora de um módulo."
Além disso, é aconselhável adcionar o "node_modules" no .gitignore.
Após, é só ler a página da lib sendo usada, e como é feita a sua devida utilização.


## Explicação de dependências e módulos

- Módulos e pacotes:
	Módulos servem para encapsular e esconder funções de um código do resto da aplicação, expondo só o necessário
	"pacotes" é como são chamados os módulos que são ou estão instalados em um aplicação.
- Dependências:
	termo que referencia os pacotes(terceiros) dos quais um programa DEPENDE para funcionar.



# Biblioteca FS (File system)

- É uma lib nativa do NodeJS, o que dispensa sua instalação.
- sua funcionalidade: "possibilitar a interação entre linguagens de programação e arquivos do computador."
 importando:
 ` import fs from 'fs'; `

- FS: readFile

```
const encoding = 'utf8' 

 fs.readFile(path, encoding, (err,data)=> {
 	if(err)
 	{
 // lida com erro
 	} 
 	console.log(data)
 })
```


Acima temos a chamada do método 'readFile' presente na 'lib' 'fs', esse método necessita de 3 parâmetros, sendo o caminho do arquivo, o 'encodig' de texto ('utf-8'), e uma 'fn callback'.
'readFile' já é preparado pra repassar o erro pra frente, e assim podemos tratar caso ele ocorra.
```
function trataErro(err)
{
	throw new Error('algo inesperado aconteceu')
	}

a função ficaria assim:

fs.readFile(path,encoding, (err, data) => {
	if(err) {
		trataErro(err)
	}
	console.log(data)
}
```
`


## Código síncrono vs. Código assíncrono.

Códigos síncronos: são executados em sequência, uma instrução após a outra.
	quando se sabe exatamente quando uma tarefa será realiza, é fácil de manter o fluxo do código, portanto podemos simplesmente escrever códigos síncronos, que seguem uma etapa após a outra.
	
Códigos assíncronos: Não esperam a finalização de uma tarefa para iniciar a outra.
	quando não se sabe quanto tempo levará para a execução de uma tarefa, não podemos esperar pra que ela seja finalizada e siga o fluxo do código, para isso utilizamos códigos assíncronos.


### Promises
- É código assíncrono
- No JS, existem várias formas de lidar com promessas
	- .then, async, await: utilizados quando temos que lidar com promessas já existentes. (ex: quando estamos lidando com o método 'fetch()' que sempre retorna uma promessa)
	- metodo construtor Promise(): escreve do 0 uma nova promessa. (sempre funciona com reject e resolve)
	
Possíveis estados de promessa:
- Fulfilled (realizada, completa) { retornou os dados }
- Rejected (rejeitada) { executou código que não devia }
	- Não Fulfilled nem rejected { pending ( não se sabe o resultado final ainda) }
- Settled (concluída) - finalizada, independente se for fulfilled ou rejected

Uma vez que a promessa esta em settled seu resultado não se altera mais.



## Usando CLI (Command Line Interface)


### 'argv' = 'arguments vector' 

- é uma lista dos argumentos passados no terminal;
 no node use `process.argv`
``` 
const path = process.argv;

```
Ao executarmos no terminal o seguinte comando : "node src/nome-arquivo.js texto-qualquer"

O valor salvo na variável path é um array de valores:
[
  '/home/user/.asdf/installs/nodejs/20.2.0/bin/node',
  '/home/user/Projects/NodeJS/NProjects/Verify-Links_MD/src/cli.js',
  'texto-qualquer'
  
]

Índice 0 : remete ao 'node', e retorna o caminho onde fica os executáveis do node.
Índice 1 : remete ao 'src/nome-arquivo' e retorna o caminho absoluto do diretório/arquivo atual
Índice 3: remete ao 'texto-qualquer' retorna a qualquer argumento passado naquela posição.

Com isso em mente, podemos passar o caminho e o nome do arquivo que vamos utilizar como argumentos.
Alternativamente eu implementei uma função que captura o número de argumentos passados, e caso não seja passado argumentos adicionais além do 'node src/nome-arquivo', ele joga um erro e informa o método de uso do script.

### Caminho absoluto vs. caminho relativo

- Caminho absoluto, quando a localização de pasta ou arquivo é especificada a partir do diretório-raiz do sistema.
- Relativo, quando é a localização de pasta ou arquivo é feita em relação ao pwd, present work directory.


