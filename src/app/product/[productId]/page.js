import ProductScreen from '../../../screens/Product/ProductScreen';

// Define the dynamic routes to pre-render
export async function generateStaticParams() {

  const productIds = await fetchProductIds();

  return productIds.map((id) => ({
    productId: id.toString(), 
  }));
}

const ProductPage = ({ params }) => {
  const { productId } = params;

  return (
    <ProductScreen productId={productId} />
  );
};

export default ProductPage;
