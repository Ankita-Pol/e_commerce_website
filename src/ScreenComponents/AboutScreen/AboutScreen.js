import React from "react";
import { Button } from "antd";
import one from '../../assets/Images/bg2_P.png';
import { Breadcrumb } from 'antd';
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="bg-[#E6E4D9] h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto mb-2">
        <Breadcrumb
          items={[
            {
              title: <a href="/home">Home</a>,
            },
            {
              title: <a href="/about">About</a>,
            },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="w-full">
          <img
            src={one}
            alt="About us"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            About Our Store
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Welcome to <span className="font-semibold">ClinkNBuy</span>, your
            trusted online shopping destination. We bring together quality
            products, seamless shopping experiences, and secure payments to
            make your shopping journey simple and enjoyable.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            From fashion to electronics, home essentials to lifestyle
            products, we aim to provide everything you need at the click of a
            button. Our mission is to deliver top-quality items at affordable
            prices, right to your doorstep.
          </p>

<Link to={"/home"}>
          <Button className="bg-[#101355] text-white" size="large" shape="round">
            Shop Now
          </Button></Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
