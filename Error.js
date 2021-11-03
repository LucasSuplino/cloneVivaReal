class Error {
    constructor () {

    } 
    
    show (status){
        console.log('ERROR:', status)

        const cardBoard = document.querySelector('.cardBoard');
        cardBoard.innerHTML = ""

        const divError = document.createElement('div')
        const paragraph1 = document.createElement('p')
        const paragraph2 = document.createElement('p')
        const paragraph3 = document.createElement('p')
        const paragraph4 = document.createElement('p')

        divError.classList.add('errorBoard')
        paragraph1.classList.add('error')
        paragraph2.classList.add('error')
        paragraph3.classList.add('errorStatus')
        paragraph4.classList.add('error')

        paragraph1.innerText = 'OOOOPS!'
        paragraph2.innerText = 'ALDO DEU ERRADO NA SUA BUSCA.'
        paragraph3.innerText = `status ${status}`
        paragraph4.innerText = 'POR FAVOR, TENTE NOVAMENTE.'

        divError.append(paragraph1,paragraph2,paragraph3,paragraph4)
        cardBoard.append(divError)
    }
}

export default Error