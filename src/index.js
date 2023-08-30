import fs, { fstatSync, readFile } from 'fs'
import chalk from 'chalk';

const log = console.log;



async function takeFile(path)
{   
    
    try {
        const enconding = 'utf-8' 
        const texto = await fs.promises.readFile(path, enconding)
        return extraiLink(texto)
    }
    catch(erro)
    {
        trataError(erro)
    }
    finally 
    {
        console.log(chalk.yellow('operação concluída'));
    }
}

function trataError(erro)
{   
    
    throw new Error(chalk.red(erro.errno, 'no such file found on this dir'))
    
}

function extraiLink(texto)
{
    const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; 

    const capturas =[...texto.matchAll(regex)] 
    
    const result = capturas.map(captura => ({[captura[1]]: captura[2]}))
    
    return result.length !== 0? result : "Sem match de links no arquivo passado"
}

export default takeFile;




