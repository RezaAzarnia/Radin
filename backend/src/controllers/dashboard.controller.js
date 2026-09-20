import db from "../database.js";


export function getUsers(req,res){


    let page = Number(req.query.page) || 1;

    let limit = Number(req.query.limit) || 10;


    if(page < 1){
        page = 1;
    }


    if(limit < 1 || limit > 100){
        limit = 10;
    }



    const offset = (page - 1) * limit;



    db.get(

        `
        SELECT COUNT(*) as total
        FROM acceptances
        `,

        [],

        (err,countResult)=>{


            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }



            const total = countResult.total;



            db.all(

                `
                SELECT

                id,
                name,
                company,
                position,
                phone,
                email,
                created_at

                FROM acceptances

                ORDER BY id DESC

                LIMIT ?
                OFFSET ?

                `,

                [
                    limit,
                    offset
                ],


                (err,rows)=>{


                    if(err){

                        return res.status(500).json({

                            success:false,

                            message:err.message

                        });

                    }



                    res.json({

                        success:true,


                        data:rows,


                        pagination:{


                            page,

                            limit,

                            total,


                            totalPages:
                            Math.ceil(total / limit)


                        }


                    });


                }


            );


        }


    );


}