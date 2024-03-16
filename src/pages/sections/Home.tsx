// Data
import { useEffect, useState } from "react";
// import homeData from "../../data/home.json";

import axios from "axios";
import useData from "../../Hook/useData";

// ---------------

function Home() {
  // use hook to fatch dynamic data 
 const data = useData()


  return (
    <section id="home" className="section full-width-section">
      <div className="section-wrapper block">
        <div className="home-left-part">
          <p className="site-des">Hello. My name is</p>
          <h1 className="entry-title">{data?.user?.about.name}</h1>
          <p className="site-info">{data.user?.about.description}</p>

          <div className="social-links">
            {data?.user?.social_handles?.map((link, i) => (
              <a key={"social-link-" + i} href={link?.url}>
                {link?.platform}
              </a>
            ))}
          </div>
        </div>
        <div className="home-right-part"></div>
      </div>
    </section>
  );
}

export default Home;
