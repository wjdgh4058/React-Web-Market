import classes from '@/components/ProductInfo/ProductInfo.module.scss';
import { currentProductState } from '@/@atom/currentProductState';
import { useRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { changePriceNumToString } from '@/utils/priceNumberToString';
import { changePriceNumToStringNoWon } from '@/utils/priceNumberToStringNoWon';

export function ProductInfo() {
  const [CurrentProduct, setCurrentProduct] =
    useRecoilState(currentProductState);

  const [productCount, setProductCount] = useState(1);
  const minusBtn = useRef();
  const plusBtn = useRef();

  const productInfo = { ...CurrentProduct };

  const handleDecrease = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  const handleIncrease = () => {
    if (productCount < CurrentProduct.stock) {
      setProductCount(productCount + 1);
    }
  };

  useEffect(() => {
    if (productCount <= 1) {
      minusBtn.current.style.backgroundPosition = '-8px -46px';
      plusBtn.current.style.backgroundPosition = '-8px -8px';
      minusBtn.current.style.cursor = 'default';
      plusBtn.current.style.cursor = 'pointer';
    } else if (productCount > 1 && productCount < CurrentProduct.stock) {
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

  const handleLocalData = () => {
    // console.log(productInfo);
    productInfo.count = productCount;
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
    <div className={classes.productDetailWrap}>
      <section className={classes.product}>
        <h2 className={classes.a11yHidden}>
          {CurrentProduct.name} 상품 상세페이지
        </h2>

        <img
          alt={`${CurrentProduct.name} ${'이미지'}`}
          className={classes.productMainImg}
          src={CurrentProduct.mainImg}
        />

        <div className={classes.productDetailInfo}>
          <p className={classes.shippingWay}>
            {CurrentProduct.detailInfo.shippingWay}
          </p>

          <h3 className={classes.name}>
            [{CurrentProduct.brand}] {CurrentProduct.name}
          </h3>

          <p className={classes.description}>{CurrentProduct.description}</p>

          <div>
            <p className={classes.saleRatio}>
              {CurrentProduct.saleRatio !== 0 ? (
                <span>{CurrentProduct.saleRatio}% &nbsp;</span>
              ) : null}
            </p>

            <h4 className={classes.salePrice}>
              {CurrentProduct.salePrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              <span>원</span>
            </h4>
          </div>

          <p className={classes.price}>
            {CurrentProduct.saleRatio !== 0 ? (
              <span>
                {CurrentProduct.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                원
              </span>
            ) : null}
          </p>

          <p className={classes.alert}>로그인 후, 적립 혜택이 제공됩니다.</p>

          <ul>
            <li>
              <p>배송</p>
              <p>
                {CurrentProduct.detailInfo.shippingWay}
                <span className={classes.lighter}>
                  {CurrentProduct.detailInfo.shippingWay === '샛별배송' ? (
                    <span>
                      23시 전 주문 시 내일 아침 7시 전 도착
                      <br />
                      (대구·부산·울산 샛별배송 운영시간 별도 확인)
                    </span>
                  ) : null}
                </span>
              </p>
            </li>

            <li>
              <p>판매자</p>
              <p>{CurrentProduct.detailInfo.producer}</p>
            </li>

            <li>
              <p>포장타입</p>
              <p>
                {CurrentProduct.detailInfo.wrappingType}
                <span className={classes.lighter}>
                  택배 배송은 에코 포장이 스티로폼으로 대체됩니다.
                </span>
              </p>
            </li>

            <li>
              <p>판매단위</p>
              <p>{CurrentProduct.detailInfo.salesUnit}</p>
            </li>

            <>
              {CurrentProduct.detailInfo.productWeight !== null ? (
                <li>
                  <p>중량/용량</p>
                  <p>{CurrentProduct.detailInfo.productWeight}</p>
                </li>
              ) : null}
            </>

            <li>
              <p>원산지</p>
              <p>{CurrentProduct.detailInfo.productOrigin}</p>
            </li>

            <>
              {CurrentProduct.detailInfo.alergicInfo !== null ? (
                <li>
                  <p>알레르기 정보</p>
                  <p className={classes.lighter}>
                    {CurrentProduct.detailInfo.alergicInfo &&
                      CurrentProduct.detailInfo.alergicInfo}
                  </p>
                </li>
              ) : null}
            </>

            <li>
              <p>상품선택</p>
              <div className={classes.productSelect}>
                <span className={classes.productSelectItem}>
                  [{CurrentProduct.brand}] {CurrentProduct.name}
                </span>
                <div className={classes.productSelectPriceInfo}>
                  <div className={classes.productSelectPriceInfoQuantity}>
                    <button
                      ref={minusBtn}
                      aria-label="수량내리기"
                      type="button"
                      className={
                        classes.productSelectPriceInfoQuantityDecreaseBtn
                      }
                      onClick={handleDecrease}
                    ></button>
                    <div
                      className={classes.productSelectPriceInfoQuantityCount}
                    >
                      {productCount}
                    </div>
                    <button
                      ref={plusBtn}
                      aria-label="수량올리기"
                      type="button"
                      className={
                        classes.productSelectPriceInfoQuantityIncreaseBtn
                      }
                      onClick={handleIncrease}
                    ></button>
                  </div>
                  <span className={classes.producSelectPriceInfoSumPrice}>
                    {changePriceNumToString(CurrentProduct.salePrice)}
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <p className={classes.productTotalPrice}>
            총 상품금액:{' '}
            <span>
              {changePriceNumToStringNoWon(
                productCount * CurrentProduct.salePrice
              )}
            </span>
            원
          </p>
          <div className={classes.btnArea}>
            <img
              alt="관심 상품으로 등록되어 있습니다."
              src="img/ProductDetail/heart-on.svg"
            />
            <img
              alt="해당 상품의 재입고 알림을 받지 않는 상태입니다."
              src="img/ProductDetail/alarm-off.svg"
            />
            <button
              className={classes.btnAreaAddCartBtn}
              type="button"
              onClick={handleLocalData}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </section>
      <ul className={classes.productInfoTablist}>
        <li className={`${classes.tab} ${classes.isSelected}`} type="button">
          상품설명
        </li>

        <li className={classes.tab} type="button">
          상세정보
        </li>

        <li className={classes.tab} type="button">
          후기<span>({CurrentProduct.reviewCount})</span>
        </li>

        <li className={classes.tab} type="button">
          문의
        </li>
      </ul>
      <section className={classes.scrollableInfo}>
        <h2 className={classes.a11yHidden}>{CurrentProduct.name} 상품 설명</h2>

        <div>
          <img alt="디테일 이미지 1" src={CurrentProduct.detailImg[0]} />
          <p className={classes.description}>{CurrentProduct.description}</p>
          <p className={classes.name}>{CurrentProduct.name}</p>
          <p className={classes.detailedDescription}>
            {CurrentProduct.detailInfo.detailedDescription}
          </p>
        </div>

        <div>
          <img alt="디테일 이미지 2" src={CurrentProduct.detailImg[1]} />
          <p className={classes.why}>WHY BOBSA</p>
          <img alt="" src="img/ProductDetail/WHY-BOBSA.png" />
        </div>
      </section>
    </div>
  );
}
