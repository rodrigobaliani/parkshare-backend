const fs = require('fs')

const getParkingInstructions = () => {
    const rawdata = fs.readFileSync('./src/assets/indicaciones.geojson')
    const jsondata = JSON.parse(rawdata)
    const response = {
        code: 200,
        result: jsondata,
    }
    return response
}





module.exports = { getParkingInstructions }
