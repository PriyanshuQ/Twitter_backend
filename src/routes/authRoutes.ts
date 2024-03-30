import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;

const router = Router()
const prisma = new PrismaClient()

//random 8 digit number as the emailtoken
function generateEmailToken():string{
    return Math.floor(10000000 + Math.random()+ 90000000).toString()
}

//Create a user, if it doesn't exist,
//generate athe email token and sent it to their email
router.post('/login', async(req, res)=>{
    const { email } = req.body;

    //generate token
    const emailToken = generateEmailToken()
    const expiration = new Date(
        new Date().getTime() + EMAIL_TOKEN_EXPIRATION_MINUTES*60*1000
    );

    try{
        const createdToken = await prisma.token.create({
            data:  {
                type: 'EMAIL',
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: {email},
                        create: {email},
                    }
                }
            },
        });
        console.log(createdToken)
        //send emailToken to users email
        res.send(200);
    } catch(e){
        console.log(e)
        res.status(400).json({error: "Couldn't start the authentication process"})
    }
});

//Validate the emailToken
//Generate a long-lived JWT

router.post('/authenticate', async(req, res)=>{

})



export default router;