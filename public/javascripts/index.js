var jsonArr = [];
var newArr = [];
var createJSON = []
var txtDelimitador = '';
document.getElementById('inputfile-txt')
    .addEventListener('change', function () {
        txtDelimitador = document.getElementById('delimitador').value;
        if(txtDelimitador.length === 0){
            alert('Se necesita una key');
            location.reload();
        }
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById('output')
                .textContent = fr.result;
            jsonArr.push(fr.result.split('\n'));
            jsonArr[0].forEach(element => {
                newArr.push(element.split(txtDelimitador))
            });

            for (let i = 0; i < newArr.length; i++) {

                createJSON = [...createJSON, {
                    documento: newArr[i][0],
                    nombre: newArr[i][1],
                    apellido: newArr[i][2],
                    credit_card: newArr[i][3],
                    tipo: newArr[i][4],
                    telefono: newArr[i][5]
                }]

            }
            document.getElementById('outputjson')
                .textContent = JSON.stringify(createJSON, null, '\t')


        }
        var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.innerHTML = "Save Json file";
        btn.id = "btn-savejson"
        btn.addEventListener('click', clicked)            // Insert text
        document.getElementById("savejsonbtn").appendChild(btn);
        fr.readAsText(this.files[0]);
    })

function clicked() {
    const key = document.getElementById('key').value;
    document.getElementById('btn-savejson').addEventListener('click', function () {
        fetch('http://localhost:3000/generarJWT',{
            method:'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                json: createJSON,
                key 
            })
        }).then(res => res.json() )
          .then( json => document.getElementById('textoJWT').textContent = json.newJwt);
    })
}
let txtBody = '';
let delimitador = '';

document.getElementById('inputfile').addEventListener('change', function () {

    delimitador = document.getElementById('input-del').value
    
    if (delimitador.length > 0) {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('json-upload-show')
                .textContent = reader.result
            var obj = JSON.parse(reader.result)

            obj.forEach(element => {
                const valuesJSON = Object.values(element);
                txtBody += (valuesJSON.join(delimitador) + '\n')
                document.getElementById('txt-response')
                    .textContent = txtBody
            });

            var btnText = document.createElement("BUTTON");
            btnText.innerHTML = "Save txt file"
            btnText.id = "btn-savetxt"
            btnText.addEventListener('click', download(txtBody, 'json.txt', 'text/plain'))
            document.getElementById("savetxtbtn").appendChild(btnText);

        }
        reader.readAsText(this.files[0]);
    } else {
        alert('selecciona un delimitador.')
        location.reload();
    }

});

function download(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    console.log('clicked');
    a.click();
    URL.revokeObjectURL(a.href);
}

