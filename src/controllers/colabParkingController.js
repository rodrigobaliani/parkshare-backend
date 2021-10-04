const admin = require('firebase-admin');

const addColabParking = async (parking) => {
    try {
        parking = {
            expiryDate: new Date(parking.expiryDate),
            ...parking
        }
        const docRef = await admin.firestore()
            .collection('parkings')
            .add(parking)
        const doc = await docRef.get();
        const result = { id: doc.id, ...doc.data() }
        return { result: result, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const editColabParking = async (parkingId, parking) => {
    try {
        await admin.firestore()
            .collection('parkings')
            .doc(parkingId)
            .update(parking)
        const msg = { msg: "Update successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const deleteColabParking = async (parkingId) => {
    try {
        await admin.firestore()
            .collection('parkings')
            .doc(parkingId)
            .delete()
        const msg = { msg: "Delete successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { addColabParking, editColabParking, deleteColabParking }