import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <header>
        <a href="https://github.com/RudiVladusic">
          <FontAwesomeIcon icon={faGithub} /> Rudi Vladušić
        </a>
      </header>
    </footer>
  );
};

export default Footer;
