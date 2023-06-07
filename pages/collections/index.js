import React, { useState, useEffect, useContext } from "react"
import FavoritesHeader from "@/components/FavoritesHeader/FavoritesHeader"
import SectionHeader from "@/components/SectionHeader/SectionHeader"
import axios from "axios"
import CollectionBubble from "@/components/CollectionBubble/CollectionBubble"
import AvailableCollectionItems from "@/components/AvailableCollectionItems/AvailableCollectionItems"
import { CollectionsContext } from "./CollectionsContext"
import { OverlayContext } from "@/components/OverlayContext/OverlayContext"
import CreateNewCollectionModal from "@/components/CreateNewCollectionModal/CreateNewCollectionModal"
import styles from "../../styles/collections.module.css"

export default function Collections({ favorites }) {
  const [collections, setCollections] = useState([])

  const {
    isNewCollection,
    setIsNewCollection,
    selectedItems,
    setSelectedItems,
    selectFromFavorites,
    setSelectFromFavorites,
    selectedItemCount,
    setSelectedItemCount,
    collectionName,
    setCollectionName,
    collectionId,
    setCollectionId,
  } = useContext(CollectionsContext)

  const {
    overlay,
    setOverlay,
    createCollectionModal,
    setCreateCollectionModal,
  } = useContext(OverlayContext)

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/collections").then((response) => {
        setCollections(response.data.collections)
      })
    } catch (error) {
      console.log(error)
    }
  }, [selectFromFavorites])

  useEffect(() => {
    try {
      axios.get("http://localhost:3000/api/collections").then((response) => {
        setCollections(response.data.collections)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    setSelectedItemCount(selectedItems.length)
  }, [selectedItems])

  return (
    <>
      <div className={styles.modals}>
        {createCollectionModal ? (
          <CreateNewCollectionModal
            setCollectionName={setCollectionName}
            setOverlay={setOverlay}
            setCreateCollectionModal={setCreateCollectionModal}
            setIsNewCollection={setIsNewCollection}
            setSelectFromFavorites={setSelectFromFavorites}
          />
        ) : null}
        {selectFromFavorites ? (
          <AvailableCollectionItems
            isNewCollection={isNewCollection}
            favorites={favorites}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            selectFromFavorites={selectFromFavorites}
            setSelectFromFavorites={setSelectFromFavorites}
            selectedItemCount={selectedItemCount}
            collectionName={collectionName}
            setCollectionName={setCollectionName}
            collectionId={collectionId}
            setOverlay={setOverlay}
          />
        ) : null}
      </div>
      <div className={styles.container}>
        <div className={styles.collections_wrapper}>
          <FavoritesHeader />
          <SectionHeader section={"collections"} />
          <CollectionBubble
            isDefault={true}
            setCreateCollectionModal={setCreateCollectionModal}
            setOverlay={setOverlay}
          />
          <div className={styles.collections_grid}>
            {collections.length > 0
              ? collections.map((collection, index) => {
                  return (
                    <CollectionBubble
                      key={index}
                      id={collection.id}
                      isDefault={false}
                      collectionName={collection.collectionName}
                      collectionItems={collection.items.selectedItems}
                      setSelectFromFavorites={setSelectFromFavorites}
                      isNewCollection={isNewCollection}
                      setIsNewCollection={setIsNewCollection}
                      setCollectionId={setCollectionId}
                    />
                  )
                })
              : null}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const favoritesResponse = await fetch("http://localhost:3000/api/favorites")
  const favoritesData = await favoritesResponse.json()

  return {
    props: {
      favorites: favoritesData.favorites,
    },
  }
}
