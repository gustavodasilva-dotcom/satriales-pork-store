import { FC } from 'react';

import FrontStoreImage from '../../assets/satriales-front-store.jpeg';
import './AboutUs.style.scss';

const AboutUs: FC = () => {
  return (
    <div className='AboutUs'>
      <h1 className='title'>
        About us
      </h1>
      <article className='content'>
        <div className='description'>
          <p>Satriale's Pork Store is a traditional Italian Meat Market located in Drelly, New Jersey. For the past 50 years, we have served our clients with the best meat products. Originally founded by Mr. Satriale, his pork shop continues to be a landmark to the new jerseyan community.</p>
          <p>If you're from New Jersey (or is stopping by this great city), please, come and pay us a visity.</p>
        </div>
        <div className='visual-aids'>
          <div className='image-container'>
            <img
              src={FrontStoreImage}
              alt={`Satriale's front store`}
            />
          </div>
          <div className='location-container'>
            <div className='address-info'>
              <span className='street-name'>
                101 Kearny Ave
              </span>
              <br />
              <span className='city-country'>
                Kearny, NJ 07032, USA
              </span>
            </div>
            <div className='google-map'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.284179702071!2d-74.15552199999999!3d40.755773999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c254693ccf02fd%3A0x628a151331b624d4!2s101%20Kearny%20Ave%2C%20Kearny%2C%20NJ%2007032%2C%20USA!5e0!3m2!1sen!2sbr!4v1681771648491!5m2!1sen!2sbr'
                width='200'
                height='250'
                style={{ border: 0 }}
                allowFullScreen={true}
                loading={'lazy'}
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default AboutUs;