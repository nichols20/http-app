import React, { Component } from "react";
import axios from "axios"
import "./App.css";

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts"
class App extends Component {
  state = {
    posts: []
  };


  async componentDidMount() {
    /* In this function I wanted to retrieve data from the back end and set the post state
    based on the array retrieved. First I created a componentDidMount bcause this is the ideal
    place to retrieve data. Inside this function I used the method axios.get() to retrieve data
    from the back-end. The first argument to pass in this method is the url string. Initially this method
    will return a promise which has two imbeded objects that can't be accessed with dot notation. state, 
    and value. The state object will first be shown pending as it awaits the result then will either return
    fullfilled or rejected depending on whether the http request was successfull. The value Object carries
    the value of the actual data retrieved the url passed in the arguement. To access this data I used the keyword
    await which returns the value object. When using the keyword await inside of a function you need to append
    the async keyword infront of the function declaration. I used object destructuring to just pull the data object
    which carries the array of data we need to access and renamed the object to posts. Finally setting the state
    to the value of the newly declared posts object. */
    const {data: posts }= await axios.get(apiEndpoint)
    this.setState({posts})
  }


  handleAdd = async () => {
    /* This handleAdd method is going to be called every time the user clicks the add button resulting
    in a post being pushed to the posts array then populated in the table. To test this first I created an object
    that takes two properties title and body. this object is then posted into the posts database with axios.post()
    The first arguement again is the url where we're sending this data and the second is the object carrying the value of
    the data we're posting. Then I created a posts array that begins with the new post object created. Then spreading
    every other post following it. Finally I set the state to the new posts array created and it should return with all the posts including
    the new one that was just added. */
    const obj = { title: 'a', body: 'b'}
    const {data: post} = await axios.post(apiEndpoint, obj)

    const posts = [post, ...this.state.posts]
    this.setState({posts})
  };

  handleUpdate = async post => {
    post.title = "Updated"
    // When using the put method you need to pass the entire post object as the second argument
    await axios.put(`${apiEndpoint}/${post.id}`, post)
    
    const posts = [...this.state.posts]
    const index = posts.indexOf(post)
    posts[index] = {...post}
    this.setState({posts})
    //In contrast you only need to pass one more properties which are the properties we want to update
    // axios.patch(`${apiEndpoint}/${post.id}`, {title: post.title})
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
