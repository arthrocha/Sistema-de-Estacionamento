const modelo = document.querySelector('.campomodelo') //armazena o campo do modelo
const placa = document.querySelector('.campoplaca') //armazena o campo da placa
const entradaUL = document.querySelector('.entradaUL') //Pega a ul onde será armazenada a li contendo a hora de entrada do veículo
const modeloUL = document.querySelector('.modeloUL') //Pega a ul onde será armazenada a li contendo o modelo
const placaUL = document.querySelector('.placaUL')// Pega a ul onde será armazenada a li contendo a placa
const finalizaUL = document.querySelector('.finalizaUL') //Pega a ul onde será armazenada a li contando o botão "finaliza"
const cadastrar = document.querySelector('.cadastrar') //Pega o botão com a classe "cadastrar"
const campoPesquisa = document.querySelector('.campoPesquisa') //Pega o campo de pesquisa

/* O método geItem() vai pegar os valores da chave 'carInformations'
 no localStorage e armazenar na constante LocalStorageInformations*/

// O JSON.parse vai transformar o array stringficado para um array de verdade
const LocalStorageInformations = JSON.parse(localStorage
    .getItem('carInformations'))

/*Se a chave 'carInformations' for diferente de vazia, a varivel "carInformations" 
vai armazenar o array  LocalStorageInformations com seus respectivos valores, caso 
contrário ela vai armazenar um array vazio*/
let carInformations = localStorage
    .getItem('carInformations') !== null ? LocalStorageInformations : []


//Função é chamada na linha 52
//Recebe como parâmetro o id do objeto que contem o carro
const deletar = (ID) => {
    carInformations = carInformations.filter(car => car.id !== ID) //carInformations recebe somente os carros cujo ID é diferente do ID do carro selecionado
    updateLocalStorage() //realoca os dados no localStorage
    init() //reinsere os carros 
    window.location.reload(); //recarrega a página
}   

const pesquisar = (carros) => {
    const placa = carros.filter(carro => campoPesquisa.value == carro.placa)
    modeloUL.innerHTML = ''
    placaUL.innerHTML = ''
    entradaUL.innerHTML = ''
    finalizaUL.innerHTML = ''
    if(placa == ''){
        placaUL.innerHTML = `Valor não encontrado`
    }
    placa.forEach(insertIntoDOM)
}

// Essa função recebe como parâmetro o array de objetos "carInformations"
const insertIntoDOM = carInformations => {
    //vai criar um "li" que vai ser usado dentro de cada respectiva "ul"
    const liModelo = document.createElement('li')
    const liPlaca = document.createElement('li')
    const liEntrada = document.createElement('li')
    const liFinaliza = document.createElement('li')
    //vai inserir os valores dentro da "li"
    liEntrada.innerHTML = `${carInformations.entrada}`
    liModelo.innerHTML = `${carInformations.modelo}`
    liPlaca.innerHTML = `${carInformations.placa}`
    liFinaliza.innerHTML = `<button type="submit" class="finalizar-btn" onclick="deletar(${carInformations.id})">Finalizar</button>`

    //vai adicionar as "li"s dentro das "ul"s
    modeloUL.prepend(liModelo)
    placaUL.prepend(liPlaca)
    entradaUL.prepend(liEntrada)
    finalizaUL.prepend(liFinaliza)
}


const init = () => {
    //limpa cada ul para inserir os novos dados
    modeloUL.innerHTML = ''
    placaUL.innerHTML = ''
    entradaUL.innerHTML = ''
    finalizaUL.innerHTML = ''
    //
    carInformations.forEach(insertIntoDOM) //cada Objeto do array carInformations vai rodar dentro da função "insertIntoDOM"
}

//chama a função init()
init()

//insere o array de Objetos carInformations no LocalStorage
const updateLocalStorage = () => {
    localStorage.setItem('carInformations', JSON.stringify(carInformations))
}

//gera um ID aleatório
const generateID = () => Math.round(Math.random() * 1000)


cadastrar.addEventListener('click', event => {
    //cancela o comportamento default do elemento
    event.preventDefault()

    const hora = new Date()
    const nomeModelo = modelo.value.trim() 
    const numPlaca = placa.value.trim() 

    //validação se os campos "modelo" e "placa" estão devidamente preenchidos
    if(nomeModelo === '' || numPlaca === ''){
        alert('Por favor, preencha tanto o nome quanto o número da placa!')
        return //parar a execução da função
    }

    //objeto base que será inserido no array carInformations
    const carro = {
        id:generateID(),
        modelo:nomeModelo, 
        placa: numPlaca,
        entrada: `${hora.getHours()}:${hora.getMinutes()}`

    }

    carInformations.push(carro)
    
    init()
    updateLocalStorage()

    modelo.value = ''
    placa.value = ''
})





