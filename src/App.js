import React, { Component } from "react";
import axios from "axios"
import "./App.css";

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
    const promise = axios.get("https://jsonplaceholder.typicode.com/posts")
    console.log(promise)
    const {data: posts }= await axios.get("https://jsonplaceholder.typicode.com/posts")
    this.setState({posts})
  }


  handleAdd = () => {
    console.log("Add");

    const obj = { title: 'a', body: 'b'}
  };

  handleUpdate = post => {
    console.log("Update", post);
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
