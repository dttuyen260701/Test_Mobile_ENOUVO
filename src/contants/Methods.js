export const loadData = async(url, method, params) => {
  try {
    const request_options = {
        method: method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
    }
    if(method !== 'GET') {
      request_options.body = JSON.stringify(params)
    }
    let resp_TRENDING = await fetch(url, request_options)
    let respone = await resp_TRENDING.json()
    // debugger
    return respone.data
  } catch (error) {
    console.log("Load Data: ", error)
    return 'Error'
  }
}