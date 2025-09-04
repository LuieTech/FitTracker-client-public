import React, { useEffect, useState } from 'react'
import { getRapidApi } from '../../services/api-service/api-service'

function Exercises() {

  const [list, setList] = useState([])

  const getExercises = async () => {
    const data = await getRapidApi()
    data && setList(data)
  }

  useEffect(() => {
    getExercises()
  }, [])

  return (
    <div>Exercises</div>
  )
}

export default Exercises