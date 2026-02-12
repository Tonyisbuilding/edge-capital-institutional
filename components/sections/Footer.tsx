'use client';

import "@/styles/common.css";
import Link from "next/link";
import { useChangeLanguageContext } from "@/context/ChangeLanguage";
import images from "@/constants/images";

const Footer = () => {
    const { language } = useChangeLanguageContext();

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Left Section - Brand */}
                <div className="footer-brand">
                    <div className="brand-content">
                        <img
                            src={images.landingPage.New_Cap}
                            alt="Edge Capital"
                            className="w-[202px] h-[auto]"
                        />
                        <p>

                        </p>
                    </div>

                    <div className="footer-email">
                        <a href="mailto:info@edge-capital.nl">info@edge-capital.nl</a>
                        <span className="arrow">→</span>
                    </div>
                </div>

                {/* Middle Section - Navigation */}
                <div className="middle-middle">
                    <div className="footer-nav">
                        <h3>{language === "nl" ? "Home" : "Home"}</h3>
                        <ul>
                            <li>
                                <Link href="/about">
                                    {language === "nl" ? "Over ons" : "About Us"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/edge-fund">EdgeFund</Link>
                            </li>
                            <li>
                                <Link href="/institutional">
                                    {language === "nl" ? "Institutioneel" : "Institutional"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact">
                                    {language === "nl" ? "Contact" : "Contact"}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-nav">
                        <h3>{language === "nl" ? "Helpcentrum" : "Help Center"}</h3>
                        <ul>
                            <li>
                                <Link href="/contact">
                                    {language === "nl" ? "Ondersteuning" : "Support"}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy">
                                    {language === "nl" ? "Privacybeleid" : "Privacy Policy"}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>


                {/* Right Section - Social */}
                <div className="footer-social">
                    <h3>{language === "nl" ? "Sociaal" : "Social"}</h3>
                    <div className="social-icons">
                        <a
                            href="https://www.linkedin.com/company/edgecapital1/"
                            target="_blank"
                            className="social-icon"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="linkedin"
                                className="w-6 h-6 fill-current text-white"
                            >
                                <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48h0a1.56,1.56,0,1,1,0-3.12,1.57,1.57,0,1,1,0,3.12ZM18.91,18.74h-3V13.91c0-1.21-.43-2-1.52-2A1.65,1.65,0,0,0,12.85,13a2,2,0,0,0-.1.73v5h-3s0-8.18,0-9h3V11A3,3,0,0,1,15.46,9.5c2,0,3.45,1.29,3.45,4.06Z" />
                            </svg>

                            LinkedIn
                        </a>
                        <a
                            href="https://www.facebook.com/tradealot/?locale=nl_NL"
                            target="_blank"
                            className="social-icon"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="#00171D"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22.675 0H1.325C0.59325 0 0 0.59325 0 1.325V22.675C0 23.4068 0.59325 24 1.325 24H12.82V14.709H9.692V11.077H12.82V8.413C12.82 5.348 14.717 3.672 17.467 3.672C18.774 3.672 19.931 3.768 20.256 3.813V7.002H18.339C16.821 7.002 16.511 7.769 16.511 8.807V11.077H20.123L19.662 14.709H16.511V24H22.675C23.4068 24 24 23.4068 24 22.675V1.325C24 0.59325 23.4068 0 22.675 0Z" fill="#00171D" />
                            </svg>
                            Facebook
                        </a>
                    </div>
                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="footer-disclaimer">
                <h3>
                    {language === "nl" ? "Algemene disclaimer:" : "General disclaimer:"}
                </h3>
                <p>
                    {language === "nl"
                        ? `De informatie op deze website is uitsluitend bedoeld voor algemene informatiedoeleinden. De informatie wordt verstrekt door de beheerder en hoewel we ernaar streven de informatie actueel en correct te houden, geven we geen verklaringen of garanties van welke aard dan ook, expliciet of impliciet, over de volledigheid, nauwkeurigheid, betrouwbaarheid, geschiktheid of beschikbaarheid met betrekking tot de website of de informatie, producten, diensten of gerelateerde afbeeldingen op de website voor welk doel dan ook. Elk vertrouwen dat u stelt in dergelijke informatie is daarom strikt op eigen risico. Edge Capital Management BV is geregistreerd bij de Nederlandse Autoriteit Financiële Markten (AFM) als AIFM (Alternative Investment Fund Manager) conform het AIFMD-registratieregime van artikel 2:66a Wft en ingeschreven in het register voor uitgezonderde beheerders van beleggingsinstellingen op de AFM-website, als bedoeld in artikel 1:107 Wft met registratienummer 50027774. Edge Capital Management BV is tevens ingeschreven bij de Kamer van Koophandel onder nummer 63941805.`
                        : `The information on this website is solely intended for general informational purposes. The information is provided by the administrator, and while we strive to keep it up to date and correct, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk. Edge Capital Management BV is registered with the Dutch Authority for the Financial Markets (AFM) as an AIFM (Alternative Investment Fund Manager) under the AIFMD registration regime of Article 2:66a Wft and is listed in the register for exempt managers of investment institutions on the AFM website, as referred to in Article 1:107 Wft with registration number 50027774. Edge Capital Management BV is also registered with the Chamber of Commerce under number 63941805.`}
                </p>

            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-copyright">
                    {language === "nl"
                        ? "© 2025 Edge Capital. Alle rechten voorbehouden."
                        : "© 2025 Edge Capital. All rights reserved."}
                </div>
                <div className="footer-status">
                    <span className="status-dot"></span>
                    {language === "nl" ? (
                        <span>Alle systemen operationeel</span>
                    ) : (
                        <span>All systems operational</span>
                    )}
                </div>
                <a href="/privacy" className="footer-policy">
                    {language === "nl" ? "Privacybeleid" : "Privacy Policy"}
                </a>
            </div>
        </footer>
    );
};

export default Footer;
