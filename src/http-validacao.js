function extraiLink(arrLinks) {
  const arrResult = [];
  arrLinks.map((objLink) => {
    arrResult.push(Object.values(objLink).join(""));
  });

  return arrResult;
}

async function checkForStatus(arrUrls) {
  const arrStatus = await Promise.all(
    arrUrls.map(async (url) => {
      const response = await fetch(url ,{ method: 'HEAD'});
      return response.status;
    })
  );

  return await arrStatus;
}

export default async function verifiedList(list) {
  const links = extraiLink(list);
  const status = await checkForStatus(links);
  return status;
}

// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// }
