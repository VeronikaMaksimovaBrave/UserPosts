import axios from 'axios'


export  const  getUsers = async (page) => {
    return await axios.get(`https://gorest.co.in/public-api/users?page=${page + 1}`)
}

export const getPosts = async (postID) => {
    return await axios.get(`https://gorest.co.in/public-api/posts?user_id=${postID}`)
}

