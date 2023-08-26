import React,{useState} from 'react'
import './about.css'
import emailjs from 'emailjs-com';
import {notification } from 'antd'

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
        if(formData.name.trim().length ===0 || formData.email.trim().length ===0 || formData.message.trim().length === 0){
          notification["error"]({
            message: `Enter Valid Credentials`,
            duration: 3,
          });
          return ;
        }
        // Send email using emailjs-com
        const templateParams = {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        };
    
        emailjs.send(
          'service_tz5jd86', // Replace with your service ID
          'template_d5pbfor', // Replace with your template ID
          templateParams,
          'MGAC012ZDM7EvQrpu' // Replace with your user ID
        )
        .then((response) => {

          notification["success"]({
            message: `Message Sent successfully`,
            duration: 3,
          });
        })
        .catch((error) => {
          notification["error"]({
            message: `Message Sending Failed`,
            duration: 3,
          });
        });
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
            <button type="submit" >Send Message</button>
          </form>
        </section>
      );
}
export default Contact;