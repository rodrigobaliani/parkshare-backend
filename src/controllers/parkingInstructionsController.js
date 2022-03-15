const fs = require('fs')

const getParkingInstructions1 = (fromIndex, toIndex) => {
    const rawdata = fs.readFileSync('./src/assets/test.geojson')
    const jsondata = JSON.parse(rawdata)
    const response = {
        code: 200,
        result: jsondata,
    }
    return response
}

const getParkingInstructions2 = (fromIndex, toIndex) => {
    const rawdata = fs.readFileSync('./src/assets/test2.geojson')
    const jsondata = JSON.parse(rawdata)
    const response = {
        code: 200,
        result: jsondata,
    }
    return response
}

const getParkingInstructions3 = (fromIndex, toIndex) => {
    const rawdata = fs.readFileSync('./src/assets/test3.geojson')
    const jsondata = JSON.parse(rawdata)
    const response = {
        code: 200,
        result: jsondata,
    }
    return response
}

const getParkingInstructions4 = (fromIndex, toIndex) => {
    const rawdata = fs.readFileSync('./src/assets/test4.geojson')
    const jsondata = JSON.parse(rawdata)
    const response = {
        code: 200,
        result: jsondata,
    }
    return response
}




module.exports = { getParkingInstructions1, getParkingInstructions2, getParkingInstructions3, getParkingInstructions4 }
