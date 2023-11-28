import React, { useRef, useState } from 'react'
import styles from '../styles/Main.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { offersAarray } from '@/data/home'
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'

export interface OffersProps {}

const Offers: React.FC<OffersProps> = () => {
  return (
    <div className={styles.offers}>
      <Swiper
        slidesPerView={'auto'}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="offers_swiper"
      >
        {offersAarray.map((offer) => (
          <SwiperSlide key={offer.image}>
            <Link href="">
              <img src={offer.image} alt="" />
            </Link>
            <span>{offer.price}$</span>
            <span>-{offer.discount}%</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Offers
