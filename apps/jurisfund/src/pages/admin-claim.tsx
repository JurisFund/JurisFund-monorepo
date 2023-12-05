import {
  ThirdwebNftMedia,
  useAddress,
  useClaimNFT,
  useContract,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import React from "react";

// interface Props {}
const editionDropAddress = "0xF22ff6630C4411DaE1026d278fD996064b103186";

const AdminNFTClaimPage = (/* props: Props */) => {
  const address = useAddress();

  const { contract /*, isLoading: contractIsLoading */ } = useContract(editionDropAddress);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);
  // const { data, isLoading } = useContractRead(contract, "balanceOf", [account, id])

  return (
    <section>
      <div className="p-2">
        <Web3Button
          contractAddress={editionDropAddress}
          action={async () =>
            claim({
              tokenId: 0,
              quantity: 1,
            })
          }
        >
          Claim Edition NFT
        </Web3Button>
      </div>
      {address !== undefined && !isLoading && data && data.length === 0 ? (
        <p>{isClaiming ? "Deploying your account and claiming..." : "No NFTs, claim one now!"}</p>
      ) : data !== undefined ? (
        data.map((nft) => (
          <div
            className="m-0-auto mx-[1440px] flex w-full flex-col items-center p-4"
            key={nft.metadata.id}
          >
            <ThirdwebNftMedia metadata={nft.metadata} />
            <p>
              You own {nft.quantityOwned} {nft.metadata.name}
            </p>
          </div>
        ))
      ) : null}
    </section>
  );
};

export default AdminNFTClaimPage;
