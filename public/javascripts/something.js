document.getElementById("button").addEventListener("click", generateXML);


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

function download(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    console.log('clicked');
    a.click();
    URL.revokeObjectURL(a.href);
}
