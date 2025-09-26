import React from "react";
// import bg form '../../../'
import bg from "../../assets/Images/bg2_P.png";
import { BestSellerScreen } from "../BestSellerScreen";

function DashboardScreen() {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* <div className="text-white text-3xl font-bold h-full w-full flex flex-col justify-end items-start">
        <div className=" p-10 w-1/3 uppercase text-8xl font-thin">
          GET Closure to our collection
        </div>
        <div className="my-2 p-2 flex justify-end  w-full items-end">
             <div className="border-2 rounded-full p-4">shop now</div>
             </div>
        <div className="border-t-2 w-full text-2xl flex justify-around font-thin">
            <p>Bangles</p>
                        <p>Chains</p>
            <p>Pendent</p>

        </div>
      </div> */}
      <div className="h-full text-white flex flex-col justify-end">
        <div className="h-1/2  flex flex-row justify-between">
          <div className=" flex items-end ">
            <div className="w-1/2 uppercase  text-8xl p-4">
              {" "}
              GET Closure to our collection
            </div>
          </div>
          <div className=" flex  items-end">
            <div className="border-2 p-2 rounded-full w-28 font-bold m-6 flex items-center justify-center">
              shop now
            </div>
          </div>
        </div>
        <div className=" border-t-2">
          <div className="flex justify-around p-4 text-2xl">
            {/* <p>Bangles</p>
            <p>Pendent</p>
            <p>Ring</p> */}
          </div>
        </div>
      </div>
      <BestSellerScreen/>
    </div>
  );
}

export default DashboardScreen;
