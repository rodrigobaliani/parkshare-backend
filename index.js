const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//Controllers
const paymentMethodsController = require(path.join(__dirname, './src/controllers/paymentMethodsController.js'))
const vehicleController = require(path.join(__dirname, './src/controllers/vehicleController.js'))
const colabParkingController = require(path.join(__dirname, './src/controllers/colabParkingController.js'))
const parkingInstructionsController = require(path.join(__dirname, './src/controllers/parkingInstructionsController.js'))
const profileController = require(path.join(__dirname, './src/controllers/profileController.js'))


const { initializeApp } = require('./src/utils/firebase');

//Firebase connect
initializeApp();

//CORS and JSON config
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(200).send('pong')
})

//Get payment methods
app.get('/paymentMethods/:userId', async (req, res) => {
    try {
        const response = await paymentMethodsController.getPaymentMethods(req.params.userId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Get vehicles
app.get('/vehicles/:userId', async (req, res) => {
    try {

        const response = await vehicleController.getVehicles(req.params.userId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Get primary payment method
app.get('/primary/paymentMethod/:userId', async (req, res) => {
    try {
        const response = await paymentMethodsController.getPrimaryPaymentMethod(req.params.userId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Get primary vehicle
app.get('/primary/vehicle/:userId', async (req, res) => {
    try {
        const response = await vehicleController.getPrimaryVehicle(req.params.userId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Add payment method
app.post('/paymentMethods/:userId', async (req, res) => {
    try {
        const response = await paymentMethodsController.addPaymentMethod(req.params.userId, req.body.payment)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Edit payment method
app.put('/paymentMethods/:userId', async (req, res) => {
    try {
        const response = await paymentMethodsController.editPaymentMethod(req.params.userId, req.body.paymentId, req.body.payment)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Delete payment method
app.delete('/paymentMethods', async (req, res) => {
    try {
        const response = await paymentMethodsController.deletePaymentMethod(req.query.userId, req.query.paymentId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Add vehicle
app.post('/vehicles/:userId', async (req, res) => {
    try {
        const response = await vehicleController.addVehicle(req.params.userId, req.body.vehicle)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Edit vehicle
app.put('/vehicles/:userId', async (req, res) => {
    try {
        const response = await vehicleController.editVehicle(req.params.userId, req.body.vehicleId, req.body.vehicle)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Delete vehicle
app.delete('/vehicles', async (req, res) => {
    try {
        const response = await vehicleController.deleteVehicle(req.query.userId, req.query.vehicleId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Add colab parking
app.post('/parkings/colab', async (req, res) => {
    try {
        const response = await colabParkingController.addColabParking(req.body.parking)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Edit colab parking
app.put('/parkings/colab/:parkingId', async (req, res) => {
    try {
        const response = await colabParkingController.editColabParking(req.params.parkingId, req.body.parking)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Delete colab parking
app.delete('/parkings/colab/:parkingId', async (req, res) => {
    try {
        const response = await colabParkingController.editColabParking(req.params.parkingId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Get parking instructions
app.get('/parkings/instructions/:mode', async (req, res) => {
    try {
        const response = await parkingInstructionsController.getParkingInstructions(req.params.mode);
        res.status(response.code).send(response)
    } catch (error) {
        console.log(error)
    }
})

//Get profile info
app.get('/profile/:userId', async (req, res) => {
    try {

        const response = await profileController.getProfileInfo(req.params.userId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Add profile info
app.post('/profile/:userId', async (req, res) => {
    try {
        const response = await profileController.addProfileInfo(req.params.userId, req.body.profile)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Edit profile info
app.put('/profile/:userId', async (req, res) => {
    try {
        const response = await profileController.editProfileInfo(req.params.userId, req.body.docId, req.body.profile)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

//Delete profile info
app.delete('/profile', async (req, res) => {
    try {
        const response = await profileController.deleteProfileInfo(req.query.userId, req.query.docId)
        res.status(response.code).send(response.result)
    } catch (error) {
        console.log(error)
    }
})

if (!module.parent) {
    const server = app.listen(process.env.PORT || 3000, () => {
        const { port } = server.address();
        console.log('Parkshare backend running', port);
    });
}

module.exports = app;