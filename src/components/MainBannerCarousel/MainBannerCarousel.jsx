import CustomSwiper from '../CustomSwiper/CustomSwiper';
import classes from './MainBannerCarousel.module.scss';
import './MainBannerCarousel.scss';
import { useEffect } from 'react';
import { useReadData } from '@/firebase/firestore';
import loadSwiperSlider from '@/utils/swiper-utils/loadSwiperSlider';
import MainBannerCard from './MainBannerCard';
import swiperBanner1 from '../../../public/img/MainBanner/swiperBanner1.jpg';
import swiperBanner2 from '../../../public/img/MainBanner/swiperBanner2.jpg';
import swiperBanner3 from '../../../public/img/MainBanner/swiperBanner3.jpg';
export default function MainBannerCarousel(props) {
  const { title } = props;
  const swiperParams = {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: { delay: 3500, disableOnInteraction: true },
  };
  // const imgLoc = '@/../public/img/MainBanner/swiperBanner';
  const bannerImgList = [swiperBanner1, swiperBanner2, swiperBanner3];

  const swiperSliderContensArray = loadSwiperSlider(
    bannerImgList,
    MainBannerCard
  );
  // console.log('swiperSliderContensArray', swiperSliderContensArray);
  return (
    <section className={'MainBannerCarousel'}>
      <CustomSwiper
        nextBtnClass={`${classes.horizontalSwiperNavigation} ${classes.horizontalSwiperNavigationNext}`}
        prevBtnClass={`${classes.horizontalSwiperNavigation} ${classes.horizontalSwiperNavigationPrev}`}
        swiperParams={swiperParams}
        swiperSliderContensArray={swiperSliderContensArray}
      />
    </section>
  );
}
