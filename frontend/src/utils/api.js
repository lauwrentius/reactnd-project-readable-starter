const URL = 'http://localhost:3001'
const HEADERS = { 'Authorization': 'whatever-you-want' }

export function getCategories(){
  return fetch(URL+'/categories',{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
    .then(data => data.categories)
}

export function getPosts(category = ''){
  let path = (category === '')? '/posts' : '/'+category+'/posts'

  console.log('api',path)
  return fetch(URL+path,{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
    .then(data => {console.log("ASD",data); return data})
}


//   fetch(url+'/posts',{
//     headers: {
//       'Authorization': 'whatever-you-want'
//     },
//     method: 'GET'
//   }).then( response =>{
//     response.json().then(data=>{
//       console.log(data)
//       data.map( (post) => {
//         this.props.addPost(post)
//       })
//     })
//   })
