import image from "../images/1sr.jpg";
export default function order() {
  return (
    <>
      <div className=" p-4">
        <span className="font-semibold  text-2xl">My Orders:</span>
      </div>
      <div className="">
        <div className="flex border p-3  rounded shadow-sm max-sm:flex-col">
          <div className="p-2 mr-3 w-56 h-56">
            <img src={image} alt="" />
          </div>
          <div className="  p-4 max-md:text-xs  ">
            <h2 className="text-sm font-bold mb-2">Order ID: {order.id} efiwebu18923e0812ue`901ue`0e`08e</h2>
            <p className="text-gray-600 mb-2">Product:2d3du3hdqnw9hdn whd 1ibd wi bdwd i    d   nd1p dbdi 1ibdqbd qk dx {order.product}</p>
            <p className="text-gray-600 mb-2">Quantity:WD1D {order.quantity}</p>
            <p className="text-gray-600 mb-2">Price: 0IDN12ID${order.price}</p>
            <p className="text-gray-600 mb-2">Status: WODNIWDNHJQ{order.price}</p>
          </div>
        </div>
        <div className="flex border p-3  rounded shadow-sm max-sm:flex-col">
          <div className="p-2 mr-3 w-56 h-56">
            <img src={image} alt="" />
          </div>
          <div className="  p-4 max-md:text-xs  ">
            <h2 className="text-sm font-bold mb-2">Order ID: {order.id} efiwebu18923e0812ue`901ue`0e`08e</h2>
            <p className="text-gray-600 mb-2">Product:2d3du3hdqnw9hdn whd 1ibd wi bdwd i    d   nd1p dbdi 1ibdqbd qk dx {order.product}</p>
            <p className="text-gray-600 mb-2">Quantity:WD1D {order.quantity}</p>
            <p className="text-gray-600 mb-2">Price: 0IDN12ID${order.price}</p>
            <p className="text-gray-600 mb-2">Status: WODNIWDNHJQ{order.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}
