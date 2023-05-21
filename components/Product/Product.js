import React, { useEffect } from "react"
import Image from "next/image"
import Stars from "../Stars/Stars"
import FavoriteButton from "../FavoriteButton/FavoriteButton"
import { useRouter } from "next/router"
import styles from "../../styles/Product.module.css"

export default function Product(props) {
  const {
    product,
    id,
    images,
    title,
    brand,
    category,
    rate,
    count,
    price,
    isFavorite,
  } = props

  const router = useRouter()

  function handleProductClick() {
    router.push(`/category/${category}/${id}`)
  }

  return (
    <div onClick={handleProductClick} className={styles.product} id={id}>
      <div className={styles.favorite_button_wrapper}>
        <FavoriteButton
          product={product}
          square={false}
          isFavorite={isFavorite}
        />
      </div>
      <div className={styles.product_image_wrapper}>
        <Image src={images[0]} layout="fill" alt="Product image" />
      </div>
      <div className={styles.product_information}>
        <div className={styles.product_title}>
          <span className={styles.brand_name}>{brand} - </span>
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.rate}>
          <div>
            <Stars rate={rate} />
          </div>
          <div className={styles.count}>{`(${count})`}</div>
        </div>
        <div className={styles.price}>{`${price} $`}</div>
      </div>
    </div>
  )
}
