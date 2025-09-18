import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo">intervue</div>

          <div className="subscribe">
            <h3>Hire better & faster</h3>
            <div className="subscribe-input">
              <input type="text" placeholder="Enter your email address" />
              <span className="arrow">↗</span>
            </div>
          </div>

          {/* Social links will move via CSS on mobile */}
          <div className="social-links">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Pinterest</span>
          </div>
        </div>

        <div className="footer-columns">
          <div className="f-c">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li>So gehts</li>
                <li>Erfahrung</li>
                <li>Aligner</li>
                <li>Preise</li>
                <li>Standorte</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li>Blog</li>
                <li>FAQ</li>
                <li>Lift Media</li>
                <li>Offene Stellen</li>
                <li>Presse kit</li>
              </ul>
            </div>
          </div>
          <div className="f-c">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>Gratis Termin</li>
                <li>Freunde einladen</li>
                <li>Patienteninforma</li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>Blog</li>
                <li>FAQ</li>
                <li>Lift Media</li>
                <li>Offene Stellen</li>
                <li>Presse kit</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2023 Intervue. Crafted by great minds.</p>
      </div>
    </footer>
  );
}
