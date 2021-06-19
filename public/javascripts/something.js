document.getElementById("button").addEventListener("click", generateXML);
document.getElementById('xmlButton').addEventListener('click', convertXML);
document.getElementById('jwtButton').addEventListener('click', getJSON);

async function generateXML(){
  const splitter = document.getElementById('splitter').value;
  const fileContent = await  document.getElementById('txtFile').files[0].text();
  const originalFileName = document.getElementById('txtFile').files[0].name.split('.')[0];
  const key = document.getElementById('keyXML').value;
  const xmlContent = await fetch('http://localhost:3000/generarXML',{
    method : 'POST',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
      txt: fileContent,
      delimitador: splitter,
      key
    })
  }).then(res => res.json()).then(json => json.xml);
  download(xmlContent, originalFileName, 'text/xml');
}

async function convertXML(){
  const splitter = document.getElementById('xmlSplitter').value;
  const fileContent = await  document.getElementById('xmlFile').files[0].text();
  const originalFileName = document.getElementById('xmlFile').files[0].name.split('.')[0];
  const key = document.getElementById('keyTxt').value;
  const txtContent = await fetch('http://localhost:3000/convertirXML',{
    method : 'POST',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
      xml: fileContent,
      delimitador: splitter,
      key
    })
  }).then(res => res.json()).then(json => json.txt);
  download(txtContent, originalFileName, 'text/plain');
}

async function getJSON(){
  const jwtString = document.getElementById('jwt-input').value;
  const secret = document.getElementById('jwt-secret').value;
  const jsonObject = await fetch('http://localhost:3000/generarJSON',{
    method : 'POST',
    headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
      jwtString,
      secret
    })
  }).then(res => res.json()).then(json => json.jsonObject)
  document.getElementById('output-jwt').textContent = JSON.stringify(jsonObject);
}


function download(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    console.log('clicked');
    a.click();
    URL.revokeObjectURL(a.href);
}
