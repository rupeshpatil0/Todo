const jwt =require("jsonwebtoken")
const config =require("config")

module.exports =function(req,res,next){

const token= req.header("x-auth")
if (!token) return res.status(401).send("permission denied!!!  ")

try
{
    const decode = jwt.verify(token, config.get("ThisIsPrivateKey"))
    req.user = decode
    next()
} catch (ex) {
    res.status(400).send("invalid token")
}
}