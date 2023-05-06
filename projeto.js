const create = document.getElementById('criar');//referencia o botao criar
const formPaciente = document.getElementById('cadastroPaciente');

async function pegaInformation() {
    event.preventDefault()
    const cpf = document.getElementById('cpfUsuario');
    const nome = document.getElementById('nomeUsuario');
    const data_nascimento = document.getElementById('dataNascimentoUsuario');
    const email = document.getElementById('emailUsuario');
    const sexo = document.getElementById('sexoUsuario');
    const nacionalidade = document.getElementById('nacionalidadeUsuario');
    const naturalidade = document.getElementById('naturalidadeUsuario');
    const profissao = document.getElementById('profissaoUsuario');
    const escolaridade = document.getElementById('escolaridadeUsuario');
    const estado_civil = document.getElementById('estadoCivilUsuario');
    const mae = document.getElementById('maeUsuario');
    const pai = document.getElementById('paiUsuario');

    const valor = {
        cpfUser: cpf.value,
        nomeUser: nome.value,
        data_nascimentoUser: data_nascimento.value,
        emailUser: email.value,
        sexoUser: sexo.value,
        nacionalidadeUser: nacionalidade.value,
        naturalidadeUser: naturalidade.value,
        profissaoUser: profissao.value,
        escolaridadeUser: escolaridade.value,
        estado_civilUser: estado_civil.value,
        maeUser: mae.value,
        paiUser: pai.value,
    }

    console.log(valor)
    await criarPaciente(valor)
}

async function criarPaciente(dados) {
    await fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json,text/plain,/',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })

    window.location.reload()
}

formPaciente.addEventListener('submit', pegaInformation);


const resultadoDiv = document.getElementById('resultado'); // referencia a div resultado no html

const estruturaDiv = document.getElementById('estrutura'); // referencia a div estrutura no html

async function listarPacientes() {
    dados = await listar()
   let estrutura = ''
    dados.map((item) => {
        estrutura = estrutura + `
            <div class="row">
                <div class="col-3 tb-celula">${item.id}</div>
                <div class="col-3 tb-celula" onclick="MostraModalVisualizaPacientes(${item.id})">${item.nomeUser}</div>
                <div class="col-3 tb-celula">${item.cpfUser}</div>
                <div class="col-3 tb-celula">
               
                
                  <button type="button" class="rounded-3 border-success m-2"><a href="prontuario.html">
                    <img src="./images/Vector-visualizar.png"  alt="Vector"></a>
                  </button>
                                    
                  <button type="button" class="rounded-3 border-primary m-2" onclick="mostraModalEditar(${item.id})">
                    <img src="./images/Vector-editar.png" alt="Vector">
                  </button>
                                                           
                  <button type="button" class="rounded-3 border-danger m-2"onclick="deletaPaciente(${item.id})" >
                    <i class="fa-solid fa-trash-can" style="color: #ff0000;"></i>
                  </button>
                </div>
            </div>
            
        `
    })
    estruturaDiv.innerHTML = estrutura
}


listar = async () => {
    requisicao = await fetch("http://localhost:3000/pacientes")
    dados = await requisicao.json()
    return dados
}

listarPacientes()

 async function pegaPacienteId (idPaciente){
 const cliente =await fetch (`http://localhost:3000/pacientes/${idPaciente}`)
 const clienteJson = await cliente.json()
 return clienteJson
}



async function mostraModalEditar(idPaciente){
const pacienteResponse = await pegaPacienteId(idPaciente)

  document.getElementById('cpfEditar').value = pacienteResponse.cpfUser;
  document.getElementById('nomeEditar').value = pacienteResponse.nomeUser;
  document.getElementById('dataNascimentoEditar').value = pacienteResponse.data_nascimentoUser;
  document.getElementById('emailEditar').value = pacienteResponse.emailUser;
  document.getElementById('sexoEditar').value = pacienteResponse.sexoUser;
  document.getElementById('nacionalidadeEditar').value = pacienteResponse.nacionalidadeUser;
  document.getElementById('naturalidadeEditar').value = pacienteResponse.naturalidadeUser;
  document.getElementById('profissaoEditar').value = pacienteResponse.profissaoUser;
  document.getElementById('escolaridadeEditar').value = pacienteResponse.escolaridadeUser;
  document.getElementById('estadoCivilEditar').value = pacienteResponse.estado_civilUser;
  document.getElementById('maeEditar').value = pacienteResponse.maeUser;
  document.getElementById('paiEditar').value = pacienteResponse.paiUser;

  //Apresenta o Modal de Edição de pacientes
    let mostraModalEditado = new bootstrap.Modal(document.getElementById('modalEditaPaciente'), {});
    mostraModalEditado.show();

    document.getElementById('botaoEditarPaciente').addEventListener('click',async () => {
      const pacienteAtualizado = {
        "cpfUser": document.getElementById('cpfEditar').value,
        "nomeUser": document.getElementById('nomeEditar').value,
        "data_nascimentoUser": document.getElementById('dataNascimentoEditar').value,
        "emailUser": document.getElementById('emailEditar').value,
        "sexoUser": document.getElementById('sexoEditar').value,
        "nacionalidadeUser": document.getElementById('nacionalidadeEditar').value,
        "naturalidadeUser": document.getElementById('naturalidadeEditar').value,
        "profissaoUser": document.getElementById('profissaoEditar').value,
        "escolaridadeUser": document.getElementById('escolaridadeEditar').value,
        "estado_civilUser": document.getElementById('estadoCivilEditar').value,
        "maeUser": document.getElementById('maeEditar').value,
        "paiUser": document.getElementById('paiEditar').value  
      }
      await editaPaciente(idPaciente,pacienteAtualizado)
      console.log(pacienteAtualizado);
      window.location.reload()
      
    })
}
async function editaPaciente(idPaciente, dadosPacienteEditado) {
  return fetch(`http://localhost:3000/pacientes/${idPaciente}`, {
      method: 'PUT',
      headers: {
          'Accept': 'application/json,text/plain,/',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosPacienteEditado)
  })
}




const MostraModalVisualizaPacientes = async (idPaciente) =>{
    const pacienteResponse = await pegaPacienteId(idPaciente)
console.log("entrou na função")
console.log(pacienteResponse)
  document.getElementById('cpfVisualizar').value = pacienteResponse.cpfUser;
  document.getElementById('nomeVisualizar').value = pacienteResponse.nomeUser;
  document.getElementById('dataNascimentoVisualizar').value = pacienteResponse.data_nascimentoUser;
  document.getElementById('emailVisualizar').value = pacienteResponse.emailUser;
  document.getElementById('sexoVisualizar').value = pacienteResponse.sexoUser;
  document.getElementById('nacionalidadeVisualizar').value = pacienteResponse.nacionalidadeUser;
  document.getElementById('naturalidadeVisualizar').value = pacienteResponse.naturalidadeUser;
  document.getElementById('profissaoVisualizar').value = pacienteResponse.profissaoUser;
  document.getElementById('escolaridadeVisualizar').value = pacienteResponse.escolaridadeUser;
  //document.getElementById('estadoCivilVisualizar').value = pacienteResponse.estado_civilUser;
  document.getElementById('maeVisualizar').value = pacienteResponse.maeUser;
  document.getElementById('paiVisualizar').value = pacienteResponse.paiUser;

  let MostraModalVisualizaPacientes = new bootstrap.Modal(document.getElementById('VisualizaPacientes'), {});
 MostraModalVisualizaPacientes.show();

//captura o elemento pelo DOM e sobscreve o botao para que ele funcione com o parametro da função editar.
                  
     document.getElementById("RetornaEdicao").innerHTML=`<img src="./images/Vector-editar.png" 
     onclick="mostraModalEditar(${idPaciente})" data-bs-dismiss="modal" alt="Vector">` 
                  
}










    async function deletaPaciente(idPaciente) {
    console.log('deletando paciente')
    if (confirm("Tem certeza que deseja deletar esse paciente?")) {
      try {
        await fetch(`http://localhost:3000/pacientes/${idPaciente}`, {
          method: 'DELETE'
        });
        listarPacientes(); // atualiza a lista de pacientes após a remoção
      } catch (error) {
        console.log(error);
      }
    }
  }