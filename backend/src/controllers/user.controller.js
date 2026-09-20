import db from "../database.js";



export function createUser(req, res) {


    const {

        name,
        company,
        position,
        phone,
        email

    } = req.body;



    if (!name || !phone) {

        return res.status(400).json({

            success: false,

            message: "Name and phone are required"

        });

    }



    const trackingCode =
        "RDN-" +
        Math.floor(
            10000 + Math.random() * 90000
        );



    db.run(

        `
        INSERT INTO acceptances
        (
            name,
            company,
            position,
            phone,
            email,
            tracking_code
        )

        VALUES (?,?,?,?,?,?)

        `,


        [

            name,

            company,

            position,

            phone,

            email,

            trackingCode

        ],


        function(err){


            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }



            res.json({

                success:true,

                message:"User created successfully",

                data:{

                    id:this.lastID,

                    trackingCode

                }

            });


        }


    );


}