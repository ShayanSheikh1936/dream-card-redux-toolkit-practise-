import React, { useState } from 'react';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return <div className="contact-page"><h2>Contact</h2><p>Thank you! Your message has been sent.</p></div>;
  }

  return (
    <div className="contact-page">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name
          <input required type="text" name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>Email
          <input required type="email" name="email" value={form.email} onChange={handleChange} />
        </label>
        <label>Message
          <textarea required name="message" value={form.message} onChange={handleChange} rows={5} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Contact;
