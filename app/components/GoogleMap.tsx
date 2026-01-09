"use client";

import React from "react";

const GoogleMap: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "500px", overflow: "hidden" }}>
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
  );
};

export default GoogleMap;
