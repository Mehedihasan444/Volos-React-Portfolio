import { useRef, useEffect, useState } from 'react';

// Plugins
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Data
import useData from '../../Hook/useData';

// ------------------

function Skills() {
  
    // use hook to fatch dynamic data
    const data = useData();

  const circleProgressBarRef = useRef<HTMLDivElement>(null);
  const [circleProgress, setCircleProgress] = useState<number[]>(
    new Array(data?.user?.skills.length).fill(0)
  );
  const normalProgressBarRef = useRef<HTMLDivElement>(null);
  const [normalProgress, setNormalProgress] = useState<number[]>(
    new Array(data?.user?.skills.length).fill(0)
  );


  useEffect(() => {
    const circleProgressBarRefValue = circleProgressBarRef.current;
    if (!circleProgressBarRefValue) return; // Check if ref is null
    
    const progressBarYPosition =
      circleProgressBarRefValue.getBoundingClientRect().top +
      window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setCircleProgress(
          data?.user?.skills.map((skill) => skill.percentage)
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [circleProgress, data]);
  

  
  useEffect(() => {
    const normalProgressBarRefValue = normalProgressBarRef.current;
    if (!normalProgressBarRefValue) return; // Check if ref is null
    
    const progressBarYPosition =
      normalProgressBarRefValue.getBoundingClientRect().top +
      window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= progressBarYPosition) {
        setNormalProgress(
          data?.user?.skills?.map((skill) => skill.percentage)
        );
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [normalProgress, data]);
  

  return (
    <section id="skills" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row m-bottom-60">
            <h2 className="entry-title section-title">Skills</h2>

            <div className="skill-circle-holder" style={{ display: "flex", flexWrap:"wrap",gap:"20px" }}>
              {data?.user?.skills?.slice(0,10).map((prog, i) => (
                <div key={'circle-prog-' + i} className="skill-circle">
                  <div ref={circleProgressBarRef}>
                    <CircularProgressbar
                      value={circleProgress[i]}
                      text={`${prog.percentage}%`}
                      counterClockwise
                      strokeWidth={15}
                      styles={buildStyles({
                        textColor: '#F37B83',
                        textSize: 18,
                        pathColor: '#F37B83',
                        trailColor: '#554247',
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 2,
                      })}
                    />
                  </div>
                  <p className="skill-circle-text">{prog.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="row" ref={normalProgressBarRef}>
            <div className="one-half">
              <div className="skills-holder">
                {data?.user?.skills
                  .slice(10, 15)
                  .map((skill, i) => (
                    <div key={'skill-' + i} className="skill-holder">
                      <div className="skill-text">
                        <div className="skill">
                          <div
                            className="skill-fill"
                            style={{ width: `${normalProgress[i]}%` }}></div>
                        </div>
                        <span>{skill.name}</span>
                      </div>
                      <div className="skill-percent">{skill.percentage}%</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="one-half last">
              <div className="skills-holder sec-skills-holder">
                {data?.user?.skills
                  .slice(15,Math.ceil(data?.user?.skills.length ))
                  .map((skill, i) => (
                    <div key={'skill2-' + i} className="skill-holder">
                      <div className="skill-text">
                        <div className="skill">
                          <div
                            className="skill-fill"
                            style={{
                              width: `${
                                normalProgress[
                                  i +
                                    Math.ceil(
                                      data?.user?.skills.length / 2
                                    )
                                ]
                              }%`,
                            }}></div>
                        </div>
                        <span>{skill.name}</span>
                      </div>
                      <div className="skill-percent">{skill.percentage}%</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
