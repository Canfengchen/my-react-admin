import React, { Component } from 'react';
import './SIdentify.css'

class SIdentify extends Component{

  SplitCode() {
    const code = this.props.code.split("")
    const result = code.map((item, index) => <div key={index.toString()}>{item}</div>)
    return result
  }
  render () {
    return (
      <div className="identify-code" onClick={this.props.onClick}>
        {this.SplitCode()}
      </div>
    )
  }
}



export default SIdentify;
