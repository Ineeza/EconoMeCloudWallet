// import axios from 'axios'
// export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
// const getPostsRequest = () => {
//   return {
//     type: GET_POSTS_REQUEST
//   }
// }
// 
// export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
// const getPostsSuccess = (json) => {
//   return {
//     type: GET_POSTS_SUCCESS,
//     posts: json,
//     receivedAt: Date.now()
//   }
// }
// 
// export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE'
// const getPostsFailure = (error) => {
//   type: GET_POSTS_FAILURE,
//   error
// }
// 
// export const getPosts = () => {
//   return (dispatch) => {
//     dispatch(getPostsRequest())
//     return axios.get(`http://localhost:3000/api/v1/posts`)
//       .then(res =>
//         dispatch(getPostsSuccess(res.data))
//       ).catch(err =>
//         dispatch(getPostsFailure(err))
//       )
//   }
// }
