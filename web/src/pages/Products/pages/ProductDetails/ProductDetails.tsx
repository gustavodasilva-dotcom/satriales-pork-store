import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import { plainModal } from 'utils/Modals';
import ProductImagesCarousel from './components/ProductImagesCarousel/ProductImagesCarousel';

import { IProduct } from 'interfaces/IProduct';
import { IImage } from 'interfaces/IImage';
import './ProductDetails.style.scss';

const ProductDetails: FC = () => {
  const [_product, _setProduct] = useState<IProduct>();
  const [_images, _setImages] = useState<IImage[]>([]);

  const { id } = useParams();
  const _axiosPrivate = useAxiosPrivate();

  const _getProduct = () => {
    _axiosPrivate.get<IProduct>(`v1/products/${id}`)
      .then(res => {
        const data = res.data;
        _setProduct(data);
        _setImages(data.images);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const _handleUserInfo = () => {
    plainModal({
      type: 'warning',
      message: 'This function is not available right now!'
    });
  };

  useEffect(() => {
    _getProduct();
  }, []);

  return (
    <div className='ProductDetails'>
      <div className='title-wrapper'>
        <h1 className='title'>{_product?.name}</h1>
      </div>
      <ProductImagesCarousel images={_images} />
      <div className='details-wrapper'>
        <div className='description-container'>
          <div>
            <p>{_product?.description}</p>
          </div>
        </div>
        <div className='payment-container'>
          <div className='price'>
            <span>$ {Number(_product?.price.$numberDecimal).toFixed(2)}</span>
          </div>
          <div className='add-to-cart'>
            <button onClick={_handleUserInfo}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;