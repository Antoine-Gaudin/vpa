"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import emailjs from '@emailjs/browser';

type ModalType = "contact" | "pro" | null;

export default function Navbar() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [proStatus, setProStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const contactFormRef = useRef<HTMLFormElement>(null);
  const proFormRef = useRef<HTMLFormElement>(null);

  const closeModal = () => {
    setOpenModal(null);
    setContactStatus('idle');
    setProStatus('idle');
  };

  // Initialiser EmailJS
  useEffect(() => {
    emailjs.init('6W3J-MUqL9uMIlPuC');
  }, []);

  useEffect(() => {
    if (openModal) {
      setAnimateIn(false);
      const id = requestAnimationFrame(() => {
        setAnimateIn(true);
      });
      return () => cancelAnimationFrame(id);
    } else {
      setAnimateIn(false);
    }
  }, [openModal]);

  // Bloquer le scroll quand une modale est ouverte
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openModal]);

  // Gestion de l'envoi du formulaire de contact
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactFormRef.current) return;

    setContactStatus('sending');

    const formData = new FormData(contactFormRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    const templateParams = {
      from_name: 'Envoyé depuis votre site internet',
      name: name,
      message: `📧 Email: ${email}\n📞 Téléphone: ${phone}\n\n💬 Message:\n${message}`
    };

    emailjs.send(
      'service_g7a8jr1',
      'template_s5c5snk',
      templateParams
    )
    .then(() => {
      setContactStatus('success');
      contactFormRef.current?.reset();
      setTimeout(() => {
        closeModal();
      }, 2000);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setContactStatus('error');
    });
  };

  // Gestion de l'envoi du formulaire professionnel
  const handleProSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!proFormRef.current) return;

    setProStatus('sending');

    const formData = new FormData(proFormRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const companyName = formData.get('company_name') as string;
    const siret = formData.get('siret') as string;
    const message = formData.get('message') as string;

    const templateParams = {
      from_name: 'Envoyé depuis votre site internet',
      name: name,
      message: `🏢 Entreprise: ${companyName}\n📋 SIRET: ${siret}\n📧 Email: ${email}\n📞 Téléphone: ${phone}\n\n💬 Message:\n${message}`
    };

    emailjs.send(
      'service_g7a8jr1',
      'template_t0jn06j',
      templateParams
    )
    .then(() => {
      setProStatus('success');
      proFormRef.current?.reset();
      setTimeout(() => {
        closeModal();
      }, 2000);
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setProStatus('error');
    });
  };

  return (
    <>
<header className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
  <nav className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
    {/* LOGO À GAUCHE (mobile uniquement) */}
    <button
      className="md:hidden flex items-center gap-2 cursor-pointer"
      onClick={() => {
        setOpenModal(null);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <img
        src="/photo/logo.png"
        alt="Logo"
        className="h-10 w-auto"
      />
    </button>

    {/* BOUTONS DESKTOP */}
    <div className="hidden md:flex items-center gap-6 lg:gap-8">
      <button
        className="text-base md:text-lg font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer py-1"
        onClick={() => {
          setOpenModal(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Accueil
      </button>

      <button
        className="text-base md:text-lg font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer py-1"
        onClick={() => setOpenModal("contact")}
      >
        Contact
      </button>

      <button
        className="text-base md:text-lg font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer py-1"
        onClick={() => setOpenModal("pro")}
      >
        Professionnel
      </button>
    </div>

    {/* LOGO DESKTOP (à droite) */}
    <button
      className="hidden md:flex items-center gap-2 cursor-pointer"
      onClick={() => {
        setOpenModal(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      <img
        src="/photo/logo.png"
        alt="Logo"
        className="h-12 w-auto"
      />
    </button>

    {/* BURGER MENU (mobile uniquement) */}
    <button
      className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-label="Menu"
    >
      <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
      <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
      <span className={`w-6 h-0.5 bg-gray-800 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
  </nav>

  {/* MENU MOBILE DÉROULANT */}
  <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-48' : 'max-h-0'}`}>
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 space-y-3">
      <button
        className="block w-full text-left text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
        onClick={() => {
          setOpenModal(null);
          setMobileMenuOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        Accueil
      </button>

      <button
        className="block w-full text-left text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
        onClick={() => {
          setOpenModal("contact");
          setMobileMenuOpen(false);
        }}
      >
        Contact
      </button>

      <button
        className="block w-full text-left text-base font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
        onClick={() => {
          setOpenModal("pro");
          setMobileMenuOpen(false);
        }}
      >
        Professionnel
      </button>
    </div>
  </div>
</header>



 {/* -------------------- MODAL CONTACT -------------------- */}
{openModal === "contact" && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    onClick={closeModal}
  >
    <div
      className={`
        w-[95%] max-w-5xl relative my-8
        transform transition-all duration-300 ease-out
        ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Bouton fermer */}
      <button
        className="absolute -top-8 right-0 text-2xl text-white hover:text-gray-200 cursor-pointer"
        onClick={closeModal}
      >
        ✕
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8">
        {/* En-tête modal */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Contact
          </h2>
          <div className="mt-2 h-[3px] w-16 bg-blue-600 rounded-full" />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* -------- COLONNE GAUCHE : ADRESSE / TEL / HORAIRES -------- */}
          <div className="md:w-[40%] space-y-5">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Adresse
              </h3>
              <p className="text-sm text-gray-700">
                5 Av. de Verdun, 27140 Gisors
              </p>
            </div>

            {/* Carte */}
            <div className="rounded-xl border border-gray-300 overflow-hidden">
              <div className="h-40 w-full">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2602.6545194955966!2d1.7751617122719534!3d49.282943271273616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6e1704c7ef199%3A0x97f1114378ab3c9a!2sVexin%20Pi%C3%A8ces%20Auto!5e0!3m2!1sfr!2sfr!4v1765142535725!5m2!1sfr!2sfr"
                  allowFullScreen
                  aria-hidden="false"
                  tabIndex={0}
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Téléphone
              </h3>
              <p className="text-sm text-blue-700 underline cursor-pointer">
                02 32 55 59 20
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Nos horaires
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Lundi : 09h - 12h et 13h30 - 18h
                <br />
                Mardi au vendredi : 08h30 - 12h et 13h30 - 18h
                <br />
                Samedi : 09h - 12h
                <br />
                Dimanche : Fermé
              </p>
            </div>
          </div>

          {/* -------- COLONNE DROITE : FORMULAIRE ENVOYER UN MESSAGE -------- */}
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Envoyer un message
            </h3>

            <form ref={contactFormRef} onSubmit={handleContactSubmit} className="space-y-4 text-sm">
              <input
                type="text"
                name="name"
                placeholder="Prénom*"
                required
                className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Mail*"
                required
                className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Tel*"
                required
                className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <textarea
                name="message"
                placeholder="Ecrivez votre besoin*"
                required
                className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg h-32 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {contactStatus === 'success' && (
                <p className="text-green-600 text-sm">Message envoyé avec succès !</p>
              )}
              {contactStatus === 'error' && (
                <p className="text-red-600 text-sm">Erreur lors de l'envoi. Réessayez.</p>
              )}

              <button
                type="submit"
                disabled={contactStatus === 'sending'}
                className="mt-2 inline-flex items-center justify-center bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {contactStatus === 'sending' ? 'Envoi...' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

{/* -------------------- MODAL PROFESSIONNEL -------------------- */}
{openModal === "pro" && (
  <div
    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
    onClick={closeModal}
  >
    <div
      className={`
        w-[90%] max-w-xl relative my-8
        transform transition-all duration-300 ease-out
        ${
          animateIn
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }
      `}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Bouton fermer */}
      <button
        className="absolute -top-8 right-0 text-2xl text-white hover:text-gray-200 cursor-pointer"
        onClick={closeModal}
      >
        ✕
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8 text-gray-900">
        {/* En-tête modal */}
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold">
            Envoyer un message
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Espace dédié aux professionnels et garages
          </p>
          <div className="mt-3 h-[3px] w-16 bg-blue-600 rounded-full mx-auto" />
        </div>

        {/* Formulaire */}
        <form ref={proFormRef} onSubmit={handleProSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            name="name"
            placeholder="Prénom*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            name="company_name"
            placeholder="Nom de l'entreprise*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="text"
            name="siret"
            placeholder="Numéro de siret*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Mail*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Tel*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <textarea
            name="message"
            placeholder="Ecrivez votre besoin*"
            required
            className="w-full bg-gray-50 text-gray-800 px-4 py-3 rounded-lg h-32 border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {proStatus === 'success' && (
            <p className="text-green-600 text-sm">Message envoyé avec succès !</p>
          )}
          {proStatus === 'error' && (
            <p className="text-red-600 text-sm">Erreur lors de l'envoi. Réessayez.</p>
          )}

          <button
            type="submit"
            disabled={proStatus === 'sending'}
            className="mt-2 inline-flex items-center justify-center bg-blue-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {proStatus === 'sending' ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  </div>
)}

    </>
  );
}
