import resetButton from '@/../public/ProductListImage/resetButton.svg';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { productListCheckReset } from '@/@atom/accordion/productListCheckReset';
import { productListResetBtn } from '@/@atom/accordion/productListResetBtn';
import styles from './ProductListNav.module.scss';

// 아코디언 필터 & 리셋 버튼
export function AccordionFillter() {
  const checkReset = useRecoilValue(productListCheckReset);
  const resetBtn = useRef();
  const [resetBtnData, setResetBtnData] = useRecoilState(productListResetBtn);

  useEffect(() => {
    if (checkReset) {
      resetBtn.current.style.color = 'rgb(209, 122, 1)';
    } else {
      resetBtn.current.style.color = 'rgb(221, 221, 221)';
    }
  }, [checkReset]);

  const handleResetBtn = () => {
    if (checkReset) {
      setResetBtnData(true);
    }
    return resetBtnData;
  };
  console.log(resetBtnData);
  return (
    <div className={styles.accordionFillter}>
      <span className={styles.accordionFillterName}>필터</span>
      <button
        className={styles.accordionFillterButton}
        type="button"
        onClick={handleResetBtn}
      >
        <img alt="초기화 버튼 이미지" src={resetButton} />
        <span ref={resetBtn} className={styles.accordionFillterButtonText}>
          초기화
        </span>
      </button>
    </div>
  );
}
