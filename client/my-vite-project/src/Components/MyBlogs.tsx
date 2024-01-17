import React, { useEffect, useState } from 'react';
import { DeleteLogo } from '../Logo';
import { useNavigate } from "react-router-dom";

interface BlogImage {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  // Add any other properties if present in your API response
}

const MyBlogs = () => {
  const [images, setImages] = useState<BlogImage[]>([]);
  const [toggle,setToggle]=useState(false)

  const navigate = useNavigate();




  
  
  useEffect(() => {
    const fetchSingleBlog = async () => {
    
        try {
          const res = await fetch(`http://localhost:8000/blog/myBlogs`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!res.ok) {
            throw new Error('Network Error!');
          }

          const data = await res.json();
          // console.log('Fetched Single Blog:', data);
          setImages(data.Blogs)
          setToggle(false)
        } catch (err) {
          console.error('Fetch Single Blog Error:', err);
        }
      }
   

    fetchSingleBlog();
  }, [toggle]);



  const deleteBlog=async(blogId)=>{
    try {
      const res= await fetch(`http://localhost:8000/blog/delete/${blogId}`,{
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
    },
  })
  
  const data= await res.json();
  console.log('mmmmmmmmmmmmmm',data);
setToggle(true)
    } catch (error) {
      
    }
  }
  
  return (
    <div style={styles.container}>
      {images.map((image, index) => (
        <div key={index} style={styles.blogItem}>
          <img src={`http://localhost:8000${image.imageUrl}`} alt={`Image ${index}`} style={styles.image} />
          <h3 style={styles.title}>{image.title}</h3>
          <p style={styles.description}>{image.description}</p>
          <div style={{marginTop:40,  display: 'flex',justifyContent: 'space-between',}}>
            <div onClick={()=>{
              deleteBlog(image._id)
            }}>
          <DeleteLogo />
          </div>
          <button style={{ cursor: 'pointer',
      padding: '5px 5px',
      borderRadius: '5px',}} onClick={()=>{
        navigate(`/userBlog/${image._id}`)
      }}>View</button>
          </div>
        </div>
      ))}
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  
    
  },
  blogItem: {
    width: '355px',
    height:'450px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   marginTop:20
   
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#333',
  },
  description: {
    fontSize: '14px',
    color: '#555',
  },
};

export default MyBlogs;