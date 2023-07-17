import { storingWaySort } from '@/utils/storingWay/storingWaySort';
import { useEffect, useState } from 'react';
import { CartPageSet } from './CartPageSet';
import { ProductSelectCtrl } from './ProductSelectCtrl';
import refrigeratedImg from '@/../public/icons/web-icons/Refrigerated.svg';
import frozenImg from '@/../public/icons/web-icons/Frozen.svg';
import normalImg from '@/../public/icons/web-icons/Normal.svg';
import styles from './CartPageAccordion.module.scss';

export function CartPageAccordion({ data }) {
  const [refrigerated, setRefrigerated] = useState([]);
  const [frozen, setFrozen] = useState([]);
  const [roomTemperature, setRoomTemperature] = useState([]);

  useEffect(() => {
    if (data) {
      setRefrigerated(storingWaySort(data, '냉장'));
      setFrozen(storingWaySort(data, '냉동'));
      setRoomTemperature(storingWaySort(data, '상온'));
    }
  }, [data]);
  if (data) {
    if (!data || data.length < 1) {
      return (
        <div>
          <ProductSelectCtrl cartData={data} />
          <div className={styles.nonAddCartProduct}>
            장바구니에 담긴 상품이 없습니다.
          </div>
          <ProductSelectCtrl cartData={data} />
        </div>
      );
    } else {
      return (
        <div>
          <ProductSelectCtrl cartData={data} />
          {refrigerated.length > 0 && (
            <CartPageSet
              data={refrigerated}
              productType={'냉장'}
              storingWayImg={refrigeratedImg}
            />
          )}
          {frozen.length > 0 && (
            <CartPageSet
              data={frozen}
              productType={'냉동'}
              storingWayImg={frozenImg}
            />
          )}
          {roomTemperature.length > 0 && (
            <CartPageSet
              data={roomTemperature}
              productType={'상온'}
              storingWayImg={normalImg}
            />
          )}
          <ProductSelectCtrl cartData={data} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <ProductSelectCtrl cartData={data} />
        <div className={styles.nonAddCartProduct}>
          장바구니에 담긴 상품이 없습니다.
        </div>
        <ProductSelectCtrl cartData={data} />
      </div>
    );
  }
}
