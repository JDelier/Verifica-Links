import chalk from 'chalk';
import takeFile from './index.js';
import fs from 'fs';
import verifiedList from './http-validacao.js'

const log = console.log;
const path = process.argv

async function imprimeLista(valida,resultado, identifier = "")
{
	if(valida)
	{
		log(
			chalk.yellow('verified list'),
			chalk.black.bgGreen(identifier),
			await verifiedList(resultado)
			)
	} else
	{
		log(
			chalk.yellow('verified list'),
			chalk.black.bgGreen(identifier),
			resultado
		)
	}
	
	
	
	return resultado
}

function validaAberturaArquivo(argCount)
{
	if(argCount < 3 )
	{
		throw new Error(chalk.red(`Usage: node file.js path_target_file.md)`))
	}
	return;
}

async function processText(args)
{
	const path = args[2]
	const flag = args[3] === '--valida'

	try 
	{
		fs.lstatSync(path);
	} catch (error) {
		if(error.code === 'ENOENT') {
		   log(`Código de erro: [${chalk.white(error.code)}] ${chalk.red('Arquivo ou diretório não existe')}`);
		   return;
		}
	}

	const isFile = fs.lstatSync(path).isFile()
	const isDir =  fs.lstatSync(path).isDirectory()

	if(isFile)
	{	
		const resultOfReadFile = await takeFile(path);
		imprimeLista(flag, resultOfReadFile)
	} else if (isDir)
	{   // isDir é true quando o caminho passado é de um diretorio;
		// readdir le o diretorio e devolve um array com o nome dos arquivos
		const resultOfReadDir = await fs.promises.readdir(path)

		// cada indice dentro do array de resultado da fn readdir é um nome de arquivo
		// alem disso, forEach é uma função, entao precisa da palavra chave async, pq takeFile(fn callback) é fn assincrona
		resultOfReadDir.forEach(async (fileName) => {
			const list = await takeFile(`${path}${fileName}`)
			
			imprimeLista(flag, list, fileName)
			return list;
		})
	}

	
}

validaAberturaArquivo(path.length)

processText(path)




