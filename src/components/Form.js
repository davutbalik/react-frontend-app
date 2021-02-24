import React, { Component } from 'react';

class Form extends Component {
  constructor(){
    super();
    this.state ={
      name: '',
      email: '',
      
      }
      this.handleChange = this.handleChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this)

    }
  


  handleChange (event) {
    console.log(event.target.value)
    this.setState({
      ...this.state,
      [event.target.name]:event.target.value
    });
  }

  onFormSubmit (event) {
    // event.preventDefault();
    const url = "http://localhost:8080/api/customers";
      const postDetails = {
        method: "POST",
        body: JSON.stringify( {name: this.state.name,
                              email: this.state.email}),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const postRequest = async () => {
        try {
          const response = await fetch(url, postDetails);
          //ikinci parametre olarak data var, body var/ header var, method var!!!!!!!!
          if (response.ok) {
            let jsonResponse = await response.json();
            console.log(jsonResponse);
          }else {
            throw new Error('Request failed!')
          }
        } catch (error) {
          console.log(error);
        }
      };
    postRequest()
  }



  render() {
    return (
      <div>
        <div>
            <form onSubmit={this.onFormSubmit} style={{margin:'10px'}}>
              <label htmlFor="search" >Search</label>
              <input
                style={{margin:'5px'}} 
                  type="text" 
                  name="name" 
                  id="name"
                  value={this.state.name} 
                  onChange={this.handleChange}/>
                  <input 
                  type="text" 
                  name="email" 
                  id="email"
                  value={this.state.email} 
                  onChange={this.handleChange}/>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
      </div>
    );
  }
}

export default Form;