export default function auth() {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve({
        name: 'Jose Baena',
        avatar: 'https://pbs.twimg.com/profile_images/652717609742274560/R1ycsg0H_bigger.jpg',
        uid: 'josedab'
      })
    }, 2000)
  })
}