


interface InputProps {

    label: string;

    name: string;

    type?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;

    error?: string;

}

export default function Input({

    label,

    name,

    type = "text",

    register,

    error


}: InputProps) {


    return (


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


                {label}


                <span

                    className="text-red-500mr-1"

                >

                    *

                </span>


            </label>



            <input


                type={type}


                {...register(name)}


                className="
w-full
min-h-[48px]
px-4
py-3
rounded-2xl
bg-[#f8fbff]
border
border-[#d4e7f7]
outline-none
text-slate-800
transition
focus:bg-white
focus:border-[#73c2fb]
focus:ring-4
focus:ring-[#73c2fb]/20
"
            />
            {
                error &&

                <p

                    className="
text-red-500
text-xs
mt-2
"

                >

                    {error}

                </p>
            }
        </div>


    )

}