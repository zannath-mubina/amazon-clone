import React from 'react';
import './Home.css';
import Product from './Product.js';

function Home() {
  return (
    <div className='home'>
        <div className='home_container'>
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={`${process.env.PUBLIC_URL}/carouselImage1.jpg`} className="d-block w-100" alt="carouselImage1"/>
                    </div>
                    <div className="carousel-item">
                        <img src={`${process.env.PUBLIC_URL}/carouselImage2.jpg`} className="d-block w-100" alt="carouselImage2"/>
                    </div>
                    <div className="carousel-item">
                        <img src={`${process.env.PUBLIC_URL}/carouselImage3.png`} className="d-block w-100" alt="carouselImage3"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="home_row">
                <Product
                    id="123"
                    title="M1 Smart Watch for Kids Women Boys Men Girls ID116 Phone Watch Wrist Activity Tracker Multip Functional Smart Watch Compatible with All Android and iOS Devices."
                    price={1899}
                    ratings={4}
                    ratingsCount="1,176"
                    imgSrc="https://m.media-amazon.com/images/I/61Famx7xQwL._SX679_.jpg"
                    altText="Smart Watch"
                />
                <Product 
                    id="456"
                    title="ASUS Vivobook 16X, 144Hz 300nits, Intel Core i5-12500H 2.5 GHz, Creator/Gaming Laptop (16GB RAM/512GB SSD/RTX 3050/win 11/Office Home/50WHr Battery/Cool Silver/1.80 kg)"
                    price={59990}
                    ratings={4}
                    ratingsCount="1,005"
                    imgSrc="https://m.media-amazon.com/images/I/71SRRF9Wx1L._SX679_.jpg"
                    altText="ASUS Vivobook" 
                />
                <Product 
                    id="789"
                    title="Samsung Galaxy S24 Ultra 5G AI Smartphone (Titanium Gray, 12GB, 256GB Storage)"
                    price={121999}
                    ratings={4}
                    ratingsCount="1,664"
                    imgSrc="https://m.media-amazon.com/images/I/81vxWpPpgNL._SX679_.jpg"
                    altText="Samsung Galaxy S24 Ultra"
                />
            </div>
            <div className="home_row">
                <Product 
                    id="012"
                    title="boAt Rockerz Bluetooth Headphones(Black Sabre)"
                    price={1298}
                    ratings={3}
                    ratingsCount="400"
                    imgSrc="https://m.media-amazon.com/images/I/71L70bAl2KL._SX522_.jpg"
                    altText="boAt Rocker"
                />
                <Product 
                    id="345"
                    title="Atomic Habits by James Clear(Author)"
                    price={699}
                    ratings={5}
                    ratingsCount="100,216"
                    imgSrc="https://m.media-amazon.com/images/I/81F90H7hnML._SY466_.jpg"
                    altText="The Atomic Habits"
                />
                <Product
                    id="678"
                    title="ASIAN Men's Casual Snaeker, Gym Shoes"
                    price={869}
                    ratings={4}
                    ratingsCount="600"
                    imgSrc="https://m.media-amazon.com/images/I/61m9CdpTZ4L._SY695_.jpg"
                    altText="ASIAN Men's Casual Snaeker" 
                />
                <Product
                    id="901"
                    title="Samsung 32 L Slim Fry, Convection MWO with Tandoor&Curd making"
                    price={16990}
                    ratings={3}
                    ratingsCount="997"
                    imgSrc="https://m.media-amazon.com/images/I/71P6NwDdenL._SX679_.jpg"
                    altText="Samsung 32 L Slim Fry, Convection"
                />
            </div>
            <div className="home_row">
                <Product 
                    id="234"
                    title="LG Electronics Ultragear 21:9 Curved Gaming LED Monitor 86.42 Cm (34 Inch),AMD Freesync Premium,HDR 10,Height Adjust Stand,Dp,Hdmi,Speaker,Headphone Out"
                    price={32299}
                    ratings={4}
                    ratingsCount="2,440"
                    imgSrc="https://m.media-amazon.com/images/I/61kBMs7G8NL._SX679_.jpg"
                    altText="LG Monitor"
                />
                <Product
                    id="567"
                    title="Safari Casual backpacks 2 compartments, front pocket, bottle holder, School bags for boys & girls, College bag for women and men, Ideal for school, college, office & travel"
                    price={649}
                    ratings={4}
                    ratingsCount="5,059"
                    imgSrc="https://m.media-amazon.com/images/I/61C+07k-y1L._SX679_.jpg"
                    altText="Safari Casual backpack"
                />
            </div>
        </div>
    </div>
  )
}

export default Home
