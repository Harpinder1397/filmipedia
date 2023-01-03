import React from 'react';
import {
  Layout,
  Row,
  Col,
} from 'antd';
// import { ReactComponent as FacebookIcon } from 'assets/images/facebook.svg';
// import { ReactComponent as InstagramIcon } from 'assets/images/instagram.svg';
// import { ReactComponent as YoutubeIcon } from 'assets/images/youtube.svg';
// eslint-disable-next-line import/no-unresolved
import './Footer.less';

const Footer = () => (
  <Layout.Footer className="footer footer__links">
    {/* <Row className="footer-box">
      <Col span={5} className="follow-us">
        <h4>Follow us</h4>
        <Row>
          <a href="/" className="follow-us__icon">
            <FacebookIcon />
          </a>
          <a href="/" className="follow-us__icon">
            <InstagramIcon />
          </a>
          <a href="/" className="follow-us__icon">
            <YoutubeIcon />
          </a>
        </Row>
      </Col>
      <Col span={4}>
        <ul>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Career</a>
          </li>
          <li>
            <a href="/">Contact us</a>
          </li>
        </ul>
      </Col>
      <Col span={4}>
        <ul>
          <li>
            <a href="/">Instructors</a>
          </li>
          <li>
            <a href="/">Services</a>
          </li>
          <li>
            <a href="/">Integrations</a>
          </li>
        </ul>
      </Col>
    </Row> */}
    <Row className="footer__legal">
      <a href="/">Privacy Policy</a>
      <a href="/">Terms of Service</a>
    </Row>
  </Layout.Footer>
);

export default Footer;
