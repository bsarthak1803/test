import {React, useEffect, useState} from 'react'
import './App4.css'
import Posts from './posts'
import Pagination from './pagination'

function App4(){
    const [posts, setPosts] = useState([])
    const [loading , setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    useEffect ( () => {
        const fetchPosts = async () =>{
            setLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            console.log(res);
            const data = await res.json();
            setPosts(data);
            console.log(posts);
            setLoading(false);
        }

        //call the function
        fetchPosts()
    },[])

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (number) => {
        setCurrentPage(number);
    }

    return (
        <div className = 'container mt-5'>
            <h1 className='text-primary mb-3'>My blog</h1>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
        </div>
    )
}

export default App4