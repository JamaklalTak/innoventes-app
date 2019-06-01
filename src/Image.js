import React, { Component } from 'react';

class Image extends Component {
  render() {
    const { id, className, clickedMethod, src, alt} = this.props;

    return (
      <img 
          id={id}
          className={className}
          src={src} 
          alt={alt}
          onClick={clickedMethod}
          />
    );
  }
}

export default Image;