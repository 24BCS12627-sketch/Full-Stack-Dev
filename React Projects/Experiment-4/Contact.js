import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div>
      <h1>Contact Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your message" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
export default Contact;
