import db from "./database.js";


db.run(

    `
INSERT INTO admins
(
phone,
password
)

VALUES(?,?)

`,

    [
        "09145013081",
        "ramin123456"
    ],

    function (err) {


        if (err) {

            console.log(err.message);

        }

        else {

            console.log(
                "Admin created"
            );

        }


    }

);