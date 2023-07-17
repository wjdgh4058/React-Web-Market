// import classes from './HomePage.module.scss';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { currentProductState } from '@/@atom/currentProductState';
import { cartPopupVisibleState } from '@/@atom/addCartPopup/cartPopupVisibleState';
import { AddCartPopup } from '@/components/AddCart/AddCartPopup';
import ProductCarousel from '@/components/ProductCarousel/ProductCarousel';
import RecentProductCarousel from '@/components/RecentProductCarousel/RecentProductCarousel';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import PopupAd from '@/components/PopupAd/PopupAd';
import MainBannerCarousel from '@/components/MainBannerCarousel/MainBannerCarousel';
import { useEffect } from 'react';

function HomePage() {
  let currentProduct = useRecoilValue(currentProductState);
  let cpv = useRecoilValue(cartPopupVisibleState);
  // function handelGetCurProduct() {
  //   console.log('currentProduct', currentProduct);
  // }
  // console.log('Lendered', currentProduct);
  useEffect(() => {
    localStorage.setItem('addCart', JSON.stringify([]));
  });

  const navigate = useNavigate();

  function handleNavigateToRegisterPage(params) {
    navigate('/register');
  }

  return (
    <div className="HomePage">
      <Header />
      <MainBannerCarousel />
      <div style={{ position: 'relative' }}>
        <RecentProductCarousel title="최근 본 상품" />
        <ProductCarousel title="이 상품 어때요?" />
        <ProductCarousel title="놓치면 후회할 가격" />
        {currentProduct && cpv ? <AddCartPopup data={currentProduct} /> : null}
      </div>
      <PopupAd />
      <Footer />
    </div>
  );
}

export default HomePage;
