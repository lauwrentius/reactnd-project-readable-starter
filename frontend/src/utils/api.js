const URL = 'http://localhost:3001'
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
}

export function getCategories(){
  return fetch(`${URL}/categories`,{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
    .then(data => data.categories)
}

export function getPosts(category = ''){
  let path = (category === '')? '/posts' : `/${category}/posts`

  return fetch(`${URL}${path}`,{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
}

export function votePost(id, vote){
  return fetch(`${URL}/posts/${id}`,{
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({option:vote})
  }).then(res => res.json())
}
export function voteComment(id, vote){
  return fetch(`${URL}/comments/${id}`,{
    headers: HEADERS,
    method: 'POST',
    body: JSON.stringify({option:vote})
  }).then(res => res.json())
}

export function getPostDetails(id){
  return fetch(`${URL}/posts/${id}`,{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
}

export function getPostComments(id){
  return fetch(`${URL}/posts/${id}/comments`,{
    headers: HEADERS,
    method: 'GET'
  }).then(res => res.json())
}
