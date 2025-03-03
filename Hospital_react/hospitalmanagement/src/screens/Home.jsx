import React from 'react'
import Header from '../components/Header'
import { booking,history,profile} from '../assets/images/Index.jsx'

const Home = () => {
  return (
    <div>
      <div class="bg-[#0098B9] min-h-screen flex flex-col">
        <Header />

        <div class="p-6 flex-1 justify-center">
        <h1 class="text-center text-white text-[20px] md:text-3xl">Welcome  User</h1>
        <div class="flex flex-col ml-[20px] gap-4 md:flex-row md:justify-between md:mt-[60px]">
            <a href="booking.html " class="bg-white md:w-[400px] w-[250px] h-[50px] md:h-[100px] p-[4px] rounded-md flex justify-center gap-[10px]">
                <img class="w-[20%]" src={booking} alt="book_appoinment"/>
                <h2 class="md:text-xl text-[10px] font-medium text-center mt-[15px]">Book appoinment</h2>
            </a>
            <a href="history.html" class="bg-white md:w-[400px] w-[250px] h-[50px] md:h-[100px] p-[4px] rounded-md flex justify-center gap-[10px]">
                <img class="w-[20%]" src={history} alt="history"/>
                <h2 class="md:text-xl text-[10px] font-medium text-center mt-[15px]">Appoinment History</h2>
            </a>
            <a href="profile.html" class="bg-white md:w-[400px] w-[250px] h-[50px] md:h-[100px] p-[4px] rounded-md flex justify-center gap-[10px]">
                <img class="w-[20%]" src={profile} alt="profile"/>
                <h2 class="md:text-xl text-[10px] font-medium text-center mt-[15px]">Patient Profile</h2>
            </a>
        </div>
    </div>
    <footer class="h-[40%] w-full text-[#076579] text-[10px] text-center  md:text-xl  bg-gradient-to-tr from-[#ffffff] to-[#0098B9] pt-[10px] px-4 ">
        <h3 class="text-center text-white text-xl md:text-2xl pb-[20px]">Contact Us</h3>
        <div class="flex flex-col md:flex-row justify-between">
        <div>
            <a>address : Angamaly ernakulam<br/>
            pin :687235   Kerala</a>
        </div>
        <div>
            <a>phone no :9786543210</a><br/>
            <a>Tele : 0484 88090</a>
        </div>
        <div>
            <a>E-mail : ajhospital@gmail.com</a>
        </div>
        </div>
        </footer>
      </div>
    </div>
  )
}

export default Home