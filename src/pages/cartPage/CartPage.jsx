import { CartPageAccordion } from '@/components/CartPageAccordion/CartPageAccordion';
import { CartPageCredit } from '@/components/CartPageCredit/CartPageCredit';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useReadData } from '@/firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartTotalSeletState } from '@/@atom/cartPage/cartTotalSeletState';
import styles from './CartPage.module.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { cartPopupVisibleState } from '@/@atom/addCartPopup/cartPopupVisibleState';
import { async } from '@firebase/util';
import { filterByDocId } from '@/utils/filterDocId';
import { localDataRanderState } from '@/@atom/cartPage/localDataRanderState';
import { currentUserState } from '@/@atom/user/currentUserState';
import { mergeObjects } from '@/utils/mergeObjects';

export function CartPage() {
  const [localDataRander, setLocalDataRander] =
    useRecoilState(localDataRanderState);

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  let cartLocalData = [];

  cartLocalData = JSON.parse(localStorage.getItem('addCart'));

  useEffect(() => {
    cartLocalData = JSON.parse(localStorage.getItem('addCart'));
  }, [localDataRander]);

  // let afterLoginData = [];

  // if (currentUser.cartInfo.length > 0) {
  //   // 로그인전 로컬에 담긴 상품 데이터와 로그인 후 유저가 가지고 있던 데이터를 합쳐서 보여주는데 중복인 객체는 count 값이 높은거로 한다.
  //   afterLoginData = mergeObjects(cartLocalData, currentUser.cartInfo);
  //   localStorage.setItem('addCart', JSON.stringify(afterLoginData));
  //   console.log('유저 장바구니에 이미 담긴게 있다', afterLoginData);
  //   console.log('cartLocalData', cartLocalData);
  //   console.log('currentUser.cartInfo', currentUser.cartInfo);
  // } else {
  //   afterLoginData = cartLocalData;
  //   console.log('유저 장바구니 데이터에 담긴게 없다.', afterLoginData);
  //   console.log('cartLocalData', cartLocalData);
  //   console.log('currentUser.cartInfo', currentUser.cartInfo);
  // }

  // const cartData = [];

  // 로컬스토리지에 있는 count 값 추가해 줘야댐
  return (
    <>
      <Header />
      {/* <button onClick={handleData}>asfafas</button> */}
      <div className={styles.cartPage}>
        <h2 className={styles.cartPageTitle}>장바구니</h2>
        <div className={styles.cartPageContainer}>
          <CartPageAccordion data={cartLocalData} />
          <CartPageCredit data={cartLocalData} />
        </div>
      </div>
      <Footer />
    </>
  );
}
