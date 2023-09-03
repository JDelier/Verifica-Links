import fs, { fstatSync, readFile } from "fs";
import chalk from "chalk";

const log = console.log;

async function takeFile(path) {
  try {
    const enconding = "utf-8";
    const content = await fs.promises.readFile(path, enconding);
    return extraiLink(content);
  } catch (err) {
    trataError(err);
  } finally {
    log(chalk.yellow("operação concluída"));
  }
}

function trataError(err) {
  throw new Error(chalk.red(err.errno, "no such file found on this dir"));
}

function extraiLink(text) {
  const regex = /\[([^\[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;

  const matchs = [...text.matchAll(regex)];

  const result = matchs.map((match) => ({ [match[1]]: match[2] }));

  return result.length !== 0 ? result : "Sem match de links no arquivo passado";
}

export default takeFile;


