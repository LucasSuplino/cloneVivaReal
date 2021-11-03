import Error from "./Error.js";

class Request {  

    constructor () {
        this.dictState = {
            'rio-de-janeiro': 'rj',
            'sao-paulo': 'sp'
            };
    
        this.dictTreatment = {
            'rj': 'rio-de-janeiro',
            'rio de janeiro': 'rio-de-janeiro',
            'rio-de-janeiro': 'rio-de-janeiro',
            'sp': 'sao-paulo',
            'são paulo': 'sao-paulo',
            'são-paulo': 'sao-paulo',
            'sao paulo': 'sao-paulo',
            'sao-paulo': 'sao-paulo',
        }
    }   

    getHouses = async(state, city) => {

        try {
            const response = await fetch(`https://private-9e061d-piweb.apiary-mock.com/venda?state=${state}&city=${city}`,
                            {method: 'GET'})
            if(response['status'] !== 200){                
                const error = new Error()
                error.show(response['status'])
            }
            return await response.json()
            
        } catch (err) {
            throw new Error(err)
        }    
    }

    condoFee = (house) => {
        if(house['listing']['pricingInfos'][0]['monthlyCondoFee']){
            return `R$ ${house['listing']['pricingInfos'][0]['monthlyCondoFee']}`
        }else {
            return ''
        }
    }

    vagas = (house) => {
        const v = house['listing']['parkingSpaces'][0]
        if(v === 0){
            return ''
        }else if(v === 1){
            return '1 Vaga'
        }else{
            return `${v} Vagas`
        }
    }

    getHousesInfo = async(searchedCity) =>{
        try { 
        
            const city = this.dictTreatment[searchedCity.toLowerCase()];
            const state = this.dictState[city];

            const houses1 = await this.getHouses(state, city)                 
            const houses2 = houses1['search']['result']['listings'] 

            const housesInfos = houses2.map((house) => {               

                const address = `${house['listing']['address']['street']}$, ${house['listing']['address']['streetNumber']} - ${house['listing']['address']['neighborhood']}, ${house['listing']['address']['city']} - ${state.toUpperCase()}`
                const name = house['link']['name']
                const infos = `${house['listing']['usableAreas']}m² ${house['listing']['bedrooms']} Quartos ${house['listing']['bathrooms']} Banheiros ${this.vagas(house)}`//${house['listing']['parkingSpaces']} Vaga`
                const amenities = house['listing']['amenities']
                const price = `R$ ${house['listing']['pricingInfos'][0]['price']}`
                const midia = house['medias'][0]['url']

                return {address: address, name: name, infos: infos, amenities: amenities, price: price,
                condoFee: this.condoFee(house), midia: midia}
            })

            return {'housesInfos': housesInfos, 'city': city, 'state': state}

        } catch (err) {
            throw new Error(err)
        }
    }   

}

export default Request