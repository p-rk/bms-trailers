import React from 'react'
import MovieCard from '../components/MovieCard'
import { getMoviesList } from '../helpers'

import Layout from '../components/layout'

const data = require('../../data/list.json')
const list = getMoviesList(data)

const IndexPage = () => (
  <Layout>
    <MovieCard data={list} />
  </Layout>
)

export default IndexPage
