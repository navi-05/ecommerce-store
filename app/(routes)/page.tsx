

import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"
import ProductList from "@/components/product-list"
import { getProducts } from "@/actions/get-products";
import { getBillboard } from "@/actions/get-billboard";

export const revalidate = 0;

const HomePage = async () => {

  const billboard = await getBillboard("b4b9c590-7d90-4bdc-af3e-2e1f3fc88e65")
  const products = await getProducts({ isFeatured: true })

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage