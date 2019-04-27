import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link
} from "react-router-dom";
import iconSet from '../../../img/selection.json';
import IcomoonReact, {iconList} from 'icomoon-react';

export default class Footer extends React.Component {
    render(){
        return(
            <footer className="footer">
              <div className="footer__logo-box">
                <IcomoonReact iconSet={iconSet} icon="firefox" className="footer__logo" alt="Full Logo"/>
              </div>

                <div className="row">
                  <div className="col-1-of-2">
                    <div className="footer__navigation">
                      <ul className="footer__list">
                        <li className="footer__item"><Link to="#" className="footer__link">Company</Link></li>
                        <li className="footer__item"><Link to="#" className="footer__link">Contact Us</Link></li>
                        <li className="footer__item"><Link to="#" className="footer__link">Careers</Link></li>
                        <li className="footer__item"><Link to="#" className="footer__link">Privacy Policy</Link></li>
                        <li className="footer__item"><Link to="#" className="footer__link">Terms</Link></li>
                      </ul>
                    </div>
                  </div>

                  <div className="col-1-of-2">
                    <p className="footer__copyright">
                      Copyright &copy; by <Link to="#" className="footer__link">Thant Yar Zar Hein</Link>. You are 100% allowed to use this webpage for both personal and commercial use, but NOT to claim it as your own design.A credit to the orginal author, Thant Yar Zar Hein, is of course highly appreciated!
                    </p>
                  </div>
                </div>
            </footer>
        )
    }
}