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

  static addPost(post){
    return fetch(`${URL}/posts`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(post)
    }).then(res => res.json())
  }
  static getPosts(category = ''){
    let path = (category === '')? '/posts' : `/${category}/posts`

    return fetch(`${URL}${path}`,{
      headers: HEADERS,
      method: 'GET'
    }).then(res => res.json())
  }
  static editPost(id, post){
    return fetch(`${URL}/posts/${id}`,{
      headers: HEADERS,
      method: 'PUT',
      body: JSON.stringify(post)
    }).then(res => res.json())
  }
  static votePost(id, vote){
    return fetch(`${URL}/posts/${id}`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(vote)
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
  static addComment(comment){
    return fetch(`${URL}/comments`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(comment)
    }).then(res => res.json())
  }
  static editComment(id, comment){
    return fetch(`${URL}/comments/${id}`,{
      headers: HEADERS,
      method: 'PUT',
      body: JSON.stringify(comment)
    }).then(res => res.json())
  }
  static voteComment(id, vote){
    return fetch(`${URL}/comments/${id}`,{
      headers: HEADERS,
      method: 'POST',
      body: JSON.stringify(vote)
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
