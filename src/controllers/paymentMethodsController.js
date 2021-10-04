const admin = require('firebase-admin');

const getPaymentMethods = async (userId) => {
    try {
        const snapshot = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('paymentMethods')
            .get();
        if (snapshot.empty) {
            return { result: {}, code: 404 }
        }
        const paymentMethods = snapshot._docs().map(doc => { return { ...doc.data(), id: doc.id } })
        return { result: paymentMethods, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const getPrimaryPaymentMethod = async (userId) => {
    try {
        const snapshot = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('paymentMethods')
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

const addPaymentMethod = async (userId, paymentMethod) => {
    try {
        const docRef = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('paymentMethods')
            .add(paymentMethod)
        const doc = await docRef.get();
        const result = { id: doc.id, ...doc.data() }
        console.log(result)
        return { result: result, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const editPaymentMethod = async (userId, paymentId, paymentMethod) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('paymentMethods')
            .doc(paymentId)
            .update(paymentMethod)
        const msg = { msg: "Update successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const deletePaymentMethod = async (userId, paymentId) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('paymentMethods')
            .doc(paymentId)
            .delete()
        const msg = { msg: "Delete successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { getPrimaryPaymentMethod, getPaymentMethods, addPaymentMethod, editPaymentMethod, deletePaymentMethod }