import Request from "./Request.js";
import CardsFactory from "./CardsFactory.js";

const request = new Request()
const cardsFactory = new CardsFactory()

seeked_city.addEventListener('blur', function (evt) {

    const Infos = async() => {
        try {
            return await request.getHousesInfo(this.value)            
        } catch (err) {
            throw new Error(err) 
        }
    }

    const response = async() =>{
        try {
            cardsFactory.fillBoard(await Infos())
        } catch (err) {
            throw new Error(err)
        }
    }

    response()
})






