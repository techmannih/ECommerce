import image from "../images/1sr.jpg";

export default function cart() {
  return (
    <>
      <div className="m-2  ">
        <div className=" my-4">
        <div className="p-2 flex justify-center">
          <span className="font-semibold text-xl">Subtotal:</span>
        </div>
        <div className="p-2 flex justify-center">
          <span>Your Order is free for delivery</span>
        </div>
        <div className="p-2 flex justify-center">
          <button className="p-2 bg-yellow-400 font-semibold rounded-3xl px-4">Proceed to Buy (1 item)</button>
        </div>
        </div>
        <div className="">
          <div className="flex justify-center flex-wrap ">
            <div className="p-5 border border-black rounded-lg w-72 flex justify-center m-2">
              <div className="pro">
                <div className="flex justify-center">
                  <img src={image} alt="" className="w-32 h-32" />
                </div>
                <div className="text-left py-2">
                  <span className="text-gray-500 text-sm">adidas</span>
                  <h5 className="pt-2 text-base text-gray-700">
                    Cartoon Astronaut T-Shirts
                  </h5>
                  <h4 className="text-teal-500">$44</h4>
                </div>
               
                <div className=" flex justify-between">
                  <div className="m-2">
                    <button className="p-2 bg-zinc-200">-</button>count
                    <button className="p-2 bg-zinc-200 ">+</button>
                  </div>
                  <div className="flex ">
                    <button className="bg-orange-400 p-1 py-1 rounded-xl">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 border border-black rounded-lg w-72 flex justify-center m-2">
              <div className="pro">
                <div className="flex justify-center">
                  <img src={image} alt="" className="w-32 h-32" />
                </div>
                <div className="text-left py-2">
                  <span className="text-gray-500 text-sm">adidas</span>
                  <h5 className="pt-2 text-base text-gray-700">
                    Cartoon Astronaut T-Shirts
                  </h5>
                  <h4 className="text-teal-500">$44</h4>
                </div>
               
                <div className=" flex justify-between">
                  <div className="m-2">
                    <button className="p-2 bg-zinc-200">-</button>count
                    <button className="p-2 bg-zinc-200 ">+</button>
                  </div>
                  <div className="flex ">
                    <button className="bg-orange-400 p-1 py-1 rounded-xl">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div><div className="p-5 border border-black rounded-lg w-72 flex justify-center  m-2">
              <div className="pro">
                <div className="flex justify-center">
                  <img src={image} alt="" className="w-32 h-32" />
                </div>
                <div className="text-left py-2">
                  <span className="text-gray-500 text-sm">adidas</span>
                  <h5 className="pt-2 text-base text-gray-700">
                    Cartoon Astronaut T-Shirts
                  </h5>
                  <h4 className="text-teal-500">$44</h4>
                </div>
               
                <div className=" flex justify-between">
                  <div className="m-2">
                    <button className="p-2 bg-zinc-200">-</button>count
                    <button className="p-2 bg-zinc-200 ">+</button>
                  </div>
                  <div className="flex ">
                    <button className="bg-orange-400 p-1 py-1 rounded-xl">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
