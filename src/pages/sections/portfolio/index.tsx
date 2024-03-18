import { useState } from "react";

// Plugins
import { motion, AnimatePresence } from "framer-motion";
import "reactjs-popup/dist/index.css";

// --> Icon Images
import backArrow from "../../../assets/images/close-left-arrow.png";

// Styles
import "./portfolio.css";

// Data

import useData from "../../../Hook/useData";
import PortfolioItem from "./items/PortfolioItem";

// --------------

const Portfolio = () => {
  // Portfolio item to be shown (change rendered different components in item folder)
  const [portfolioItem, setPortfolioItem] = useState<number>(0);
  // Portfolio item to be shown as a popup
  const [openPortfolio, setOpenPortfolio] = useState<number>(0);

  const [isSeeAll, setIsSeeAll] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // use hook to fatch dynamic data
  const data = useData();

  /**
   *
   */
  const handleSeeAllBtns = () => {
    setIsSeeAll(!isSeeAll);
  };

  /**
   * Opening portfolio item that the user clicked
   *
   * @param num portfolio item to be open
   */
  const handleOpenItem = (num: number) => {
    const element: HTMLElement | null =
      document.getElementById("portfolio-wrapper");
    if (element) {
      element.scrollIntoView();
    }

    setPortfolioItem(num);
  };

  /**
   * Close Opened portfolio item and show the portfolio grid images
   */
  const handlCloseItem = () => {
    setPortfolioItem(0);
  };

  /**
   * find click project items from all projects
   */
  const clickedItem = data?.user?.projects?.find(
    (item) => item.sequence == portfolioItem
  );

  return (
    <section id="portfolio" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div id="portfolio-wrapper" className="relative">
            {portfolioItem === 0 ? (
              <>
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={handleSeeAllBtns}
                    style={{
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      background: "#F37B83",
                      color: "white",
                    }}
                  >
                    {isSeeAll ? "See Few" : "See All"}
                  </button>
                </div>

                <div className="portfolio-load-content-holder"></div>
                <motion.div className="grid" id="portfolio-grid" layout>
                  {isSeeAll ? (
                    <>
                      {data?.user?.projects?.map((item, i) => (
                        <AnimatePresence key={"portfolio-item-" + i}>
                          <motion.div
                            // layout
                            animate={{ scale: 1, opacity: 1 }}
                            initial={{ scale: 0, opacity: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            id={"p-item-" + (i + 1)}
                            className="grid-item element-item p-one-third"
                          >
                            <a
                              className="item-link ajax-portfolio"
                              style={{ position: "relative" }}
                              data-id={i + 1}
                              onClick={() => {
                                // according to action type we wil fire the function

                                handleOpenItem(item.sequence);
                              }}
                            >
                              <img src={item.image.url} alt="" />
                              <div className="portfolio-text-holder">
                                <div className="portfolio-text-wrapper">
                                  <p className="portfolio-text">{item.title}</p>
                                  <p className="portfolio-cat">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          </motion.div>
                        </AnimatePresence>
                      ))}
                    </>
                  ) : (
                    data?.user?.projects?.slice(0, 6).map((item, i) => (
                      <AnimatePresence key={"portfolio-item-" + i}>
                        <motion.div
                          // layout
                          animate={{ scale: 1, opacity: 1 }}
                          initial={{ scale: 0, opacity: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          id={"p-item-" + (i + 1)}
                          className="grid-item element-item p-one-third"
                        >
                          <a
                            className="item-link ajax-portfolio"
                            style={{ position: "relative" }}
                            data-id={i + 1}
                            onClick={() => {
                              // according to action type we wil fire the function

                              handleOpenItem(item.sequence);
                            }}
                          >
                            <img src={item.image.url} alt="" />
                            <div className="portfolio-text-holder">
                              <div className="portfolio-text-wrapper">
                                <p className="portfolio-text">{item.title}</p>
                                <p className="portfolio-cat">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        </motion.div>
                      </AnimatePresence>
                    ))
                  )}
                </motion.div>
              </>
            ) : (
              // Portfolio items to be opened as a separate component
              <div className="portfolio-load-content-holder">
                <div
                  className="close-icon"
                  role="button"
                  onClick={handlCloseItem}
                >
                  <img src={backArrow} alt="back arrow" />
                </div>

                <PortfolioItem item={clickedItem} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
