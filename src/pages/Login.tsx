import {
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";



export default function Login(){


    const navigate = useNavigate();


    const [phone,setPhone] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);





    const submit = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();



        try{


            setLoading(true);



            const response = await fetch(

                "http://localhost:3000/api/auth/login",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    credentials:"include",

                    body:JSON.stringify({

                        phone,

                        password

                    })

                }

            );



            const result =
            await response.json();



if(result.success){


    toast.success(
        "ورود موفق بود"
    );


    localStorage.setItem(
        "admin",
        "true"
    );


    navigate(
        "/dashboard"
    );


}
            else{


                toast.error(
                    result.message || "اطلاعات ورود اشتباه است"
                );


            }




        }
        catch(error){


            console.log(error);


            toast.error(
                "خطا در اتصال به سرور"
            );


        }
        finally{


            setLoading(false);


        }


    };






return (

<div

dir="rtl"

className="
min-h-screen
bg-gradient-to-br
from-[#f1f7fc]
via-white
to-blue-50
flex
items-center
justify-center
p-5
"

>


<div

className="
relative
overflow-hidden
w-full
max-w-md
bg-white/90
backdrop-blur-xl
rounded-[32px]
border
border-white
shadow-[0_20px_50px_-20px_rgba(30,120,200,.3)]
p-8
"

>



<div

className="
absolute
-left-20
-top-20
w-52
h-52
rounded-full
bg-blue-200/40
blur-3xl
"

/>





<div

className="
relative
text-center
"

>


<div

className="
inline-flex
p-3
rounded-3xl
bg-white
border
border-blue-100
shadow-lg
"

>

<img

src="/logo.jpg"

alt="Radin"

className="
w-24
h-24
object-contain
rounded-2xl
"

/>

</div>




<div

className="
mt-5
inline-flex
items-center
gap-2
px-3
py-1
rounded-full
bg-blue-50
border
border-blue-100
text-blue-600
text-xs
font-bold
"

>

<span

className="
w-2
h-2
rounded-full
bg-blue-500
animate-pulse
"

/>

مدیریت آزمایشگاه

</div>



<h1

className="
mt-5
text-3xl
font-black
text-slate-800
"

>

ورود ادمین

</h1>


<p

className="
mt-3
text-sm
leading-7
text-slate-500
"

>

برای ورود به پنل مدیریت اطلاعات خود را وارد کنید

</p>


</div>







<form

onSubmit={submit}

className="
relative
mt-8
space-y-5
"

>



<div>

<label

className="
block
mb-2
text-sm
font-bold
text-slate-700
"

>

شماره تلفن

</label>


<input

value={phone}

onChange={
e=>setPhone(e.target.value)
}


className="
w-full
rounded-2xl
border
border-blue-100
bg-[#f8fbff]
px-4
py-3
outline-none
transition
focus:bg-white
focus:border-blue-400
focus:ring-4
focus:ring-blue-100
"

/>


</div>







<div>


<label

className="
block
mb-2
text-sm
font-bold
text-slate-700
"

>

رمز عبور

</label>



<input

type="password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

placeholder="رمز عبور"

className="
w-full
rounded-2xl
border
border-blue-100
bg-[#f8fbff]
px-4
py-3
outline-none
transition
focus:bg-white
focus:border-blue-400
focus:ring-4
focus:ring-blue-100
"

/>


</div>






<button

disabled={loading}

className="
w-full
rounded-2xl
py-4
font-black
text-white
bg-gradient-to-l
from-[#73c2fb]
to-blue-600
shadow-lg
transition
hover:scale-[1.02]
disabled:opacity-50
"

>


{

loading

?

"در حال ورود..."

:

"ورود به داشبورد"

}


</button>



</form>







<div

className="
relative
mt-6
text-center
text-xs
text-slate-400
"

>

🔒 دسترسی فقط برای مدیریت آزمایشگاه

</div>




</div>



</div>

)

}