
const ProductCard = () => {
  return (
    <div className="flex">
        <div className="flex flex-col justify-start h-fit">
	<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-4xl ml-5 border border-white bg-white">
		<div className="w-full md:w-1/2 bg-white grid place-items-center">
        

    </div>
			<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<h1 className="text-3xl font-semibold">Citrogen 10 tablet 10 mg</h1>

                            <h1 className="text-2xl font-semibold mt-4 mb-0">Price</h1>
                            <p className="text-green-800 text-xl mt-1">$2.34</p>

                            <h1 className="text-2xl font-semibold mt-2">Type</h1>
                            <p className="text-green-800 text-xl">Tablet (Oral)</p>

                            

                            <h1 className="text-2xl font-semibold mt-2">Strength</h1>
                            <p className="text-green-800 text-xl mt-1">500mg</p>

                            <h1 className="text-2xl font-semibold mt-2">Expires on</h1>
                            <p className="text-green-800 text-xl mt-1">12/2/2025</p>
			</div>
		</div>
	</div>
    <div className="flex flex-col items-center h-fit ml-10">
    <div className="rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex justify-between mb-4">
            <div className="flex items-center">
                <img src="https://via.placeholder.com/80" alt="Product Image" className="mr-4" />
                <div>
                    <h2 className="font-bold">Product Name</h2>
                    <p className="text-gray-700">Product Description</p>
                </div>
            </div>
            <div className="flex items-center">
                <button className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                <div className="mx-4">
                    <input type="number" value="1" className="w-16 text-center" />
                </div>
                <span className="font-bold">$19.99</span>
            </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between items-center">
            <span className="font-bold">Subtotal:</span>
            <span className="font-bold">$19.99</span>
        </div>
        <div className="flex justify-between items-center mt-3">
            <span>Taxes:</span>
            <span>$1.00</span>
        </div>
        <div className="flex justify-between items-center mt-3">
            <span>Offer:</span>
            <span>$2.00</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
            <span className="font-bold">Total:</span>
            <span className="font-bold">$20.99</span>
        </div>
        <div className="flex justify-end mt-6 ">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Checkout</button>
        </div>
    </div>
</div>
    </div>
  )
}

export default ProductCard