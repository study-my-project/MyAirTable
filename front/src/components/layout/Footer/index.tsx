import React from "react";
import * as styles from "./Footer.style"


const Footer = () => {
    return (
      <styles.FooterWrapper>
        <styles.FooterText>© 2024 My Project. All Rights Reserved.</styles.FooterText>
        <styles.FooterText>
          <styles.FooterLink href="/privacy">Privacy Policy</styles.FooterLink> |{" "}
          <styles.FooterLink href="/terms">Terms of Service</styles.FooterLink>
        </styles.FooterText>
      </styles.FooterWrapper>
    );
  };
  
  export default Footer;