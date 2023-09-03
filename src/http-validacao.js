function extractLinksFromObjLinks(objLinks) {
  const arrResult = [];
  objLinks.map((objLink) => {
    arrResult.push(Object.values(objLink).join(""));
  });
  return arrResult;
}

async function checkForStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return response.status;
      } catch (error) {
        return errorHandler(error, error.cause.code);
      }
    })
  );

  return arrStatus;
}

function errorHandler(err, code) {
  if (err.cause.code === "ENOTFOUND") {
    return `COD DE ERRO: ${code} LINK NAO ENCONTRADO`;
  } else {
    return "algo inesperado aconteceu";
  }
}

export default async function verifiedList(list) {
  const links = extractLinksFromObjLinks(list);
  const status = await checkForStatus(links);

  return list.map((obj, i) => ({
    ...obj,
    status: status[i],
  }));
  //.filter(obj => obj["status"] != 200)
}
