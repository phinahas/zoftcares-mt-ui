
import ProductScreen from '../../../screens/Product/ProductScreen'

const ProductPage = ({ params }) => {
  const { productId } = params;

  return (
    <ProductScreen producId={productId} />
  )
};

export default ProductPage;
