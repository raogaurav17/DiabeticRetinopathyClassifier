import '../styles.css'; 

function About() {
  return (
    <footer className="about-container">
      <h1 className="about-title">About the Project</h1>
      <p className="about-description">
        This project aims to provide an accessible tool for early detection of diabetic retinopathy using AI.
        Our model analyzes retinal images and predicts the likelihood of diabetic retinopathy across five severity classes.
      </p>

      <h3 className="about-subheading">Contact Us</h3>
      <p className="about-contact">
        Email: Gaurav: <a href="mailto:">231212012@nitdelhi.ac.in</a><br/>
        Email: Sakshi Naithani: <a href="mailto:">231212019@nitdelhi.ac.in</a><br/>
        Email: Ashish Kumar: <a href="mailto:">231212006@nitdelhi.ac.in</a><br/>
      </p>

      <p className="about-copyright">
        &copy; 2025 DR Detection.
      </p>
    </footer>
  );
}

export default About;
