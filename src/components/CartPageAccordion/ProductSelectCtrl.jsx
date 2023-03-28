import checkBtnOn from '@/../public/ProductListImage/Check_on.svg';
import checkBtnOff from '@/../public/ProductListImage/Check_off.svg';
import styles from './CartPageAccordion.module.scss';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { cartTotalSeletState } from '@/@atom/cartPage/cartTotalSeletState';
import { selectTotalPriceState } from '@/@atom/cartPage/selectTotalPriceState';
import { selectInfoState } from '@/@atom/cartPage/selectInfoState';
import { removeDuplicates } from '@/utils/removeDuplicates';

export function ProductSelectCtrl({ cartData }) {
  const [totalSelectState, setTotalSelectState] =
    useRecoilState(cartTotalSeletState);
  // const [selectTotalPrice, setSelectTotalPrice] = useRecoilState(
  //   selectTotalPriceState
  // );
  const [selectBtnTogle, setSelectBtnTogle] = useState(true);

  const [selectTotalPrice, setSelectTotalPrice] = useRecoilState(
    selectTotalPriceState
  );
  const [selectInfo, setSelectInfo] = useRecoilState(selectInfoState);

  const localData = JSON.parse(localStorage.getItem('addCart'));

  // const totolPrice = selectInfo.reduce((a, b) => a.price + b);
  let totalPrice = 0;

  if (selectInfo.length > 0) {
    // const noDuplicateData = removeDuplicates(selectInfo)
    //   // console.log(updateData);

    totalPrice = selectInfo.map((a) => a.price).reduce((a, b) => a + b);
  }

  // useEffect(() => {
  //   if (totalSelectState.length > 0) {
  //     const filteredTotalSelect = totalSelectState.filter((item, index) => {
  //       return totalSelectState.indexOf(item) === index;
  //     });
  //     setTotalSelectState(filteredTotalSelect);
  //   }
  // }, []);

  const handleAllSelect = () => {
    if (!selectBtnTogle) {
      const nameArr = [];
      localData.forEach((el) => nameArr.push(el.name));
      setTotalSelectState(nameArr);
      setSelectTotalPrice(totalPrice);
    } else {
      setTotalSelectState([]);
      // setSelectTotalPrice([]);
      setSelectTotalPrice(0);
    }

    setSelectBtnTogle(!selectBtnTogle);
  };

  return (
    <div className={styles.selectCtrlContainer}>
      <div className={styles.selectCtrl}>
        <div className={styles.selectCtrlAll}>
          <button
            className={styles.selectCtrlAllBtn}
            type="button"
            onClick={handleAllSelect}
          >
            <img
              alt="상품 선택 체크 버튼"
              src={
                localData
                  ? totalSelectState.length === localData.length
                    ? checkBtnOn
                    : checkBtnOff
                  : checkBtnOff
              }
            />
            {localData ? (
              <span className={styles.selectCtrlAllText}>
                전체 선택 {`(${totalSelectState.length}/${localData.length})`}
              </span>
            ) : (
              <span className={styles.selectCtrlAllText}>전체 선택</span>
            )}
          </button>
        </div>
        <span className={styles.selectCtrlLine}></span>
        <button className={styles.selectCtrlDelete} type="button">
          선택삭제
        </button>
      </div>
    </div>
  );
}
