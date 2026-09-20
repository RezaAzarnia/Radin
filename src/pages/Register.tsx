import {
    useForm
} from "react-hook-form";


import {
    zodResolver
} from "@hookform/resolvers/zod";


import {
    acceptanceSchema,
    type AcceptanceSchema
} from "../schema/acceptance.schema";
import { useState } from "react";

import toast from "react-hot-toast";
import Input from "../components/Input";
export default function Register() {
    const [loading, setLoading] = useState(false);



    const {

        register,

        handleSubmit,

        formState: { errors }

    } = useForm<AcceptanceSchema>({

        resolver: zodResolver(
            acceptanceSchema
        )

    });

    const submit = async (
        data: AcceptanceSchema
    ) => {
        try {
            setLoading(true);
            const response = await fetch(
                "http://localhost:3000/api/users/create",

                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            const result = await response.json();
            if (result.success) {
                toast.success(
                    "اطلاعات با موفقیت ثبت شد"
                );
            }
        }
        catch (error) {
            console.log(error);
            toast.error(
                "خطا در ثبت اطلاعات. دوباره تلاش کنید"
            );

        }
        finally {
            setLoading(false);
        }
    };


    return (


        <div

            dir="rtl"

            className=" min-h-screen relative overflow-hidden bg-[#f1f7fc] px-4 py-8 font-sans"
        >
            <div className=" fixed -top-20 -right-20 w-80 h-80 rounded-full bg-[#73c2fb]/40 blur-3xl">
            </div>
            <div className=" fixed -bottom-20 -left-20 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl">
            </div>
            {/* grid */}
            <div className=" fixed inset-0 pointer-events-none opacity-60"
                style={{
                    backgroundImage: `

linear-gradient(
to right,
rgba(115,194,251,.12) 1px,
transparent 1px
),

linear-gradient(
to bottom,
rgba(115,194,251,.12) 1px,
transparent 1px
)
`, backgroundSize: "30px 30px"
                }}
            />
            <main className=" relative max-w-2xl mx-auto">
                <div className=" bg-white/85 backdrop-blur-xl border border-white rounded-[2rem] shadow-[0_15px_35px_-10px_rgba(115,194,251,.25)] p-6 sm:p-8 md:p-10 "
                >
                    <div className=" absolute top-0 right-0 left-0 h-1.5 rounded-t-[2rem] bg-gradient-to-l from-[#73c2fb] via-blue-500 to-[#73c2fb] "
                    >
                    </div>
                    {/* Header */}
                    <div className=" text-center mb-8 " >
                        <div className=" inline-flex bg-white p-3 rounded-2xl shadow-sm border border-blue-100 mb-5"
                        >
                            <img
                                src="/logo.jpg"
                                alt="Radin"
                                className=" w-24 h-24 object-contain rounded-xl"
                            />
                        </div>
                        
                        <h1

                            className="
mt-4
text-3xl
font-black
text-slate-800
"
                        >
                            آزمایشگاه رادین 

                        </h1>
                        <p

                            className="
mt-3
text-sm
text-slate-500
leading-7
"

                        >

                            جهت ثبت درخواست آنالیز و سنجش نمونه،
                            اطلاعات خود را وارد نمایید.

                        </p>
                    </div>
                    <form

                        onSubmit={handleSubmit(submit)}

                        className="
space-y-5
"

                    >





                        <div

                            className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"

                        >



                            <Input

                                label="نام و نام خانوادگی"

                                name="name"

                                register={register}

                                error={errors.name?.message}

                            />




                            <Input

                                label="شماره تلفن همراه"

                                name="phone"

                                register={register}

                                error={errors.phone?.message}

                            />





                            <Input

                                label="نام مجموعه یا شرکت"

                                name="company"

                                register={register}

                            />





                            <Input

                                label="سمت شغلی"

                                name="position"

                                register={register}

                            />




                        </div>





                        <Input

                            label="پست الکترونیک (ایمیل)"

                            name="email"

                            type="email"

                            register={register}

                            error={errors.email?.message}

                        />






                        <button

                            type="submit"

                            disabled={loading}

                            className="
w-full
py-4
rounded-2xl
text-white
font-bold
bg-gradient-to-l
from-[#73c2fb]
to-blue-600
disabled:opacity-50
"

                        >

                            {

                                loading

                                    ?

                                    "در حال ثبت..."

                                    :

                                "ثبت اطلاعات"

                            }


                        </button>



                        <p

                            className="
text-center
text-xs
text-slate-400
mt-5
"

                        >

                            🔒 اطلاعات شما نزد آزمایشگاه محفوظ است.

                        </p>





                    </form>
                </div>
            </main>
        </div>
    )

}



