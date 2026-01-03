import { Link } from 'react-router-dom';

// Multi-column footer allowing access to all key areas of the site
function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__columns">
                    <div className="footer__column">
                        <h5 className="footer__heading">Rightmove</h5>
                        <ul className="footer__links">
                            <li><Link to="/search">About</Link></li>
                            <li><Link to="/search">Press centre</Link></li>
                            <li><Link to="/search">Investor relations</Link></li>
                            <li><Link to="/search">Careers</Link></li>
                            <li><Link to="/search">Tech blog</Link></li>
                            <li><Link to="/search">Agent blog</Link></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h5 className="footer__heading">Resources</h5>
                        <ul className="footer__links">
                            <li><Link to="/search">Where can I live?</Link></li>
                            <li><Link to="/search">Stamp duty</Link></li>
                            <li><Link to="/search">Students</Link></li>
                            <li><Link to="/search">Removals</Link></li>
                            <li><Link to="/search">Property guides</Link></li>
                            <li><Link to="/search">House price index</Link></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h5 className="footer__heading">Quick links</h5>
                        <ul className="footer__links">
                            <li><Link to="/search">Cheap flats to rent</Link></li>
                            <li><Link to="/search">Property investment</Link></li>
                            <li><Link to="/search">Cheap houses for sale</Link></li>
                            <li><Link to="/search">Overseas</Link></li>
                            <li><Link to="/search">Find an agent</Link></li>
                            <li><Link to="/search">Commercial Property</Link></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h5 className="footer__heading">Locations</h5>
                        <ul className="footer__links">
                            <li><Link to="/search">England</Link></li>
                            <li><Link to="/search">Scotland</Link></li>
                            <li><Link to="/search">Northern Ireland</Link></li>
                            <li><Link to="/search">Wales</Link></li>
                            <li><Link to="/search">London</Link></li>
                            <li><Link to="/search">London stations</Link></li>
                        </ul>
                    </div>

                    <div className="footer__column">
                        <h5 className="footer__heading">Professional</h5>
                        <div className="footer__pro-link">
                            <Link to="/search" className="btn btn--primary btn--sm">Rightmove Plus</Link>
                        </div>
                        <ul className="footer__links">
                            <li><Link to="/search">Data Services</Link></li>
                            <li><Link to="/search">Agents</Link></li>
                            <li><Link to="/search">Developers</Link></li>
                            <li><Link to="/search">Advertise</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__copyright">
                        <p>Copyright © 2026 Rightmoveplaces Limited. All rights reserved.</p>
                    </div>
                    <div className="footer__social">
                        <span>Rightmove.co.uk is the UK's number one property website</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
