// emails/PasswordResetEmail.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text
} from "react-email";
import { jsx, jsxs } from "react/jsx-runtime";
var LOGO_URL = `http://getlinknest.vercel.app/logo.webp`;
var PasswordResetEmail = ({ companyName, url }) => /* @__PURE__ */ jsx(Tailwind, { children: /* @__PURE__ */ jsxs(Html, { children: [
  /* @__PURE__ */ jsx(Head, {}),
  /* @__PURE__ */ jsxs(Body, { className: "bg-bg-2 m-0 text-center font-sans", children: [
    /* @__PURE__ */ jsx(Preview, { children: "Reset your password" }),
    /* @__PURE__ */ jsx(Container, { className: "mobile:mt-0 mx-auto mt-8 w-full max-w-160", children: /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Section, { className: "bg-bg mobile:px-2 px-6 py-4", children: /* @__PURE__ */ jsxs(Section, { className: "bg-bg-2 mobile:px-6 mobile:py-12 rounded-[8px] px-10 py-16 text-center", children: [
      /* @__PURE__ */ jsxs(Section, { className: "mb-3", children: [
        /* @__PURE__ */ jsx(
          Img,
          {
            src: LOGO_URL,
            alt: "Linknest Logo",
            width: 48,
            className: "mx-auto mb-5 block"
          }
        ),
        /* @__PURE__ */ jsx(Heading, { as: "h1", className: "font-28 text-fg m-0 font-sans", children: "Reset your password" })
      ] }),
      /* @__PURE__ */ jsxs(Text, { className: "font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-95 text-center font-sans", children: [
        "Someone has requested a link to change your password in",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold", children: companyName }),
        ", and you can do this through the link below."
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "box-border w-full rounded-[8px] bg-indigo-600 p-3 text-center font-semibold text-white",
          href: url,
          children: "Change your password"
        }
      ),
      /* @__PURE__ */ jsx(Text, { className: "font-13 text-fg-3 mx-auto mt-8 mb-0 max-w-100 text-center font-sans", children: "If you didn't request this, please ignore this email. Your password won't change until you access the link above and create a new one." })
    ] }) }) }) })
  ] })
] }) });
PasswordResetEmail.PreviewProps = {
  companyName: "Linknest",
  url: "https://linknest.example.com/"
};
var PasswordResetEmail_default = PasswordResetEmail;
export {
  PasswordResetEmail_default as default
};
