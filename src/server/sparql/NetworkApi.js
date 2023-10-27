import axios from 'axios'

export const runNetworkQuery = async ({
  endpoint,
  prefixes,
  links,
  limit,
  nodes,
  id,
  optimize
}) => {
  const payload = {
    endpoint,
    prefixes,
    links,
    nodes,
    limit,
    id,
    optimize
  }
  const url = 'https://sparql-network.demo.seco.cs.aalto.fi/query'
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    console.log(payload)
    const response = await axios.post(url, payload, config)
    console.log(response.data)
    console.log('nodes[0]')
    console.log(response.data.elements.nodes[0])
    return {
      data: response.data
    }
  } catch (error) {
    if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
      console.log(error.response.data)
    // console.log(error.response.status);
    // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
    // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}
