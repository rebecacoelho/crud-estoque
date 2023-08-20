const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

const nomeDoProduto = document.querySelector('#m-nome')
const estoqueDoProduto = document.querySelector('#m-estoque')
const codigoDoProduto = document.querySelector('#m-codigo')
const demandaDoProduto = document.querySelector('#m-demanda')

const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    nomeDoProduto.value = itens[index].nome
    estoqueDoProduto.value = itens[index].estoque
    codigoDoProduto.value = itens[index].codigo
    demandaDoProduto.value = itens[index].demanda
    id = index
  } else {
    nomeDoProduto.value = ''
    estoqueDoProduto.value = ''
    codigoDoProduto.value = ''
    demandaDoProduto.value = ''
  }
  
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBancoDados()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.estoque}</td>
    <td>${item.codigo}</td>
    <td>${item.demanda}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (nomeDoProduto.value == '' || estoqueDoProduto.value == '' || codigoDoProduto.value == '' || demandaDoProduto == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = nomeDoProduto.value
    itens[id].estoque = estoqueDoProduto.value
    itens[id].codigo = codigoDoProduto.value
    itens[id].demanda = demandaDoProduto.value
  } else {
    itens.push({'nome': nomeDoProduto.value, 'estoque': estoqueDoProduto.value, 'codigo': codigoDoProduto.value, 'demanda': demandaDoProduto.value})
  }

  setItensBancoDados()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBancoDados = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
