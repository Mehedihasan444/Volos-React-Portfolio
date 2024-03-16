// Images
import useData from "../../Hook/useData";
import signature from "../../assets/images/signature2.png";

// Data
import resumeData from "../../data/resume.json";
import { markdownToHTML } from "../../utils/converter";

// -------------

function Resume() {
  // use hook to fatch dynamic data
  const data = useData();


  return (
    <section id="resume" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <h2 className="entry-title section-title">Experience</h2>

             
              <ul className="timeline-holder">
                {data?.user?.timeline?.map((exp, i) => (
                  <li key={"exp-" + i} className="timeline-event">
                    <span className="timeline-circle"></span>
                    <div className="timeline-event-content" style={{marginTop:"-1.2rem"}}>
                 
                      <h3 style={{ fontSize: "1rem" }}>
                        {new Date(exp.startDate).getFullYear()} -{" "}
                        {new Date(exp.endDate).getFullYear()}
                      </h3>
                      <h3 style={{ fontSize: "1.5rem",
                    marginTop:"-2rem" }}>{exp.company_name}</h3>
                      
                      <h4 style={{ fontSize: "1rem",
                    marginTop:"-2rem" }}>{exp.jobTitle}</h4>
                      <p>{exp.summary}</p>
                      {/* <ul>
                        {exp.bulletPoints.map((point, j) => (
                          <li key={"point-" + j}>&gt;&gt;{"  "}  {point}</li>
                        ))}
                      </ul> */}
                    </div>
                    <div className="timeline-event-date">
                      {new Date(exp.startDate).getFullYear()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">
                {resumeData.coverLetter.title}
              </h2>
              <p className="section-info">
                {resumeData.coverLetter.description}
              </p>
              {resumeData.coverLetter.paragraphes.map((parg, i) => (
                <p key={"parg-" + i}>{parg}</p>
              ))}

              <img className="my-signature" src={signature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;
