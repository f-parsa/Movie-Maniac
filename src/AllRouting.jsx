import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TopRated from '/TopRated/TopRated'
import Popular from '/Popular/Popular'

const AllRouting = () => {
  return (
    <Routes>
        <Route path='/' element={<Popular/>}/>
        <Route path='/toprated' element={<TopRated/>}/>

    </Routes>
  )
}

export default AllRouting