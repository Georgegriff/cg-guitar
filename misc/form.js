var AWS = require('aws-sdk')
var ses = new AWS.SES()
 
var RECEIVER = process.env.RECIEVER_EMAIL
var SENDER = process.env.SENDER_EMAIL
 
exports.handler = function (event, context) {
    console.log('Received event:', event)
    sendEmail(event, function (err, data) {
        context.done(err, true)
    })
}
 
function sendEmail (event, done) {
    var viaTele =  event.telephonePreferred === "true" ? 'Yes' : 'No';
    var telephone = event["telephone-no"] || 'n/a';
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + event.name + '\nEmail: ' + event["email-address"] + '\nTelephone: ' + event["telephone-no"]  + '\nMessage: ' + event.message + '\nContact via Telephone: ' + viaTele,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    ses.sendEmail(params, done)
}