import React from "react";
import Layout from "../components/Layout/Layout";
import { MdEmail, MdOutlinePhoneInTalk, MdHeadsetMic } from "react-icons/md";

const Contact = () => {
  return (
    <Layout title={"Contact : 24x7"}>
      <div className="row contact-us">
        <div className="col-md-6 text-center">
          <img
            src="/images/contact-us-img.png"
            className="contact-img"
            alt="contactus-image"
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark text-white text-center mb-3 p-1">
            CONTACT US
          </h1>
          <p className="contact-line">
            Welcome to 24x7 Help Line. Contact us for any Product related or
            Order related Enquiry.
          </p>
          <p className="mt-3 contact-icon">
            <MdEmail /> : customersupport@gmail.com
          </p>
          <p className="mt-3 contact-icon">
            <MdOutlinePhoneInTalk /> : +91987654321
          </p>
          <p className="mt-3 contact-icon">
            <MdHeadsetMic /> : 1800-0123456
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
