const admin = require('firebase-admin');

const getProfileInfo = async (userId) => {
    try {
        const snapshot = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('profileInfo')
            .get();
        if (snapshot.empty) {
            return { result: {}, code: 404 }
        }
        const profileInfo = snapshot._docs().map(doc => { return { ...doc.data(), id: doc.id } })
        return { result: profileInfo, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const addProfileInfo = async (userId, profileInfo) => {
    try {
        const docRef = await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('profileInfo')
            .add(profileInfo)
        const doc = await docRef.get();
        const result = { id: doc.id, ...doc.data() }
        console.log(result)
        return { result: result, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const editProfileInfo = async (userId, docId, profileInfo) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('profileInfo')
            .doc(docId)
            .update(profileInfo)
        const msg = { msg: "Update successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

const deleteProfileInfo = async (userId, docId) => {
    try {
        await admin.firestore()
            .collection('userData')
            .doc(userId)
            .collection('profileInfo')
            .doc(docId)
            .delete()
        const msg = { msg: "Delete successful" }
        return { result: msg, code: 200 }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getProfileInfo, addProfileInfo, editProfileInfo, deleteProfileInfo}
