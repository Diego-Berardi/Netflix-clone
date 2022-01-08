import React from "react";

import { AiOutlineGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

import './footer.scss'

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Diego-Berardi"
          >
            <AiOutlineGithub />
          </a>
        </li>
        <li>
          <a
            className="link"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/diego-berardi-095541202?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B77P9wcucSaKjWeDwyefkiA%3D%3D"
          >
            <AiFillLinkedin />
          </a>
        </li>
      </ul>
      <p>- Diego Berardi</p>
    </footer>
  );
};

export default Footer;
