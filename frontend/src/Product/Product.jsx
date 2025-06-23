import Header from "../HomePage/Header"
import ProductPage from "./ProductPage"
import ProductDecsription from "./ProductDecsription"
import ProductCard from "./ProductCard"
import Footer from "../HomePage/Footer"

const Product = () => {
  return (
    <div>
        <Header />
        <ProductPage />
        <ProductDecsription />
        <ProductCard />
        <hr className="mt-10"/>
        <Footer />
    </div>
  )
}

export default Product