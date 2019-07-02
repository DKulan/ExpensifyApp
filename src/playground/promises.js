const promise = new Promise((res, rej) => {
  setTimeout(() => {
    // res('This is my resolved data')
    rej('Something went wrong')
  }, 2000)
})

promise.then((data) => {
  console.log(data)
}).catch((e) => {
  console.log(e)
})

getData()