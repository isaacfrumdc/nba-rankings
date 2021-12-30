import axios from "axios";
import React from "react";

const baseURL = "http://localhost:7000/api/get";

export default function App() {
    const [post, setPost] = React.useState(null);
    const [error, setError] = React.useState(null);
  
    React.useEffect(() => {
      // invalid url will trigger an 404 error
      axios.get(`${baseURL}`).then((response) => {
        setPost(response.data);
        console.log(response.data)
      }).catch(error => {
        setError(error);

      });
    }, []);
    
    if (error) return `Error: ${error.message}`;
    if (!post) return "No post!"

    const List = props =>
        props.list.map(item => (
            <div key={item.person_id}>
                <span>{item.player_first_name}</span>
                &nbsp;
                <span>{item.player_last_name}</span>
            </div>
        ));
  
    return (
      <div>
        <h1>FUCK</h1>
        <List list={post} />
      </div>
    );
  }