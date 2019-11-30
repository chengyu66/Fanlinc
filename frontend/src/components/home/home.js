import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ApiService from '../../services/apiservice';
import './home.css';
import {Carousel} from 'react-bootstrap';
import styles from 'bootstrap/dist/css/bootstrap.css';

class home extends Component{
    render(){
        return (
            <Carousel>
                <Carousel.Item>
                <img
                    src="./vc2akf1e6gb31.jpg"
                    alt="very First slide"
                />
                <Carousel.Caption>
                    <div className='home-link'>
                        <a href="http://localhost:3000/fandom/26" >
                            <h3>Naruto Shares New 20th Anniversary Poster</h3>
                            <p>Come and join to share posts and participate in awesome events.</p>
                        </a>
                    </div>

                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    src="./home1.webp"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Show your collections</h3>
                    <p>Share any collections in corresponding fandom.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    src="./home1.jpg"
                    alt="Second slide"
                />
            
                <Carousel.Caption>
                    <h3>Fandoms Collab</h3>
                    <p>Chat with people in different fandoms and participate in events together.</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    src="./home2.jpeg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Kpop Fans Group</h3>
                    <p>Find the latest news about your favorite Kpop groups.</p>
                </Carousel.Caption>
                </Carousel.Item>
          </Carousel>
                );
    }
}
export default home;