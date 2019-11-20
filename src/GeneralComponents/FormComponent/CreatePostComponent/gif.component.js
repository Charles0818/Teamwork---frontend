import React, { Component } from 'react';
import '../form.css'
// import { faFile } from '@fortawesome/free-solid-svg-icons';

window.URL = window.URL || window.webkitURL;

class CreateGif extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            file: null
         }
    }

    handleUserInput = (event) => {
      event.preventDefault();
      // const name = event.target.name;
      const { name, value } = event.target
      this.setState({[name]: value}, () => {
        console.log(value);
      console.log(this.state);
      })

      // if (event.target.atttributes.type === 'file') {
        
      // }
    }

    displayUploadedFile = (event) => {
      event.preventDefault();
      const { target } = event;

    //   uploadList.childNodes.forEach((el, index) => {
    //     el.addEventListener('click', ()=> {
    //     target.src = window.URL.createObjectURL(files[index]);
    //     target.onload =()=> window.URL.revokeObjectURLtarget.src);
    //     });
    // });
    }


    render() { 
        return ( 
          <form className="form" method="POST" ref="createGif">
            <label> GIF title
              <input type="text" name="title" placeholder="Enter title" 
                  className="form-control" value ={this.state.title}
                  onChange = {(event) => this.handleUserInput(event)}
              />
            </label>
            <div className="padding-bottom-md">
              <label className="btn--file d-inline-block">
                <div className="upload--icon">
                  <i className="far fa-image font-md d-inline-block"></i>
                  <span className="padding-left-sm font-sm">{this.state.file || 'Upload GIF...'}</span>
                </div>
                <input type="file" name="file" multiple={false} onChange = {(event) => this.handleUserInput(event)} />
              </label>
              {/* <span className="">hello</span> */}
            </div>
            <div className="file_display" style={{width: '100px', height: '100px'}}>
              <img src="" alt="" />
            </div>
            <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Publish" className="submit--btn" />
          </form>
        );
    }
}
 
export default CreateGif;