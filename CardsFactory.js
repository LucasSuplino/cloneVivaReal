class CardsFactory {
    constructor () {
        this.dictAmenities = {
            'AIR_CONDITIONING': 'Ar-condicionado',
            'CINEMA': 'Cinema',
            'ELEVATOR': 'Elevador',
            'ELECTRONIC_GATE': 'Portão eletrônico',
            'FURNISHED': 'Mobiliado',
            'FIREPLACE': 'Lareira',
            'GYM': 'Academia',
            'GATED_COMMUNITY': 'Condomínio fechado',
            'PETS_ALLOWED': 'Aceita animais',
            'SAUNA': 'Sauna',
            'GARDEN': 'Jardim',
            'POOL': 'Pscina',
            'BARBECUE_GRILL': 'Churrasqueira',
            'PARTY_HALL': 'Salão de festas',
            'BICYCLES_PLACE': 'Bicicletário',
            'SPORTS_COURT': 'Quadra de esportes',
            'AMERICAN_KITCHEN': 'Cozinha americana',
            'PLAYGROUND': 'Playground',
            'TENNIS_COURT': 'Quadra de tênis',
            'LAUNDRY': 'Lavanderia',
        }

        this.dictCity = {'rio-de-janeiro': 'Rio de Janeiro',
                        'sao-paulo': 'São Paulo'}

    }    

    fillBoard = async(waitInfos) => {
        const cardBoard = document.querySelector('.cardBoard')
        const paragraph = document.createElement('p')
        const houseQtd = document.createElement('span')
        const btnCity = document.createElement('button')

        houseQtd.classList.add('bold')
        btnCity.classList.add('btnCity')
        paragraph.classList.add('resume')

        cardBoard.innerHTML = ""

        try {
            const Infos = await waitInfos
            console.log('infos: ',Infos)

            houseQtd.innerText = Infos['housesInfos'].length
            btnCity.textContent = `${this.dictCity[Infos['city']]}${' - '}${Infos['state'].toUpperCase()}${' x'}`

            paragraph.append(houseQtd, ' Imóveis à venda em ',this.dictCity[Infos['city']],' - ',Infos['state'].toUpperCase())
            cardBoard.append(paragraph, btnCity)

            Infos['housesInfos'].forEach(cardHouse => {
                const divCard = document.createElement('div')
                const divFrame = document.createElement('div')
                const coverImage = document.createElement('img')
                const divInfo = document.createElement('div')
                const spanAddress = document.createElement('span')
                const spanName = document.createElement('span')
                const spanInfo = document.createElement('span')
                const spanAmenities = document.createElement('span')
                const spanPrice = document.createElement('span')
                const spanCondo = document.createElement('span')
                const btnTel = document.createElement('button')
                const btnMsg = document.createElement('button')
        
                divCard.classList.add('card')
                divFrame.classList.add('frame')
                divInfo.classList.add('info')
                spanAddress.classList.add('address')
                spanName.classList.add('name')
                spanInfo.classList.add('otherInfo')
                spanAmenities.classList.add('amenities')
                spanPrice.classList.add('pricing')
                spanCondo.classList.add('condoFee')
                btnTel.classList.add('btnContact')
                btnTel.classList.add('btnTel')
                btnMsg.classList.add('btnContact')
                btnMsg.classList.add('btnMsg')            
        
                coverImage.src = cardHouse['midia']
                spanAddress.innerText = cardHouse['address']
                spanName.innerText = cardHouse['name']
                spanInfo.innerText = cardHouse['infos']            
                spanPrice.innerText = cardHouse['price']
                
                btnTel.textContent = 'TELEFONE'
                btnMsg.textContent = 'ENVIAR MENSSAGEM'

                if(cardHouse['condoFee']!==''){
                    const span = document.createElement('span')
                    span.innerText = cardHouse['condoFee']
                    span.classList.add('bold2') 

                    spanCondo.innerText = 'Condomínio: '
                    spanCondo.append(span)
                }else{
                    spanCondo.innerText = cardHouse['condoFee']
                }

                cardHouse['amenities'].forEach(amenitie => {
                    
                    const btnAmenitie = document.createElement('button')
                    btnAmenitie.classList.add('btnAmenities')

                    btnAmenitie.textContent = this.dictAmenities[amenitie]
                    spanAmenities.append(btnAmenitie)
                })                
        
                divFrame.append(coverImage)
                divInfo.append(spanAddress,spanName,spanInfo,spanAmenities,spanPrice,spanCondo)
                divInfo.append(btnTel, btnMsg)
                divCard.append(divFrame,divInfo)
        
                cardBoard.append(divCard)                          
            });

        } catch (err) {            
            throw new Error(err)
        }   
    }
}

export default CardsFactory