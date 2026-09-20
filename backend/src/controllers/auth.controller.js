export function login(req, res) {


    const {
        phone,
        password
    } = req.body;



    if (

        phone === "09145013081"

        &&

        password === "ramin123456"

    ) {


        return res.json({

            success: true,

            admin: true,

            message: "Login successful"

        });


    }



    return res.status(401).json({

        success: false,

        message: "شماره یا رمز اشتباه است"

    });


}





export function checkAuth(req, res) {


    return res.json({

        success: false

    });


}





export function logout(req, res) {


    return res.json({

        success: true

    });


}