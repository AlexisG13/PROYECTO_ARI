import {create} from 'xmlbuilder2'
const root = create().ele('clientes');
document.getElementById("button").addEventListener("click",generateXML);



async function generateXML(){
  const splitter = document.getElementById('splitter').value;
  const xmlContent = await parseText(splitter);
  const originalFileName = document.getElementById('txtFile').files[0].name.split('.')[0];
  //const file = new File([xml], `${originalFileName}.xml`);
  download(`${originalFileName}.xml`,xmlContent);
}

async function parseText(splitter){
  let file = document.getElementById('txtFile').files[0];
  const fileContent = await file.text();
  const clients = fileContent.split('\n');
  clients.forEach(client => {
      const clienteData = client.split(splitter);
      if(clienteData.length != 6) throw 'La información del cliente es incorrecta';
      root.ele('cliente')
      .ele('documento').txt(clienteData[0]).up()
      .ele('primer-nombre').txt(clienteData[1]).up()
      .ele('apellido').txt(clienteData[2]).up()
      .ele('credit-card').txt(clienteData[3]).up()
      .ele('tipo').txt(clienteData[4]).up()
      .ele('telefono').txt(clienteData[5]).up()
      .up();
  });
  const xml = root.end({ prettyPrint: true });
  return xml;
}

function download(filename, text) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
