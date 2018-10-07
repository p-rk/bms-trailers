export const getMoviesList = data => {
  const movies = data[1]
  const list = Object.values(movies)
  return list
}

export const sortData = (data, index) => {
  const clickedItem = data.filter(
    (item, Currentindex) => Currentindex === index
  )
  const rest = data.filter((item, Currentindex) => Currentindex !== index)
  return [...clickedItem, ...rest]
}

export const createChunks = data => {
  return data.reduce(
    (list, value, index) => {
      if (index % 5 === 0 && index !== 0) list.push([])
      list[list.length - 1].push(value)
      return list
    },
    [[]]
  )
}

export const debounce = (callBack, delay) => {
  let timerId = null
  return () => {
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout(callBack, delay)
  }
}

export const formatVotes = votes => {
  const amt = votes.toString()
  const newVotes = Math.floor(amt).toString()
  const lastThree = newVotes.substring(newVotes.length - 3)
  const otherNumbers = newVotes.substring(0, newVotes.length - 3)
  const newlastThree = otherNumbers !== '' ? `,${lastThree}` : lastThree
  const res = `${otherNumbers.replace(
    /\B(?=(\d{2})+(?!\d))/g,
    ','
  )}${newlastThree}`
  return res
}
