

// Swiper Slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

// Styles
import './portfolio-item.css';

// -------------------

const PortfolioItem=({ item })=> {
  return (
    <div className="portfolio-item-wrapper">
      <div className="portfolio-content">
        <div className="row">
          <div className="one-half width-55">
            <div className="image-slider-wrapper relative block-right">
              <Swiper
                pagination={{ clickable: true }}
                loop={true}
                modules={[Pagination]}
                className="portfolio-slider">
                
                  <SwiperSlide >
                    <img src={item?.image?.url} alt={`portfolio item`} />
                  </SwiperSlide>
                
              </Swiper>
            </div>
          </div>

          <div className="one-half width-40 last">
            <h2 className="entry-title section-title">{item.title}</h2>

            <p className="section-info">{item.description}</p>

            <p>
              Cras pretium metus pulvinar ultricies auctor. In varius purus
              blandit sem mollis tristique. Curabitur sed lorem vel ligula
              pulvinar porttitor. 
            </p>
            <h6 className="">TechStack : </h6>
            <ul>
              {item.techStack?.map((item) => (
                <li >&#x2022; {item}</li>
              ))}
            </ul>
            <p style={{marginTop: "10px"}}>
              <a className="button" href={item?.liveurl} target="_blank" rel="noopener noreferrer">Check Project</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem;
