import React from 'react'
import { useSelector } from "react-redux"
import { TypeInput } from "components/TypeInput"
import { ScanBarcode } from "components/ScanBarcode"
import styled from "styled-components"
import './style.css'

const InfoText = styled.h1`
  margin-bottom: 20px;
  text-align: center;
`

export const ProductCard = () => {
  const scan = useSelector(state => state.products.product)
  let formatIngredients = []
  let formatNutritients = []

  if (!scan) return null

  if (scan.product && scan.product.generic_name) {
    formatNutritients = scan.product.nutrient_levels_tags.map(ingredient =>
      ingredient
        .replace(/\w+:/, " ")
        .replace(/-/gi, " ")
        .replace(":", " ")
    ) 
  }

  if (scan.product && scan.product.ingredients_analysis_tags) {
    formatIngredients = scan.product.ingredients_analysis_tags.map(ingredient =>
      ingredient
        .replace(/\w+:/, " ")
        .replace(/-/gi, " ")
        .replace(":", " ")
    )
  }

  return (
  
    <Container>
      {!scan.product && (
          
        <InfoText>
          <h1>Hold the barcode to the camera to scan it for information</h1>
        </InfoText>
      )}
      <ScanBarcode />
      <TypeInput />

      {scan.product && (
        <div className='card'>
          <ul className='product'>
            <span className='highlight-info'>Dietary information:</span>
            {formatIngredients.map((ingredient, index) => (
              <p className="List" key={index}>{ingredient}</p>
            ))}
          </ul>
        </div>
      )}

      <div className='not-found'>
        {scan.status === 0 && (
          <InfoText>
            Product not found, scan again or try another product
          </InfoText>
        )}
      </div>
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`