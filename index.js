const express = require('express');
const env = require("dotenv")
env.config()

const server = express()
server.use(express.json())

const PORT = process.env.PORT || 8001
server.listen(PORT, () => {
    console.log("listening to port", PORT)
})

const RiskKeywords = ["collide", "crash", "scratch", "bump", "smash", "accident", "scratches"]
claim1 = ["My only claim was a crash into my house's garage door that left a scratch on my car.  There are no other crashes."]
claim2 = ["bad accident, bump, and a lot of scratch."]
claim3 = ["I have nothing to claim."]
let claim_history = []
let new_claim_history = []


server.post("/risk/claim", (req, res) => {
    let stringifyClaim = JSON.stringify(req.body)
    let claim_history_split = stringifyClaim.split(/[.,!,?, ,"]/)
    new_claim_history = [...claim_history, ...req.body]
    const intersection = RiskKeywords.filter(element => claim_history_split.includes(element));
    // const finalArray = JSON.parse(intersection)
    console.log(intersection)
    let risk_rating = [intersection.length]


    console.log(req.body)
    console.log(claim_history_split)
    console.log(new_claim_history)
    res.send(`Your risk rating is ${risk_rating}`)
})

server.get("/risk/claim", (req, res) => {
    console.log(new_claim_history)
    res.send(new_claim_history)
})

server.get("/claim_keywords/", (req, res) => {
    let stringifyClaim = JSON.stringify(new_claim_history)
    let new_claim_history_split = stringifyClaim.split(/[.,!,?, ,"]/)
    console.log(new_claim_history_split)
    res.send(new_claim_history_split)

})

server.get("/risk_keywords", (req, res) => {
    res.send(RiskKeywords)
})
// server.get("/risk/claim1", (req, res) => {
//     const intersection = RiskKeywords.filter(element => claim_history_split.includes(element));
//     // const finalArray = JSON.parse(intersection)
//     console.log(intersection)
//     let risk_rating = [intersection.length]
//     res.send(`Your risk rating is ${risk_rating}`)
// })


// server.get("/risk/", (req, res) => {
//     // const newRiskKeywords = RiskKeywords.filter((word) => word == "collide" || "crash");
//     const myArray = JSON.parse(RiskKeywords)
//     let risk = '{ "rating": 0 }'

//     if (myArray.filter((array) => array == "collide")) {
//         risk = '{ "rating": 1 }'
//     }

//     const riskArray = JSON.parse(risk)
//     res.send(riskArray)

// })

// server.get("/risk/collide&crash", (req, res) => {
//     // const newRiskKeywords = RiskKeywords.filter((word) => word == "collide" || "crash");
//     const myArray = JSON.parse(RiskKeywords)
//     let risk = '{ "rating": 0 }'

//     if (myArray.includes("collide") && myArray.includes("crash")) {
//         risk = '{ "rating": 2 }'
//     }
//     const riskArray = JSON.parse(risk)
//     res.send(riskArray)

// })


// server.get("/risk/", (req, res) => {
//     // const newRiskKeywords = RiskKeywords.filter((word) => word == "collide" || "crash");
//     const myArray = JSON.parse(RiskKeywords)
//     let risk = '{ "rating": 0 }'

//     if (myArray.includes("collide")) {
//         risk = '{ "rating": 1 }'
//     }
//     if (myArray.includes("collide") && myArray.includes("crash")) {
//         risk = '{ "rating": 2 }'
//     }
//     if (myArray.includes("collide") && myArray.includes("crash") && myArray.includes("scratch")) {
//         risk = '{ "rating": 3 }'
//     }

//     const riskArray = JSON.parse(risk)
//     res.send(riskArray)

// })


// server.get("/risk/rating", (req, res) => {
//     let RiskRating = { "rating": 0 };
//     if (RiskKeywords.includes("collide")) {
//         return RiskRating = { "rating": 2 };
//     }
//     res.send(RiskRating);
// }

// )