import { useState } from "react";
import "@/styles/component.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import { submitToGoogleSheet } from "@/lib/googleSheetsClient";

const ContactForm = () => {
    const { language } = useChangeLanguageContext();
    const [formData, setFormData] = useState({
        name: "",
        mail: "",
        message: "",
        number: "",
    });
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Define interfaces for change events for TypeScript
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitToGoogleSheet({
                formSlug: "landing-contact",
                payload: { ...formData, subscribeNewsletter },
            });

            toast.success(
                language === "nl"
                    ? "Formulier succesvol verzonden!"
                    : "Message sent successfully!"
            );

            setFormData({
                name: "",
                mail: "",
                message: "",
                number: "",
            });
            setSubscribeNewsletter(false);
        } catch (error) {
            const fallbackMessage =
                language === "nl"
                    ? "Versturen is mislukt. Controleer uw verbinding en probeer opnieuw."
                    : "Submission failed. Please check your connection and try again.";
            const message = (error as Error)?.message || fallbackMessage;
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-full w-full pr-0 md:pr-8 lg:pr-8">
            {/* ToastContainer is also in ContactInfo, might duplicate if both mount. 
          Ideally move to root layout, but keeping per component for fidelity to source. */}
            {/* <ToastContainer /> */}
            <div className="w-full max-w-md lg:max-w-lg bg-[#E1EFF2] rounded-2xl shadow-sm p-4 md:p-8 mr-0 lg:mr-8 h-full flex flex-col">
                <h2 className="text-2xl md:text-3xl font-semibold text-left mb-6 text-[#02080A]">
                    {language === "nl" ? "Vraag informatie aan" : "Request information"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-[#02080A] mb-2"
                        >
                            {language === "nl" ? "Naam" : "Name"}
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={language === "nl" ? "Vul uw naam in" : "Enter your name"}
                            className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition"
                            style={{ backgroundColor: '#F6FEFF' }}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="mail"
                            className="block text-sm font-medium text-[#02080A] mb-2"
                        >
                            E-Mail
                        </label>
                        <input
                            type="email"
                            id="mail"
                            name="mail"
                            value={formData.mail}
                            onChange={handleChange}
                            placeholder={language === "nl" ? "Vul uw e-mailadres in" : "Enter your email"}
                            className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition"
                            style={{ backgroundColor: '#F6FEFF' }}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="number"
                            className="block text-sm font-medium text-[#02080A] mb-2"
                        >
                            {language === "nl" ? "Mobiel" : "Mobile"}
                        </label>
                        <input
                            type="tel"
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder={language === "nl" ? "Vul uw mobiele nummer in" : "Enter your number"}
                            className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition"
                            style={{ backgroundColor: '#F6FEFF' }}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-[#02080A] mb-2"
                        >
                            {language === "nl" ? "Bericht" : "Message"}
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={language === "nl" ? "Laat uw bericht achter" : "Enter your message"}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg outline-none text-[#02080A] focus:border-[#005569] transition resize-none"
                            style={{ backgroundColor: '#F6FEFF' }}
                            required
                        />
                    </div>

                    {/* Newsletter Checkbox */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="newsletter"
                            checked={subscribeNewsletter}
                            onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                            className="w-5 h-5 border-2 border-[#D3E8EC] rounded accent-[#005569]"
                        />
                        <label htmlFor="newsletter" className="text-sm text-[#02080A]">
                            {language === "nl" ? "Schrijf u in voor de nieuwsbrief" : "subscribe to newsletter"}
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#005569] text-white py-3 rounded-lg font-medium hover:bg-[#006d7a] transition-colors duration-300 disabled:opacity-70"
                    >
                        {isSubmitting
                            ? language === "nl"
                                ? "Bezig met verzenden..."
                                : "Submitting..."
                            : language === "nl"
                                ? "Mail ons"
                                : "Mail us"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
