
import Info from "@/components/info"
import Gallery from "@/components/ui/gallery"
import Container from "@/components/ui/container"
import ProductList from "@/components/product-list"
import { getProduct } from "@/actions/get-product"
import { getProducts } from "@/actions/get-products"


interface ProductPageProps {
  params: { 
    productId: string
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {

  const product = await getProduct(params.productId)

  /* 
    * Suggested Products fetching,
    ! Using the category the current product has
  */
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

            {/* Gallery */}
            <Gallery images={product.images} />

            {/* Info */}
            <Info data={product} />
            
          </div>
          <hr className="my-10" />

          <ProductList title="Related Products" items={suggestedProducts} />

        </div>
      </Container>
    </div>
  )

}

export default ProductPage