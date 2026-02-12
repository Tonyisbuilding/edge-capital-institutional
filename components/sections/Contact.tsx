'use client';

import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";

const Contact = () => {
    return (
        <>
            <div className="bg-[#F6FEFF] w-full py-12">
                <div className="max-w-[1600px] mx-auto w-[96%] md:w-full grid lg:grid-cols-[55%_45%] gap-8 px-0 md:px-4 auto-rows-fr">
                    {/* Left Side - Contact Info */}
                    <div className="min-h-full">
                        <ContactInfo />
                    </div>
                    {/* Right Side - Contact Form */}
                    <div className="min-h-full flex">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
