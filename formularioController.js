/**MODAL**/
function showModal(event) {
  var element = document.getElementById('modal')
  element.classList.add('modalactive')
  event.preventDefault()
}

function RemoveModal() {
  var element = document.getElementById('modal')
  element.classList.remove('modalactive')
}

async function enviarDados(event) {
  /* Primeiro devemos prevenir o comportamento padrão do formulário !
    Mas, o que seria esse comportamento padrão?
    
    Bom, se você está utilizando a tag <form> sempre que houver um envio de um formulário
    seja pelo click do botão ou pela função onsubmit do formulário ele vai redirecionar o usuário para alguma rota

    com o event.preventDefault() você vai prevenir esse comportamento, ou seja não vai redirecionar quando o formulario
    for enviado
  */
  event.preventDefault()
  // Segundo procedimento: Buscar os valores dos inputs do HTML:

  /* Ficou com dúvida e não sabe buscar os valores ? 
 Consulte essa URL: https://pt.stackoverflow.com/questions/21860/como-pegar-input-usando-html-e-javascript

 Utilize as constantes abaixos para armazenar os valores dos inputs:
*/
  const nome = document.getElementById('nameum').value
  const email = document.getElementById('email').value
  const telefone = document.getElementById('tell').value
  const cidade = document.getElementById('city').value
  const regras = document.getElementById('regrasum').checked
  const termos = document.getElementById('regrasdois').checked

  const TodosDados = {
    nome,
    email,
    telefone,
    cidade,
    regras,
    termos
  }
  /* -------------------------------------------------------------------------------------------------- */

  /* Agora vamos para a parte mais divertida xD

Bom, para realizar as requisições vamos utilizar o método nativo do próprio JavaScript, utilizando esse método
não precisaremos instalar alguma biblioteca para fazer as requisições!

O Método se chama fetch, com ele conseguimos realizar todas os métodos HTTPS (GET, POST, DELETE, PUT, PATCH)

*/
  await fetch('https://api-show-de-premios.herokuapp.com/clientes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(TodosDados)
  }).then(resposta => {
    showModal()
    return resposta.json()
  })
}
async function contador() {
  const cont = document.getElementById('cont')

  await fetch('https://api-show-de-premios.herokuapp.com/clientes/count')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const valorpessoas = data
      cont.innerHTML = `Quantidade de pessoas: ${valorpessoas} pessoas`
    })
}
contador()
/* Última coisa:

Só vai cair nessa parte do .then() quando der sucesso na requisição.

Caso der erro você utiliza o .catch() 

E nesse catch você também pode informar o usuário que deu erro!

Mas não vou explicar como faz, pesquisem e tentem fazer sozinhos!

*/
async function realizarSorteio() {
  await fetch('https://api-show-de-premios.herokuapp.com/clientes')
    .then(res => {
      return res.json()
    })
    .then(data => {
      const numeroAleatorio = Math.floor(Math.random() * data.length + 1)
      const index = data.find(usuario => usuario.id === numeroAleatorio)
      const ganhador = document.getElementById('ganhador')
      ganhador.innerHTML = `Parabéns: ${index.nome}`
      const ganhador2 = document.getElementById('ganhador2')
      ganhador2.innerHTML = `Telefone: ${index.telefone}`
      const ganhador3 = document.getElementById('ganhador3')
      ganhador3.innerHTML = `Email: ${index.email}`
    })
}
realizarSorteio()
/* ---------------------------------------------- */

/* Desafio proposto por Agência Premium 

Organizadores:
  - Diego Lopes,
  - Gabriel Castilho
  - Rafael Carvalho
*/

/* ---------------------------------------------- */
