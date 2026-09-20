export default function adminMiddleware(
req,
res,
next
){


if(

req.session
&&
req.session.admin

){


next();


}

else{


res.status(401).json({

success:false,

message:"Access denied"

});


}


}
export function checkAuth(req,res){


    if(
        req.session &&
        req.session.admin
    ){

        return res.json({

            success:true

        });

    }



    res.status(401).json({

        success:false

    });


}