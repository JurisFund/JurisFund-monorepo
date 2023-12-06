import { ConnectWallet } from "@thirdweb-dev/react";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <div>Admin Login Page</div>
      <ConnectWallet
        theme={"light"}
        auth={{ loginOptional: false }}
        switchToActiveChain={true}
        modalSize={"compact"}
        welcomeScreen={{}}
      />
    </>
  );
};

export default LoginPage;
