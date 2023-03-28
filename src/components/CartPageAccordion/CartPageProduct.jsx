import { useCallback, useEffect, useRef, useState } from 'react';
import checkBtnOn from '@/../public/ProductListImage/Check_on.svg';
import checkBtnOff from '@/../public/ProductListImage/Check_off.svg';
import cancleBtn from '@/../public/icons/web-icons/Cancel.svg';
import styles from './CartPageAccordion.module.scss';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartTotalSeletState } from '@/@atom/cartPage/cartTotalSeletState';
import { selectTotalPriceState } from '@/@atom/cartPage/selectTotalPriceState';
import { selectInfoState } from '@/@atom/cartPage/selectInfoState';
import { selectPriceState } from '@/@atom/cartPage/selectPriceState';
import { changePriceNumToString } from '@/utils/priceNumberToString';
import { localStorageDeleteData } from '@/utils/localStorageDeleteData';
import { localDataRanderState } from '@/@atom/cartPage/localDataRanderState';
import { removeDuplicates } from '@/utils/removeDuplicates';
import { Link } from 'react-router-dom';
import { currentProductState } from '@/@atom/currentProductState';

export function CartPageProduct({ data }) {
  // console.log(data);
  const [productCount, setProductCount] = useState(data.count);
  const minusBtn = useRef();
  const plusBtn = useRef();

  const setCurrentProductState = useSetRecoilState(currentProductState);

  // 버튼 토글 상태
  const [selectBtnTogle, setSelectBtnTogle] = useState(true);
  const [totalSelectState, setTotalSelectState] =
    useRecoilState(cartTotalSeletState);

  const [selectTotalPrice, setSelectTotalPrice] = useRecoilState(
    selectTotalPriceState
  );

  const [selectPrice, setSelectPrice] = useRecoilState(selectPriceState);

  const [selectInfo, setSelectInfo] = useRecoilState(selectInfoState);

  const [localDataRander, setLocalDataRander] =
    useRecoilState(localDataRanderState);

  const handleDecrease = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
      setSelectTotalPrice(selectTotalPrice - data.salePrice);
      // setTotalSelectState((prev) => [...prev, data.name]);
      // setSelectTotalPrice((prev) => [...prev, productPrice]);
      if (totalSelectState.includes(data.name)) {
        const newItem = { name: data.name, price: productPrice };
        const updateData = selectInfo.map((item) => {
          if (item.name === newItem.name) return newItem;
          else return item;
        });

        if (
          updateData.filter((item) => item.name === newItem.name).length === 0
        ) {
          updateData.push(newItem);
        }
        const noDuplicateData = removeDuplicates(updateData, 'name');
        // console.log(updateData);
        setSelectInfo(noDuplicateData);
      }
    }
  };

  const handleIncrease = () => {
    if (productCount < data.stock) {
      setProductCount(productCount + 1);
      setSelectTotalPrice(selectTotalPrice + data.salePrice);
      // setTotalSelectState((prev) => [...prev, data.name]);
      // setSelectTotalPrice((prev) => [...prev, productPrice]);
      if (totalSelectState.includes(data.name)) {
        const newItem = { name: data.name, price: productPrice };
        const updateData = selectInfo.map((item) => {
          if (item.name === newItem.name) return newItem;
          else return item;
        });

        if (
          updateData.filter((item) => item.name === newItem.name).length === 0
        ) {
          updateData.push(newItem);
        }
        const noDuplicateData = removeDuplicates(updateData, 'name');
        // console.log(updateData);
        setSelectInfo(noDuplicateData);
      }
    }
  };

  const productPrice = data.salePrice * productCount;

  const handleChangeCurrentProduct = useCallback(() => {
    setCurrentProductState(data);
    console.log(data);
  }, []);

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

  // 처음에 전체 선택이기 때문에 처음에 한번만 선택 배열에 전체 값을 넣어준다.
  useEffect(() => {
    setTotalSelectState((prev) => [...prev, data.name]);

    setSelectPrice((prev) => [...prev, productPrice]);

    setSelectInfo((prev) => [
      ...prev,
      { name: data.name, price: productPrice },
    ]);
  }, []);

  useEffect(() => {
    if (selectPrice.length > 0) {
      // console.log('selectPrice: ', selectPrice);
      setSelectTotalPrice(selectInfo.reduce((a, b) => a + b.price, 0));
    }
  }, [selectPrice]);

  useEffect(() => {
    // console.log(selectTotalPrice);
  }, [selectTotalPrice]);

  useEffect(() => {
    // console.log('aa');
    if (totalSelectState.includes(data.name)) {
      const newItem = { name: data.name, price: productPrice };
      const updateData = selectInfo.map((item) => {
        if (item.name === newItem.name) return newItem;
        else return item;
      });

      if (
        updateData.filter((item) => item.name === newItem.name).length === 0
      ) {
        updateData.push(newItem);
      }
      const noDuplicateData = removeDuplicates(updateData, 'name');
      // console.log(updateData);
      setSelectInfo(noDuplicateData);
    }
  }, [productPrice, totalSelectState]);

  const handleChecked = () => {
    if (!selectBtnTogle) {
      minusBtn.current.disabled = false;
      plusBtn.current.disabled = false;
      minusBtn.current.style.cursor = 'pointer';
      plusBtn.current.style.cursor = 'pointer';
      setTotalSelectState((prev) => [...prev, data.name]);
      setSelectTotalPrice(selectTotalPrice + productPrice);
      // setSelectTotalPrice((prev) => [...prev, productPrice]);
      if (totalSelectState.includes(data.name)) {
        const newItem = { name: data.name, price: productPrice };
        const updateData = selectInfo.map((item) => {
          if (item.name === newItem.name) return newItem;
          else return item;
        });

        if (
          updateData.filter((item) => item.name === newItem.name).length === 0
        ) {
          updateData.push(newItem);
        }
        const noDuplicateData = removeDuplicates(updateData, 'name');
        // console.log(updateData);
        setSelectInfo(noDuplicateData);
      }
    } else {
      minusBtn.current.disabled = true;
      plusBtn.current.disabled = true;
      minusBtn.current.style.cursor = 'not-allowed';
      plusBtn.current.style.cursor = 'not-allowed';
      setTotalSelectState(totalSelectState.filter((el) => el !== data.name));
      setSelectTotalPrice(selectTotalPrice - productPrice);
      // setSelectTotalPrice(selectTotalPrice.filter((el) => el !== productPrice));
      if (totalSelectState.includes(data.name)) {
        const newItem = { name: data.name, price: 0 };
        const updateData = selectInfo.map((item) => {
          if (item.name === newItem.name) return newItem;
          else return item;
        });

        if (
          updateData.filter((item) => item.name === newItem.name).length === 0
        ) {
          updateData.push(newItem);
        }
        const noDuplicateData = removeDuplicates(updateData, 'name');
        // console.log(updateData);
        setSelectInfo(noDuplicateData);
      }
    }

    setSelectBtnTogle(!selectBtnTogle);
  };

  const handleProductDelete = () => {
    // console.log('상품 삭제');
    localStorageDeleteData('addCart', (object) => object.name === data.name);
    setLocalDataRander(!localDataRander);
    setTotalSelectState(totalSelectState.filter((el) => el !== data.name));
    setSelectTotalPrice(selectTotalPrice - productPrice);
    if (totalSelectState.includes(data.name)) {
      const newItem = { name: data.name, price: 0 };
      const updateData = selectInfo.map((item) => {
        if (item.name === newItem.name) return newItem;
        else return item;
      });

      if (
        updateData.filter((item) => item.name === newItem.name).length === 0
      ) {
        updateData.push(newItem);
      }
      const noDuplicateData = removeDuplicates(updateData, 'name');
      // console.log(updateData);
      setSelectInfo(noDuplicateData);
    }
  };

  return (
    <li className={styles.cartPageProduct}>
      <button
        className={styles.cartPageProductCheckBtn}
        type="button"
        onClick={handleChecked}
      >
        <img
          alt="상품 선택 체크 버튼"
          src={totalSelectState.includes(data.name) ? checkBtnOn : checkBtnOff}
        />
      </button>
      <Link to="/productDetail">
        <button
          className={styles.cartPageProductImg}
          type="button"
          onClick={handleChangeCurrentProduct}
        >
          <img
            alt="상품 메인 이미지"
            className={styles.cartPageProductImgTest}
            src={data.mainImg}
          />
        </button>
      </Link>
      <div className={styles.cartPageProductName}>
        <Link to="/productDetail">
          <button type="button" onClick={handleChangeCurrentProduct}>
            <p
              className={styles.cartPageProductNameDetail}
            >{`[${data.brand}] ${data.name} (${data.storingWay})`}</p>
          </button>
        </Link>
      </div>
      <div className={styles.cartPageProductCountBtn}>
        <button
          ref={minusBtn}
          aria-label="수량내리기"
          className={styles.cartPageProductCountBtnDecreaseBtn}
          type="button"
          onClick={handleDecrease}
        ></button>
        <div className={styles.cartPageProductCountBtnCount}>
          {productCount}
        </div>
        <button
          ref={plusBtn}
          aria-label="수량올리기"
          className={styles.cartPageProductCountBtnIncreaseBtn}
          type="button"
          onClick={handleIncrease}
        ></button>
      </div>
      <div className={styles.cartPageProductPrice}>
        <span className={styles.cartPageProductPriceText}>
          {changePriceNumToString(productPrice)}
        </span>
      </div>
      <button
        className={styles.cartPageProductCancleBtn}
        type="button"
        onClick={handleProductDelete}
      >
        <img alt="장바구니에 담긴 상품 취소 버튼" src={cancleBtn} />
      </button>
    </li>
  );
}
