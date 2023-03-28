import styles from './CartPageCredit.module.scss';
import serchIcon from '@/../public/icons/web-icons/Search.svg';
import { useRecoilState } from 'recoil';
// import { selectInfoState } from '@/@atom/cartPage/selectInfoState';
import { useEffect, useState } from 'react';
import { selectTotalPriceState } from '@/@atom/cartPage/selectTotalPriceState';
import { changePriceNumToStringNoWon } from '@/utils/priceNumberToStringNoWon';
import { currentUserState } from '@/@atom/user/currentUserState';
import { useReadData } from '@/firebase/firestore';
// import { selectInfoState } from '@/@atom/cartPage/selectInfoState';

export function CartPageCredit() {
  let cartLocalData = [];

  cartLocalData = JSON.parse(localStorage.getItem('addCart'));

  const [selectTotalPrice, setSelectTotalPrice] = useRecoilState(
    selectTotalPriceState
  );

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const handleOrder = () => {
    if (currentUser) {
      alert('주문 페이지로 이동합니다.');
    } else {
      alert('로그인 해야만 주문이 가능합니다.');
    }
  };

  return (
    <div className={styles.cartCredit}>
      <div className={styles.cartCreditContainer}>
        <div className={styles.cartCreditAddress}>
          <p className={styles.cartCreditAddressTitle}>배송지</p>
          <div className={styles.cartCreditAddressInfo}>
            {currentUser ? (
              <p className={styles.cartCreditAddressInfoText}>
                {currentUser.adress}
              </p>
            ) : (
              <p className={styles.cartCreditAddressInfoText}>
                <em className={styles.cartCreditAddressInfoTextEm}>
                  배송지를 등록
                </em>
                하고
                <br />
                <span>구매 가능한 상품을 확인하세요!</span>
              </p>
            )}
            <button
              className={styles.cartCreditAddressInfoSerchBtn}
              type="button"
            >
              <span className={styles.cartCreditAddressInfoSerchBtnText}>
                <img
                  className={styles.cartCreditAddressInfoSerchBtnTextImg}
                  src={serchIcon}
                  alt="이미지 검색 돋보기 아이콘"
                />
                <span>주소 검색</span>
              </span>
            </button>
          </div>
        </div>
        <div className={styles.cartCreditTotalPrice}>
          <div className={styles.cartCreditTotalPriceInfo}>
            <span className={styles.cartCreditTotalPriceText}>상품금액</span>
            <span className={styles.cartCreditTotalPriceNumber}>
              {changePriceNumToStringNoWon(selectTotalPrice)}
              <span className={styles.cartCreditTotalPriceWon}>원</span>
            </span>
          </div>
          <div className={styles.cartCreditTotalPriceSale}>
            <span className={styles.cartCreditTotalPriceText}>
              상품할인금액
            </span>
            <span className={styles.cartCreditTotalPriceNumber}>
              0<span className={styles.cartCreditTotalPriceWon}>원</span>
            </span>
          </div>
          <p className={styles.cartCreditTotalPriceSaleDs}>
            로그인 후 할인 금액 적용
          </p>
          <div className={styles.cartCreditTotalPriceDelivery}>
            <span className={styles.cartCreditTotalPriceText}>배송비</span>
            <span className={styles.cartCreditTotalPriceNumber}>
              {selectTotalPrice > 40000 ? 0 : 3000}
              <span className={styles.cartCreditTotalPriceWon}>원</span>
            </span>
          </div>
          {selectTotalPrice < 40000 ? (
            <p className={styles.cartCreditTotalPriceDeliveryDs}>
              {40000 - selectTotalPrice}원 추가주문 시,{' '}
              <strong>무료배송</strong>
            </p>
          ) : null}
          <div className={styles.cartCreditTotalPriceCreditPrice}>
            <span className={styles.cartCreditTotalPriceText}>
              결제예정금액
            </span>
            <span className={styles.cartCreditTotalPriceCreditPriceText}>
              <strong className={styles.cartCreditTotalPriceCreditPriceStrong}>
                {selectTotalPrice > 40000
                  ? changePriceNumToStringNoWon(selectTotalPrice)
                  : changePriceNumToStringNoWon(selectTotalPrice + 3000)}
              </strong>
              <span className={styles.cartCreditTotalPriceWon}>원</span>
            </span>
          </div>
        </div>
        <div className={styles.cartCreditOrder}>
          {cartLocalData.length > 0 ? (
            <button
              className={styles.cartCreditOrderBtnOn}
              onClick={handleOrder}
              type="button"
            >
              <span className={styles.cartCreditOrderBtnText}>주문하기</span>
            </button>
          ) : (
            <button className={styles.cartCreditOrderBtnOff} type="button">
              <span className={styles.cartCreditOrderBtnText}>
                배송지를 입력해주세요
              </span>
            </button>
          )}
          <ul className={styles.cartCreditOrderExplanation}>
            <li
              className={styles.cartCreditOrderExplanationList}
            >{`[주문완료] 상태일 경우에만 주문 취소 가능합니다.`}</li>
            <li
              className={styles.cartCreditOrderExplanationList}
            >{`[밥을사자 > 주문내역 상세페이지] 에서 직접 취소하실 수 있습니다.`}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
