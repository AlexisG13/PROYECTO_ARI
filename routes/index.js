var express = require('express');
const { create } = require('xmlbuilder2');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/generarXML',async function(req,res,next){
    const {txt , delimitador, key} = req.body;
    console.log(txt);
    const xml = await parseText(txt, delimitador, key);
    res.json({ xml});
})

router.post('/generarJWT',function(req,res,next){
  console.log(req.body);
  const {json , key} = req.body;
  const newJwt = jwt.sign({clientes: json}, key);
  console.log(newJwt);
  res.json({newJwt});
})

function parseText( text , splitter , key){
  const root = create().ele('clientes');
  const clients = text.split('\n');
  clients.forEach(client => {
      const clienteData = client.split(splitter);
      if(clienteData.length != 6) throw 'La información del cliente es incorrecta';
      const tarjetaEncriptada = encrypt(parseInt(clienteData[3]), key);
      root.ele('cliente')
      .ele('documento').txt(clienteData[0]).up()
      .ele('primer-nombre').txt(clienteData[1]).up()
      .ele('apellido').txt(clienteData[2]).up()
      .ele('credit-card').txt(tarjetaEncriptada).up()
      .ele('tipo').txt(clienteData[4]).up()
      .ele('telefono').txt(clienteData[5]).up()
      .up();
  });
  const xml = root.end({ prettyPrint: true });
  return xml;
}

function encrypt(numeros, key){
 
    auxNumeros=numeros.toString();
    ArrayNum=auxNumeros.split("");

    auxKey=key.toString();
    ArrayKey=auxKey.split("");


   let matric= [
    [0,1,2,3,4,5,6,7,8,9],
    [1,2,3,4,5,6,7,8,9,0],
    [2,3,4,5,6,7,8,9,0,1],
    [3,4,5,6,7,8,9,0,1,2],
    [4,5,6,7,8,9,0,1,2,3],
    [5,6,7,8,9,0,1,2,3,4],
    [6,7,8,9,0,1,2,3,4,5],
    [7,8,9,0,1,2,3,4,5,6],
    [8,9,0,1,2,3,4,5,6,7],
    [9,0,1,2,3,4,5,6,7,8]]

    let cifrado=[];

  for(let i=0;i<13;i++){
    let x= parseInt(ArrayNum[i]);
    let y= parseInt(ArrayKey[i]);
    cifrado.push(matric[x][y]);
}

let numeroCifrado = '';
for(let i=0;i<13;i++){
    console.log(cifrado[i]);
    numeroCifrado += cifrado[i];
}
 return numeroCifrado;
}

function decrypt(num, key){


    auxNumeros=num.toString();
    ArrayNum=auxNumeros.split("");

    auxKey=key.toString();
    ArrayKey=auxKey.split("");

    let matric= [
        [0,1,2,3,4,5,6,7,8,9],
        [1,2,3,4,5,6,7,8,9,0],
        [2,3,4,5,6,7,8,9,0,1],
        [3,4,5,6,7,8,9,0,1,2],
        [4,5,6,7,8,9,0,1,2,3],
        [5,6,7,8,9,0,1,2,3,4],
        [6,7,8,9,0,1,2,3,4,5],
        [7,8,9,0,1,2,3,4,5,6],
        [8,9,0,1,2,3,4,5,6,7],
        [9,0,1,2,3,4,5,6,7,8]]

    //let decifrado=[];
    let decifrado="";

    for(let i=0;i<13;i++){

        for(let j=0;j<10;j++){

            if(matric[parseInt(ArrayKey[i])][j]==ArrayNum[i]){
                //console.log(matric[parseInt(ArrayKey[i])][j]);
                decifrado+=j.toString();
            }

        }

    }
    console.log(decifrado);
}

module.exports = router;
