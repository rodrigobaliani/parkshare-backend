const fs = require('fs');
const admin = require('firebase-admin');
const { features } = require('process');

const getParkingInstructions = (mode) => {
    const rawdata = fs.readFileSync('./src/assets/indicaciones.geojson')
    const jsondata = JSON.parse(rawdata)
    const allowedParkingFeatures = mode === "allowed" ? getAllowedParkingFeatures(jsondata.features) : getForbiddenParkingFeatures(jsondata.features)
    const resultData = {
        type: jsondata.type,
        name: jsondata.name,
        crs: jsondata.crs,
        features: allowedParkingFeatures,
    };
    const response = {
        code: 200,
        total: resultData.features.length,
        result: resultData
    }
    return response;
}

const getAllowedParkingFeatures = (features) => {
    const serverTimestamp = admin.firestore.Timestamp.now().toDate();
    const day = serverTimestamp.getDay();
    const hour = serverTimestamp.getHours();
    let conditions = [];
    if(day > 5) {
        conditions.push(function(item) {
            return item.properties.regla_general_id === 2 //Permitido estacionar siempre
        })
    }
    else {
        if(hour >= 7 && hour <= 21) {
            conditions.push(function(item) {
                return item.properties.regla_general_id === 2 //Permitido estacionar siempre
            })
        }
        else {
            conditions.push(function(item) {
                return item.properties.regla_general_id === 2 //Permitido estacionar siempre
            })
            conditions.push(function(item) {
                return item.properties.regla_general_id === 1 && item.properties.horario_regla_general_id === 2 //Permitido estacionar dias hábiles excepto entre 7 y 21
            })
        }
    }
    return features.filter(d => conditions.some(c => c(d)));
}

const getForbiddenParkingFeatures = (features) => {
    const serverTimestamp = admin.firestore.Timestamp.now().toDate();
    const day = serverTimestamp.getDay();
    const hour = serverTimestamp.getHours();
    let conditions = [];
    if(day > 5) {
        conditions.push(function(item) {
            return item.properties.regla_general_id === 1 //Prohibido estacionar siempre
        })
    }
    else {
        if(hour >= 7 && hour <= 21) {
            conditions.push(function(item) {
                return item.properties.regla_general_id === 1 //Prohibido estacionar siempre
            })
            conditions.push(function(item) {
                return item.properties.regla_general_id === 1 && item.properties.horario_regla_general_id === 2 //Prohibido estacionar dias habiles entre 7 y 21
            })
        }
        else {
            conditions.push(function(item) {
                return item.properties.regla_general_id === 1 //Prohibido estacionar siempre
            })
            
        }
    }
    return features.filter(d => conditions.some(c => c(d)));
}



module.exports = { getParkingInstructions }
