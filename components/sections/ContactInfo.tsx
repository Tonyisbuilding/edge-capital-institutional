import React from "react";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRight } from "lucide-react";

// Use public paths directly since imports might fail without loader config
const mailIcon = "/assets/icons/mail (1).svg";
const phoneIcon = "/assets/icons/phone.svg";
const locationIcon = "/assets/icons/location.svg";

const ContactInfo = () => {
    const { language } = useChangeLanguageContext();

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success(language === "nl" ? "Gekopieerd!" : "Copied!");
        } catch {
            toast.error(language === "nl" ? "Kopiëren mislukt" : "Failed to copy");
        }
    };

    const handleMailClick = () => {
        window.location.href = "mailto:info@edgenext.nl";
    };

    const handlePhoneClick = () => {
        copyToClipboard("+31 252 781 778");
    };

    const handleLocationClick = () => {
        window.open("https://maps.app.goo.gl/vNU3NqiVvpRw1cSB8", "_blank");
    };

    return (
        <>
            <div className="pt-6 md:pt-8 lg:pt-8 px-0 md:px-8 lg:px-8 h-full flex flex-col">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 w-fit" style={{ backgroundColor: 'rgba(0, 85, 105, 0.2)' }}>
                    <span className="w-2 h-2 bg-[#005569] rounded-full"></span>
                    <span className="text-[#005569] text-sm font-medium">
                        {language === "nl" ? "Neem contact met ons op" : "Come talk to us"}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-[#02080A] text-3xl md:text-4xl lg:text-[36px] font-semibold mb-3 leading-tight">
                    {language === "nl"
                        ? "We verwelkomen u graag!"
                        : "We'd love to have you around!"}
                </h1>

                {/* Subtitle */}
                <p className="text-[#3D3D3D] text-base mb-8 max-w-lg">
                    {language === "nl"
                        ? "Neem contact met ons op en schrijf u in voor onze nieuwsbrief voor vragen, ondersteuning of feedback. We staan klaar om u bij elke stap te helpen."
                        : "Contact us and subscribe to our newsletter for inquiries, support, or feedback. We're here to assist you every step of the way."}
                </p>

                {/* Contact Items */}
                <div className="space-y-3 mb-6">
                    {/* Email Row */}
                    <div className="flex items-center justify-between rounded-xl min-h-[60px]" style={{ padding: '5px 5px 5px 10px', backgroundColor: 'rgba(35, 108, 125, 0.1)' }}>
                        <div className="flex items-center gap-3">
                            <img src={mailIcon} alt="Email" className="w-5 h-5" />
                            <span className="text-[#02080A] text-base">info@edgenext.nl</span>
                        </div>
                        <button
                            onClick={handleMailClick}
                            className="bg-[#005569] text-white py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-[#006d7a] transition w-[110px] self-stretch"
                        >
                            {language === "nl" ? "Mail ons" : "Mail us"} <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Phone Row */}
                    <div className="flex items-center justify-between rounded-xl min-h-[60px]" style={{ padding: '5px 5px 5px 10px', backgroundColor: 'rgba(35, 108, 125, 0.1)' }}>
                        <div className="flex items-center gap-3">
                            <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
                            <span className="text-[#02080A] text-base">+31 252 781 778</span>
                        </div>
                        <button
                            onClick={handlePhoneClick}
                            className="bg-[#005569] text-white py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-[#006d7a] transition w-[110px] self-stretch"
                        >
                            {language === "nl" ? "Bel ons" : "Call us"} <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Location Row */}
                    <div className="flex items-center justify-between rounded-xl min-h-[60px]" style={{ padding: '5px 5px 5px 10px', backgroundColor: 'rgba(35, 108, 125, 0.1)' }}>
                        <div className="flex items-center gap-3">
                            <img src={locationIcon} alt="Location" className="w-5 h-5" />
                            <span className="text-[#02080A] text-base">Walserij 15-I 2211 SJ, Noordwijkerhout</span>
                        </div>
                        <button
                            onClick={handleLocationClick}
                            className="bg-[#005569] text-white py-2 rounded-lg flex items-center justify-center gap-1 text-sm font-medium hover:bg-[#006d7a] transition w-[110px] self-stretch flex-shrink-0"
                        >
                            {language === "nl" ? "Locatie" : "Location"} <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Google Map Embed */}
                <div className="rounded-xl overflow-hidden flex-1 min-h-[150px]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.8899!2d4.4875!3d52.2605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c7b6e0d3f5b9%3A0x1234567890!2sWalserij%2015%2C%202211%20SJ%20Noordwijkerhout!5e0!3m2!1sen!2snl!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Edge Capital Location"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default ContactInfo;
