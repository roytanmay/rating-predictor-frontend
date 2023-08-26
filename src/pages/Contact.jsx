import React,{useState} from 'react'
import './about.css'
const  Contact=()=> {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
      };
    
      return (
        <section className="contact-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit">Send Message</button>
          </form>
        </section>
      );
}
export default Contact;