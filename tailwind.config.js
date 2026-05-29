tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-container":"#0a2342","inverse-primary":"#b2c7ef","error":"#ba1a1a",
        "surface-variant":"#d8e3fa","surface":"#f9f9ff","background":"#f9f9ff",
        "surface-container-highest":"#d8e3fa","secondary-container":"#fed488",
        "error-container":"#ffdad6","on-primary":"#ffffff","on-primary-container":"#768baf",
        "on-background":"#111c2c","primary":"#000d22","secondary":"#775a19",
        "surface-container-high":"#dee8ff","surface-container":"#e7eeff",
        "surface-container-low":"#f0f3ff","surface-container-lowest":"#ffffff",
        "surface-bright":"#f9f9ff","surface-dim":"#cfdaf1","surface-tint":"#4a5f81",
        "on-surface":"#111c2c","on-surface-variant":"#44474e","inverse-surface":"#263142",
        "inverse-on-surface":"#ebf1ff","outline":"#74777e","outline-variant":"#c4c6cf",
        "on-secondary":"#ffffff","on-secondary-container":"#785a1a","on-error":"#ffffff",
        "on-error-container":"#93000a","tertiary":"#0a0d0e","on-tertiary":"#ffffff",
        "tertiary-container":"#202324","on-tertiary-container":"#888a8b",
        "primary-fixed":"#d5e3ff","primary-fixed-dim":"#b2c7ef",
        "secondary-fixed":"#ffdea5","secondary-fixed-dim":"#e9c176",
        "tertiary-fixed":"#e1e3e4","tertiary-fixed-dim":"#c5c7c8",
        "on-primary-fixed":"#021c3a","on-primary-fixed-variant":"#324768",
        "on-secondary-fixed":"#261900","on-secondary-fixed-variant":"#5d4201",
        "on-tertiary-fixed":"#191c1d","on-tertiary-fixed-variant":"#454748"
      },
      borderRadius:{DEFAULT:"0.125rem",lg:"0.25rem",xl:"0.5rem",full:"0.75rem"},
      spacing:{unit:"8px","container-max":"1280px","margin-mobile":"16px","margin-desktop":"40px",gutter:"24px"},
      fontFamily:{
        "headline-xl":["Manrope"],"headline-lg":["Manrope"],"headline-lg-mobile":["Manrope"],"headline-md":["Manrope"],
        "body-lg":["Inter"],"body-md":["Inter"],"label-md":["Inter"],"label-sm":["Inter"]
      },
      fontSize:{
        "headline-xl":["40px",{lineHeight:"48px",letterSpacing:"-0.02em",fontWeight:"700"}],
        "headline-lg":["32px",{lineHeight:"40px",letterSpacing:"-0.01em",fontWeight:"600"}],
        "headline-lg-mobile":["24px",{lineHeight:"32px",fontWeight:"600"}],
        "headline-md":["24px",{lineHeight:"32px",fontWeight:"600"}],
        "body-lg":["18px",{lineHeight:"28px",fontWeight:"400"}],
        "body-md":["16px",{lineHeight:"24px",fontWeight:"400"}],
        "label-md":["14px",{lineHeight:"20px",letterSpacing:"0.02em",fontWeight:"600"}],
        "label-sm":["12px",{lineHeight:"16px",letterSpacing:"0.05em",fontWeight:"500"}]
      }
    }
  }
};
