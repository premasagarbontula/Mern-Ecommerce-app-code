import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={" Our Company Policy"}>
      <div className="row policy">
        <div className="col-md-6 text-center mt-3 mb-2">
          <img
            src="/images/privacy-policy-img.jpg"
            className="policy-img"
            alt="policy-image"
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark text-white text-center mb-3 p-1">
            PRIVACY POLICY
          </h1>
          <p className="policy-line">
            We encourage you to read this policy carefully to understand the
            Company's policies and practices regarding your information. By
            accessing or using its Services or its Platform, registering an
            account with the Company, becoming a supplier, reseller or customer
            on the Platform, or by attempting to become a supplier, reseller or
            customer, you expressly agree to be bound by the terms and
            conditions of this privacy policy.
          </p>
          <p className="policy-line mt-1">
            This policy may change from time to time, your continued use of the
            Company's Services after it makes any change is deemed to be
            acceptance of those changes, so please check the policy periodically
            for updates.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
