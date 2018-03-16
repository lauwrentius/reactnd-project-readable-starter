const URL = 'http://localhost:3001'
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'whatever-you-want'
}

class API{
  static getCategories(){
    return fetch(`${URL}/categories`,{
      headers: HEADERS,
      method: 'GET'
    }).then(res => res.json())
      .then(data => data.categories)
  }

  static getPosts(category = ''){
    let path = (category === '')? '/posts' : `/${category}/posts`

    return fetch(`${URL}${path}`,{
      headers: HEADERS,
      method: 'GET'
    }).then(res => res.json())
  }
  static votePost(id, vote){
    return fetch(`${URL}/posts/${id}`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify({option:vote})
    }).then(res => res.json())
  }
  static deletePost(id){
    return fetch(`${URL}/posts/${id}`,{
      headers: HEADERS,
      method: 'DELETE',
    }).then(res => res.json())
  }

  static getPostDetails(id){
    return fetch(`${URL}/posts/${id}`,{
      headers: HEADERS,
      method: 'GET'
    }).then(res => res.json())
  }


  static getPostComments(id){
    return fetch(`${URL}/posts/${id}/comments`,{
      headers: HEADERS,
      method: 'GET'
    }).then(res => res.json())
  }
  static voteComment(id, vote){
    return fetch(`${URL}/comments/${id}`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify({option:vote})
    }).then(res => res.json())
  }
  static deleteComment(id){
    return fetch(`${URL}/comments/${id}`,{
      headers: HEADERS,
      method: 'DELETE'
    }).then(res => res.json())
  }
}
export default API
