
import ProductScreen from '../../../screens/Product/ProductScreen';

const ProductPage = ({ params }) => {
  const { productId } = params;  

  return <ProductScreen productId={productId} />; 
};

export default ProductPage;
