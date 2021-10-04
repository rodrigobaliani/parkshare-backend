const admin = require('firebase-admin');

const getVehicles = async (userId) => {
    try {
        const snapshot = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('userVehicles')
            .get();
        if (snapshot.empty) {
            return { result: {}, code: 404 }
        }
        const vehicles = snapshot._docs().map(doc => { return { ...doc.data(), id: doc.id } })
        return { result: vehicles, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const getPrimaryVehicle = async (userId) => {
    try {
        const snapshot = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('userVehicles')
            .where('primary', '==', true)
            .get();
        if (snapshot.empty) {
            return { result: {}, code: 404 }
        }
        const primary = snapshot._docs().map(doc => { return { ...doc.data(), id: doc.id } })[0]
        return { result: primary, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const addVehicle = async (userId, vehicle) => {
    try {
        const docRef = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('userVehicles')
            .add(vehicle)
        const doc = await docRef.get();
        const result = { id: doc.id, ...doc.data() }
        return { result: result, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const editVehicle = async (userId, vehicleId, vehicle) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('userVehicles')
            .doc(vehicleId)
            .update(vehicle)
        const msg = { msg: "Update successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const deleteVehicle = async (userId, vehicleId) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('userVehicles')
            .doc(vehicleId)
            .delete()
        const msg = { msg: "Delete successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}



module.exports = { getPrimaryVehicle, getVehicles, addVehicle, editVehicle, deleteVehicle }