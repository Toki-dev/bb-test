import React from 'react'
import Chips from './Chips'

export const SearchFilter = ({ onSearch, filter }) => (
  <Chips
    placeholder='Filter'
    onSearch={onSearch}
    chips={filter}
  />
)

export default SearchFilter
