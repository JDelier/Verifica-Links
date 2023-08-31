import chalk from 'chalk'

const log = console.log;

function extraiLink(arrLinks) {
  const arrResult = [];
  arrLinks.map((objLink) => {
    arrResult.push(Object.values(objLink).join(""));
  });

  return arrResult;
}

async function checkForStatus(arrUrls) {
  const arrStatus = await Promise
  .all(
    arrUrls.map(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD'});
        return response.status;  
      } catch (error) {
        return errorHandler(error, error.cause.code)
      }
      
    })
  );

  return arrStatus;
}

 function errorHandler(err,code)
{ 
  if(err.cause.code === 'ENOTFOUND')
  {
    return `COD DE ERRO: ${code} LINK NAO ENCONTRADO`
  } else {
      return "Fck mate, what hell its going on?"
  }

}

export default async function verifiedList(list) {
  const links = extraiLink(list);
  const status = await checkForStatus(links);
  
  return list.map((obj , i) =>({
    ...obj,
    status: status[i]
   })) 
   //.filter(obj => obj["status"] != 200)

}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }
