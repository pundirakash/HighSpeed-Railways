var express = require('express');
var router = express.Router();
const shortid = require("shortid");
const Razorpay = require('razorpay');
const request = require('request');

const keys = require('../keys')

const razorInstance = new Razorpay({
  key_id : keys.razorIdkey,
  key_secret : keys.razorIdSecret
})
router.post("/order",(req,res)=>{
  try{
    const options ={
      amount : req.body.fare*100,
      currency : "INR",
      receipt: shortid.generate(),
      payment_capture: 0, //1

    };
    razorInstance.orders.create(options,async function(err,order){
      if(err){
        return res.status(500).json({
          message: "Something error!s"
        })
      }
      return res.status(200).json(order)
    });
  }
  catch(err){
    return res.status(500).json({
      message: "Something error!s"
    })
  }
});

router.post("/capture/:paymentId",(req,res)=>{
  try{
    return request(
      {
        method : "POST",
        url : `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form:{
          amount : req.body.fare *100,
          currency: "INR"
        },
      },
      async function(err,response,body){
        if(err){
          return res.status(500).json({
            message: "Something error!s"
          })
        }
        return res.status(200).json(body)
      }
    )
  }
  catch(err){
    return res.status(500).json({
      message: err.message
    })
  }
})

module.exports = router;
