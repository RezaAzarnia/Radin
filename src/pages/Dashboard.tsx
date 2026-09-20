import {
  useEffect,
  useState
} from "react";

import toast from "react-hot-toast";



interface User {

  id: number;

  name: string;

  company: string;

  position: string;

  phone: string;

  email: string;

  created_at: string;

}





export default function Dashboard() {


  const [users, setUsers] = useState<User[]>([]);


  const [page, setPage] = useState(1);


  const [totalPages, setTotalPages] = useState(1);


  const [total, setTotal] = useState(0);


  const [loading, setLoading] = useState(false);



  const limit = 10;



  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(

        `http://localhost:3000/api/dashboard/users?page=${page}&limit=${limit}`

      );

      const result = await response.json();
      if (result.success) {
        setUsers(
          result.data
        );
        setTotal(
          result.pagination.total
        );
        setTotalPages(
          result.pagination.totalPages
        );
      }
      else {
        toast.error(
          "خطا در دریافت اطلاعات"
        )
      }
    }
    catch (error) {
      console.log(error);
      toast.error(
        "ارتباط با سرور برقرار نشد"
      );
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {


    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();


  }, [page]);











  const changePage = (value: number) => {


    if (
      value < 1 ||
      value > totalPages
    ) {

      return;

    }


    setPage(value);


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
p-4
md:p-8
"

    >



      <div

        className="
max-w-7xl
mx-auto
space-y-6
"

      >



        {/* Header */}


        <section

          className="
relative
overflow-hidden
rounded-[32px]
border
border-white
bg-white/80
backdrop-blur-xl
shadow-[0_20px_50px_-20px_rgba(30,120,200,.25)]
p-6
md:p-8
"

        >


          <div

            className="
absolute
-left-10
-top-10
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
flex
flex-col
md:flex-row
md:items-center
md:justify-between
gap-5
"

          >


            <div

              className="
flex
items-center
gap-4
"

            >


              <div

                className="
bg-white
rounded-3xl
border
border-blue-100
shadow-lg
p-3
"

              >

                <img

                  src="/logo.jpg"

                  className="
w-20
h-20
object-contain
rounded-2xl
"

                />

              </div>




              <div>


                <span

                  className="
inline-flex
items-center
gap-2
bg-blue-50
text-blue-600
border
border-blue-100
rounded-full
px-3
py-1
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

                  پنل مدیریت

                </span>


                <h1

                  className="
mt-3
text-3xl
font-black
text-slate-800
"

                > ّ

                  داشبورد آزمایشگاه

                </h1>



                <p

                  className="
mt-2
text-slate-500
"

                >

                  مدیریت کاربران و درخواست‌های ثبت شده

                </p>


              </div>


            </div>



            <div

              className="
bg-blue-50
rounded-3xl
px-6
py-4
text-center
"

            >

              <p className="text-xs text-slate-500">
                کل کاربران
              </p>


              <p

                className="
text-3xl
font-black
text-blue-600
mt-1
"

              >

                {total}

              </p>


            </div>



          </div>



        </section>








        {/* Stats */}


        <section

          className="
grid
grid-cols-1
sm:grid-cols-3
gap-5
"

        >


          <Stat

            title="کل ثبت نام‌ها"

            value={total.toString()}

          />


          <Stat

            title="صفحه فعلی"

            value={page.toString()}

          />


          <Stat

            title="نمایش در هر صفحه"

            value={limit.toString()}

          />


        </section>







        {/* Table */}



        <section

          className="
bg-white/90
border
border-white
rounded-[32px]
shadow-[0_20px_50px_-20px_rgba(30,120,200,.2)]
overflow-hidden
"

        >



          <div

            className="
p-6
border-b
border-slate-100
"

          >


            <h2

              className="
text-2xl
font-black
text-slate-800
"

            >

              کاربران ثبت شده

            </h2>


            <p

              className="
mt-2
text-sm
text-slate-400
"

            >

              لیست درخواست‌های پذیرش آزمایشگاه

            </p>


          </div>







          {

            loading ?

              (

                <div

                  className="
p-12
text-center
"

                >

                  <div

                    className="
animate-spin
w-10
h-10
border-4
border-blue-200
border-t-blue-600
rounded-full
mx-auto
"

                  />


                  <p

                    className="
mt-4
text-blue-600
font-bold
"

                  >

                    در حال دریافت اطلاعات...

                  </p>


                </div>

              )



              :



              (



                <div className="overflow-x-auto">


                  <table

                    className="
w-full
min-w-[900px]
"

                  >


                    <thead

                      className="
bg-blue-50
"

                    >

                      <tr>

                        <th className="p-5 text-right">
                          نام
                        </th>

                        <th className="p-5 text-right">
                          مجموعه
                        </th>

                        <th className="p-5 text-right">
                          سمت
                        </th>

                        <th className="p-5 text-right">
                          شماره
                        </th>

                        <th className="p-5 text-right">
                          ایمیل
                        </th>

                      </tr>

                    </thead>



                    <tbody>


                      {

                        users.map(user => (


                          <tr

                            key={user.id}

                            className="
border-b
border-slate-100
hover:bg-blue-50/60
transition
"

                          >


                            <td className="p-5 font-bold text-slate-800">

                              {user.name}

                            </td>


                            <td className="p-5 text-slate-600">

                              {user.company || "-"}

                            </td>



                            <td className="p-5">

                              <span

                                className="
bg-blue-50
text-blue-600
rounded-full
px-3
py-1
text-xs
font-bold
"

                              >

                                {user.position || "-"}

                              </span>


                            </td>



                            <td className="p-5">

                              {user.phone}

                            </td>



                            <td className="p-5">

                              {user.email || "-"}

                            </td>



                          </tr>


                        ))


                      }


                    </tbody>



                  </table>


                </div>


              )

          }



          {/* Pagination */}



          <div

            className="
p-6
border-t
border-slate-100
flex
justify-center
gap-2
"

          >


            <button

              onClick={() => changePage(page - 1)}

              disabled={page === 1}

              className="
px-4
py-2
rounded-2xl
bg-blue-50
font-bold
disabled:opacity-40
"

            >

              قبلی

            </button>




            {

              Array.from(
                {
                  length: totalPages
                }
              ).map((_, index) => (


                <button

                  key={index}

                  onClick={() => changePage(index + 1)}

                  className={

                    page === index + 1

                      ?

                      `
px-4
py-2
rounded-2xl
bg-gradient-to-l
from-[#73c2fb]
to-blue-600
text-white
font-bold
`

                      :

                      `
px-4
py-2
rounded-2xl
bg-white
border
text-blue-600
font-bold
`

                  }

                >

                  {index + 1}

                </button>


              ))


            }



            <button

              onClick={() => changePage(page + 1)}

              disabled={page === totalPages}

              className="
px-4
py-2
rounded-2xl
bg-blue-50
font-bold
disabled:opacity-40
"

            >

              بعدی

            </button>


          </div>



        </section>





      </div>


    </div>

  )


}






function Stat({

  title,

  value

}: {

  title: string;

  value: string;

}) {


  return (

    <div

      className="
rounded-[28px]
bg-white/90
border
border-white
shadow-lg
p-6
"

    >


      <p

        className="
text-sm
text-slate-500
font-bold
"

      >

        {title}

      </p>



      <h3

        className="
text-4xl
font-black
text-blue-600
mt-3
"

      >

        {value}

      </h3>


    </div>

  )


}