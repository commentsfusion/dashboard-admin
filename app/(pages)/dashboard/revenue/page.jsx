import React from "react";
import Userinfo from "../../../components/cards/overview/userinfo";
import Header from "../../../components/Header.jsx";
import Subscription from "../../../components/cards/susbcriptionanlysis/subscription.jsx"
import PaymentInvoiceTable from "../../../components/paymentinvoice"
const page = () => {
  return (
    <div>
      <Header />
      <div className="mt-4">
        <h1 className="font-bold text-xl sm:text-2xl">
          Revenue & Monetization
        </h1>
        <p className="text-md text-gray-600 mt-1">
          Track subscription performance, revenue growth, and payment analytics.
        </p>
      </div>
      <div className="mt-5">
        <Userinfo />
         <Subscription />
         <PaymentInvoiceTable/>
      </div>
    </div>
  );
};

export default page;
