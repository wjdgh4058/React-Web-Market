import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartPopupVisibleState } from '@/@atom/addCartPopup/cartPopupVisibleState';
import styles from './AddCartPopup.module.scss';

export function AddCartPopup({ data }) {
  const [productCount, setProductCount] = useState(1);
  const setCartPopupVisible = useSetRecoilState(cartPopupVisibleState);
  const minusBtn = useRef();
  const plusBtn = useRef();

  const productInfo = { ...data };

  const handleDecrease = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  const handleIncrease = () => {
    if (productCount < data.stock) {
      setProductCount(productCount + 1);
    }
  };

  useEffect(() => {
    if (productCount <= 1) {
      minusBtn.current.style.backgroundPosition = '-8px -46px';
      plusBtn.current.style.backgroundPosition = '-8px -8px';
      minusBtn.current.style.cursor = 'default';
      plusBtn.current.style.cursor = 'pointer';
    } else if (productCount > 1 && productCount < data.stock) {
      minusBtn.current.style.backgroundPosition = '-8px -8px';
      plusBtn.current.style.backgroundPosition = '-8px -8px';
      minusBtn.current.style.cursor = 'pointer';
      plusBtn.current.style.cursor = 'pointer';
    } else {
      minusBtn.current.style.backgroundPosition = '-8px -8px';
      plusBtn.current.style.backgroundPosition = '-8px -46px';
      minusBtn.current.style.cursor = 'pointer';
      plusBtn.current.style.cursor = 'default';
    }
  }, [productCount]);

  const handlePoppupVisible = () => {
    setCartPopupVisible(false);
  };

  // 로컬스토리지에 해당 상품 docId 랑 선택한 수량 저장, 이미 로컬스토리지에 상품 id 가 들어있다면 값이 바뀌지 않고 alert 창으로 표시
  const handleLocalData = () => {
    console.log(productInfo);
    productInfo.count = productCount;
    setCartPopupVisible(false);
    // const productInfo = {
    //   docId: data.id,
    //   count: productCount,
    // };
    // 로컬에 있는 객체 데이터 중복 여부 확인
    const addCartLocalData = JSON.parse(localStorage.getItem('addCart')) || [];

    let isduplicate = false;
    addCartLocalData.forEach((product) => {
      if (productInfo.key === product.key) isduplicate = true;
    });

    if (isduplicate) {
      localStorage.setItem('addCart', JSON.stringify(addCartLocalData));
      alert('이미 장바구니에 담겨 있습니다 !');
      return;
    }

    addCartLocalData.push(productInfo);
    localStorage.setItem('addCart', JSON.stringify(addCartLocalData));

    // console.log(JSON.parse(localStorage.getItem('addCart')));
  };
  return (
    <div className={styles.cartPopupBackground}>
      <div className={styles.cartPopupWindow}>
        <div className={styles.cartPopup}>
          <div className={styles.cartPopupInfo}>
            <div className={styles.cartPopupInfoDetail}>
              <div className={styles.cartPopupInfoDetailName}>
                <span className={styles.cartPopupInfoDetailNameText}>
                  {data.name}
                </span>
              </div>
              <div className={styles.cartPopupInfoDetailPrice}>
                <div className={styles.cartPopupInfoDetailPriceText}>
                  <span>
                    {data.salePrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                  <span>원</span>
                </div>
                <div className={styles.cartPopupInfoDetailPriceBtnBox}>
                  <button
                    ref={minusBtn}
                    aria-label="수량내리기"
                    className={styles.cartPopupInfoDetailPriceBtnBoxDecreaseBtn}
                    type="button"
                    onClick={handleDecrease}
                  ></button>
                  <div className={styles.cartPopupInfoDetailPriceBtnBoxCount}>
                    {productCount}
                  </div>
                  <button
                    ref={plusBtn}
                    aria-label="수량올리기"
                    className={styles.cartPopupInfoDetailPriceBtnBoxIncreaseBtn}
                    type="button"
                    onClick={handleIncrease}
                  ></button>
                </div>
              </div>
              <div className={styles.cartPopupInfoDetailPriceStock}>
                현재 재고 : {data.stock}
              </div>
            </div>
          </div>
          <div className={styles.cartPopupPrice}>
            <div className={styles.cartPopupPriceTotal}>
              <p className={styles.cartPopupPriceTotalText}>합계</p>
              <div>
                <span className={styles.cartPopupPriceTotalPrice}>
                  {(data.salePrice * productCount)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </span>
                <span className={styles.cartPopupPriceTotalWon}>원</span>
              </div>
            </div>
          </div>
          <div className={styles.cartPopupCtr}>
            <button
              className={styles.cartPopupCtrCancleBtn}
              type="button"
              onClick={handlePoppupVisible}
            >
              <span className={styles.cartPopupCtrCancleBtnText} type="button">
                취소
              </span>
            </button>
            <button
              className={styles.cartPopupCtrAddBtn}
              type="button"
              onClick={handleLocalData}
            >
              <span className={styles.cartPopupCtrAddBtnText}>
                장바구니 담기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
