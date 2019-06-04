import React, { Component } from 'react';
import IncrementButtons from './incrementButtons';
import Image from './Image';
import multipleUsers from './multiple-users-silhouette.svg';
import manUser from './man-user.svg';
import handsUp from './hands-up.svg';
import singleBed from './single-bed.svg';
import './App.css';
import './IncrementButtons.css';
// import { thisExpression } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
    this.memberPerRoom = 4;
    this.state = {
      roomCount: 1,
      roomMaxCount: 5,
      roomMinCount: 1,
      adultCount: 1,
      adultMaxCount: 20,
      adultMinCount: 1,
      childrenCount: 0,
      childrenMaxCount: 15,
      childrenMinCount: 0
    }
  }

  increaseRoomCount = () => {
    this.setState({
      roomCount: this.state.roomCount + 1
    }, () => {
      if (this.state.roomCount > this.state.adultCount) {
        this.setState({
          adultCount: this.state.adultCount + 1,
          adultMinCount: this.state.adultCount + 1
        })
      }
    });
  }
  decreaseRoomCount = () => {
    if (this.state.roomCount <= this.state.adultCount &&
      ((this.state.roomCount - 1) * this.memberPerRoom >= this.state.adultCount + this.state.childrenCount)) {
      this.setState({
        roomCount: this.state.roomCount - 1
      }, () => {
        if ((this.state.roomCount * this.memberPerRoom > this.state.adultCount + this.state.childrenCount &&
          (this.state.roomCount - 1) * this.memberPerRoom < this.state.adultCount + this.state.childrenCount) ||
          (this.state.roomCount < this.state.adultCount &&
            (this.state.roomCount - 1) * this.memberPerRoom < this.state.adultCount + this.state.childrenCount)) {
          this.setState({
            roomMinCount: this.state.roomCount
          });
        }
        if (this.state.roomCount < this.state.adultCount) {
          this.setState({
            adultMinCount: this.state.roomCount
          });
        }
      });
    }
  }

  increaseAdultCount = () => {
    if (this.state.adultCount + this.state.childrenCount < this.state.roomMaxCount * this.memberPerRoom) {
      this.setState({
        adultCount: this.state.adultCount + 1
      }, () => {
        if (this.state.adultCount + this.state.childrenCount > this.state.roomCount * this.memberPerRoom) {
          this.setState({
            roomCount: this.state.roomCount + 1
          });
        }
        if (this.state.adultCount + this.state.childrenCount === this.state.roomMaxCount * this.memberPerRoom) {
          this.setState({
            adultMaxCount: this.state.adultCount,
            childrenMaxCount: this.state.childrenCount
          });
        }
        if (this.state.adultCount + this.state.childrenCount === this.state.roomMaxCount * this.memberPerRoom) {
          this.setState({
            roomMinCount: this.state.roomCount
          });
        }
      });
    }
  }
  decreaseAdultCount = () => {
    if (this.state.adultCount >= this.state.roomCount) {
      this.setState({
        adultCount: this.state.adultCount - 1
      }, () => {
        if (this.state.adultCount === this.state.roomCount) {
          this.setState({
            adultMinCount: this.state.adultCount,
            roomMinCount: this.state.roomCount
          });
        }
        if (this.state.adultCount + this.state.childrenCount <= (this.state.roomCount - 1) * this.memberPerRoom) {
          this.setState({
            roomMinCount: this.state.roomCount - 1
          });
        }
        if (this.state.adultCount + this.state.childrenCount < this.state.roomMaxCount * this.memberPerRoom) {
          this.setState({
            childrenMaxCount: (this.state.roomMaxCount * this.memberPerRoom) - this.state.adultCount
          });
        }
      });
    }
  }

  increaseChildCount = () => {
    if (this.state.adultCount + this.state.childrenCount < this.state.roomMaxCount * this.memberPerRoom &&
      this.state.childrenCount < this.state.childrenMaxCount) {
      this.setState({
        childrenCount: this.state.childrenCount + 1
      }, () => {
        if (this.state.adultCount + this.state.childrenCount > this.state.roomCount * this.memberPerRoom) {
          this.setState({
            roomCount: this.state.roomCount + 1
          }, () => {
            if (this.state.adultCount < this.state.roomCount) {
              this.setState({
                adultCount: this.state.adultCount + 1,
                adultMinCount: this.state.adultCount + 1
              });
            }
          });
        }
        if (this.state.childrenCount + this.state.adultCount > (this.state.roomCount - 1) * this.memberPerRoom &&
          this.state.childrenCount + this.state.adultCount <= this.state.roomCount * this.memberPerRoom) {
          this.setState({
            roomMinCount: this.state.roomCount
          });
        }
      });
    }
  }
  decreaseChildCount = () => {
    if (this.state.adultCount >= this.state.roomCount &&
      this.state.adultCount + this.state.childrenCount <= this.state.roomCount * this.memberPerRoom) {
      this.setState({
        childrenCount: this.state.childrenCount - 1
      }, () => {
        if (this.state.childrenCount + this.state.adultCount >= (this.state.roomCount - 1) * this.memberPerRoom &&
          this.state.childrenCount + this.state.adultCount <= this.state.roomCount * this.memberPerRoom
          && this.state.roomCount >= this.state.roomMinCount) {
          this.setState({
            roomMinCount: this.state.roomCount - 1
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Title">
            <Image
              id='multi-user-logo'
              className='icon multi-user-logo-class'
              src={multipleUsers}
              alt='multi-user-alt'
            />
            <p className="heading">Choose number of <b>People</b></p>
          </div>
          <div className="Main-box">
            <div className="row pad-23">
              <div className="col-md-6 ta-left">
                <Image
                  id='single-bed-logo'
                  className='icon single-bed-logo-class'
                  src={singleBed}
                  alt='single-bed-alt'
                />
                <span className="pl-5">ROOMS</span>
              </div>
              <div class="col-md-6 ta-right">
                <IncrementButtons
                  id='room'
                    className="pad-5"
                  baseCount={this.state.roomCount}
                  minCount={this.state.roomMinCount}
                  maxCount={this.state.roomMaxCount}
                  increasedMethod={this.increaseRoomCount}
                  decreaseMethod={this.decreaseRoomCount}
                />
              </div>
            </div>
            <hr />
            <div className="row pad-23">
              <div className="col-md-6 ta-left">
                <Image
                  id='man-user-logo'
                  className='icon man-user-logo-class'
                  src={manUser}
                  alt='man-user-alt'
                />
                <span className="pl-5">ADULTS</span>
              </div>
              <div class="col-md-6 ta-right">
                <IncrementButtons
                  id="adult"
                  className="pad-5"
                  baseCount={this.state.adultCount}
                  minCount={this.state.adultMinCount}
                  maxCount={this.state.adultMaxCount}
                  increasedMethod={this.increaseAdultCount}
                  decreaseMethod={this.decreaseAdultCount}
                />
              </div>
            </div>
            <hr />
            <div className="row pad-23">
              <div className="col-md-6 ta-left">
                <Image
                  id='hands-up-logo'
                  className='icon hands-up-logo-class'
                  src={handsUp}
                  alt='hands-up-alt'
                />
                <span className="pl-5">CHILDREN</span>
              </div>
              <div className="col-md-6 ta-right">
                <IncrementButtons
                  id="child"
                  className="pad-5"
                  baseCount={this.state.childrenCount}
                  minCount={this.state.childrenMinCount}
                  maxCount={this.state.childrenMaxCount}
                  increasedMethod={this.increaseChildCount}
                  decreaseMethod={this.decreaseChildCount}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
