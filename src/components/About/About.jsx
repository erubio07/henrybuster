import Jose from "../../img/Jose.jpeg";
import Frankly from "../../img/Franklyn.jpg";
import Ezequiel from "../../img/Ezequiel.jpg";
import Miguel from "../../img/Miguel.jpg";
import Kevin from "../../img/Kevin.jpg";
import Saraid from "../../img/Saraid.jpg";
import Mauricio from "../../img/Mauricio.jpg";
import Franco from "../../img/Franco.jpg";
import Argentina from "../../img/Argentina.jpg";
import Mexico from "../../img/Mexico.png";
import RepublicaDominicana from "../../img/RepublicaDominicana.png";
// import Logo from "../../img/Logo.png";
// import github from "../../img/github.jpg";
// import Linkedin from "../../img/Linkedin.png";
import "./icon.css";
import style from "../Styles/About.module.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={style.container}>
      <div>
        {/* <img className={style.logoImg} src={Logo} alt="Logo" /> */}
        <h1 className={style.title}>FILM PROJECT</h1>
      </div>

      <div className={style.infoAbout}>
        <p className={style.description}>
          <strong className={style.strong}>
            GENERAL OBJECTIVE
            </strong> <br />
            The Movie Prime project is based on introducing
            the community to the audiovisual world, needs a <br /> theoretical
            framework with history, film language tools, operation of the
            production process, areas involved
            <br />
            and basic production techniques, to later apply it in the practical
            field, projecting movies in high definition as
            <br />
            integrative activities to raise money and generate employment. It is
            aimed at people who like retro and who still buy movies in physical
            format. 
        </p>
      </div>

      <div className={style.content}>
        <div className={style.card}>
          <img className={style.img} src={Kevin} alt="Kevin" />
          <h3 className={style.h3About}> KEVIN REYES</h3>
          <div className="social-icons img">
            <img
              className={style.imgBandera}
              src={RepublicaDominicana}
              alt="BanderaRepublicaDominicana"
            />
            <div className={style.socialBar}>
              <Link
                to="https://github.com/kevin2003123"
                className={style.link}
                target="blanck"
              >
                <i className="fa-brands fa-github"></i>
              </Link>
              
              <Link
                to="https://www.linkedin.com/in/kevin-reyes-2a1470125/"
                className={style.link}
                target="blanck"
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Saraid} alt="Saraid" />
          <h3 className={style.h3About}> SARAID GUTIERREZ </h3>
          <div className="social-icons img">
            <img
              className={style.imgBanderaMx}
              src={Mexico}
              alt="BanderaMexico"
            />

            <div className={style.socialBar}>
              <Link
                to="https://github.com/SaraidGutierrez"
                className={style.link}
                target="blanck"
              >
                <i className="fa-brands fa-github"></i>
              </Link>
              <Link
                to="https://www.linkedin.com/in/saraidmateos23/"
                className={style.link}
                target="blanck"
              >
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Jose} alt="jose" />
          <h3 className={style.h3About}> JOSE PEREZ </h3>
          <div className="social-icons img">
            <img
              className={style.imgBandera}
              src={Argentina}
              alt="BanderaArgentina"
            />
          </div>
          <div className={style.socialBar}>
            <Link
              to="https://github.com/Jope2022"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/jose-perez-4a4741278/"
              className={style.link}
              target="blanck"
            >
              {" "}
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Frankly} alt="Frankly" />
          <h3 className={style.h3About}> FRANKLYN CASTRO</h3>
          <div className="social-icons img">
            <img
              className={style.imgBandera}
              src={RepublicaDominicana}
              alt="BanderaRepublicaDominicana"
            />
          
          <div className={style.socialBar}>
            <Link
              to="https://github.com/franklyncastro"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/franklyncastro/"
              className={style.link}
              target="blanck"
            >
              {" "}
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Ezequiel} alt="Ezequiel" />
          <h3 className={style.h3About}> EZEQUIEL RUBIO</h3>
          <div className="social-icons img">
            <img
              className={style.imgBandera}
              src={Argentina}
              alt="BanderaArgentina"
            />
          
          <div className={style.socialBar}>
            <Link
              to="https://github.com/erubio07"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/ezequiel-rubio-97a70a266/"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Mauricio} alt="Mauricio" />
          <h3 className={style.h3About}> MAURICIO GONGORA</h3>
          <div className="social-icons img">
            <img
              className={style.imgBanderaMx}
              src={Mexico}
              alt="BanderaMexico"
            />
          
          <div className={style.socialBar}>
            <Link
              to="https://github.com/mgongora07"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/mauricio-góngora-loria-1a9ab24b"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
          </div>
        </div>

        <div className={style.card}>
          <img className={style.img} src={Miguel} alt="Miguel" />
          <h3 className={style.h3About}> MIGUEL CASTILLO</h3>
          <div className="social-icons img">
            <img
              className={style.imgBanderaMx}
              src={Mexico}
              alt="BanderaMexico"
            />
          <div className={style.socialBar}>
            <Link
              to="https://github.com/mcastilloperez"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/mcastilloperez"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
          </div>
        </div>
        <div className={style.card}>
          <img className={style.img} src={Franco} alt="Franco" />
          <h3 className={style.h3About}> FRANCO BAUDINO</h3>
          <div className="social-icons img">
            <img
              className={style.imgBandera}
              src={Argentina}
              alt="BanderaArgentina"
            />
          
          <div className={style.socialBar}>
            <Link
              to="https://github.com/francogb98"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-github"></i>
            </Link>
            <Link
              to="https://www.linkedin.com/in/franco-baudino-228115212"
              className={style.link}
              target="blanck"
            >
              <i className="fa-brands fa-linkedin"></i>
            </Link>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
