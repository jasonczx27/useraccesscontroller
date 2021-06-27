const app = require('express')();
// var http = require('http').Server(express);
const port = process.env.PORT || 8000;

const resp = require("./models/resp")

const cors = require('cors');
const server = require('http').createServer(app);
server.listen(port, () => {
    console.log("listening at PPPPORRT", port)
})
app.use(cors())
const path = require('path');
require("dotenv").config({ path: path.join(__dirname + '/.env') })
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const appswitch = require("./controllers/switch");



app.post("/feature", async function (req, res) {


    const result = new resp.returnPost()
    const ipaddr = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`captured request from ${ipaddr} using ${req.get("User-Agent")}`)
    console.log([...(process.env["DBfailedfeaturename"]).split(",")])


    const { featureName = null, email = null, enable = false } = req.body;
    console.log(req.body)
    //#region mock failedDB
    /**
     * uses .env and the enable parameter to control over whether I send success or not
     * to see failed (304) please either turn off 'enabled' || 'featureName to none, or false, OR 
     * apply featureName into one of the recorded in .env DBfailedfeaturename
     * 
     * to go success (200), make sure both featureName and enable were present in parameter
     * set Menable to true AND featureName to be not in the .env DBfailedfeaturename
     */

    let failedfeatures = []
    if (process.env["DBfailedfeaturename"]) {
        failedfeatures = [...process.env["DBfailedfeaturename"].split(",")]
    }

    if (featureName && enable && !failedfeatures.includes(featureName)) {
        res.status(result.statusCode).send(result.data)
    }
    else {
        result.notModified()
        res.status(result.statusCode).send(result.data)
    }
    //#endregion mock failedDB


})

app.get("/feature", async function (req, res) {

    const result = new resp.returnGet()
    const ipaddr = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`captured request from ${ipaddr} using ${req.get("User-Agent")}`)

    try {

        appswitch.switch(req.query).then(
            val => {
                console.log(val)
                res.json(val ? result.giveAccess() : result.blockAccess())

            }
        ).catch(val => {
            res.json(val ? result.giveAccess() : result.blockAccess())
        })

    }
    catch (e) {
        console.log(`getFeature encountered problem ${e}`)

        res.status(500).json(result.blockAccess())
    }
})





