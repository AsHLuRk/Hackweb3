import { ConnectWallet, useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { TOKEN_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Navbar = () => {
    
    const address = useAddress();
    const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);

    // Truncate the number to 6 decimal places
    const truncateNumber = (num: string) => {
        return num.slice(0, 6);
    }

    return (
        <div className={styles.navbarContainer}>
            {address && (
                <>
                    <h1>Chain<span style={{ color: "purple", fontWeight: "bold", fontSize: "40px" }}>Vestor</span></h1>
                    <div className={styles.navbarOptions}>
                        <Link href="/">
                            <p>Businesses</p>
                        </Link>
                        <Link href="/shop">
                            <p>Shop</p>
                        </Link>
                    </div>
                    <div className={styles.navbarOptions}>
                        {tokenBalance && (
                            <p>{truncateNumber(tokenBalance?.displayValue as string)} {tokenBalance?.symbol}</p>
                        )}
                        <ConnectWallet />
                    </div>
                </>
            )}
        </div>
    )
};

export default Navbar;