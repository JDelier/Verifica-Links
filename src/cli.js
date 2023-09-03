import chalk from "chalk";
import takeFile from "./index.js";
import fs from "fs";
import verifiedList from "./http-validacao.js";
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
 
const log = console.log;
const argv = yargs(hideBin(process.argv)).argv
// processa o texto dentro do arquivo ou arquivos
async function processText() {
  const path = argv["_"][0];
  const flag = argv.v

  try {
    fs.lstatSync(path);
  } catch (err) {
    if (err.code === "ENOENT") {
      log(
        `Código de erro: [${chalk.white(err.code)}] ${chalk.red(
          "Arquivo ou diretório não existe"
        )}`
      );
      return;
    }
  }

  const isFile = fs.lstatSync(path).isFile();
  const isDir = fs.lstatSync(path).isDirectory();

  if (isFile) {
    const resultOfReadFile = await takeFile(path);
    writeList(flag, resultOfReadFile);
  } else if (isDir) {
    // isDir é true quando o caminho passado é de um diretorio;
    // readdir le o diretorio e devolve um array com o nome dos arquivos
    const resultOfReadDir = await fs.promises.readdir(path);
    // cada indice dentro do array de resultado da fn readdir é um nome de arquivo
    // alem disso, forEach é uma função, entao precisa da palavra chave async, pq takeFile(fn callback) é fn assincrona
    resultOfReadDir.forEach(async (fileName) => {
      const content = await takeFile(`${path}${fileName}`);

      writeList(flag, content, fileName);
      return content;
    });
  }
}

async function writeList(flag, result, identifier = "") {
  if (flag) {
    log(
      chalk.yellow("verified list"),
      chalk.black.bgGreen(identifier),
      await verifiedList(result)
    );
  } else {
    log(
      chalk.yellow("list"),
      chalk.black.bgGreen(identifier),
      result
    );
  }

  return result;
}

function validPath(argCount) {
  if (argCount < 3) {
    throw new Error(chalk.red(`Usage: node file.js path_target_file.md)`));
  }
  return;
}



// exec


processText();
