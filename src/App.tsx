import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import "./App.css";

 
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
// import BuyLongButton from "./components/buy-long-button";
import ChartComponent from "./components/fut-chart";
// import InfoBox from "./components/fut-info";
 
function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
 
  const wallets = useMemo(
    () => [
      // if desired, manually define specific/custom wallets here (normally not required)
      // otherwise, the wallet-adapter will auto detect the wallets a user's browser has available
    ],
    [network],
  );
 
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <div style={{
          height: '60px',
          width: '1330px',
          textAlign: 'right'
          }}>
          <WalletMultiButton />
          </div> */}
          <div style={{
          height: '60px',
          width: '1330px',
          textAlign: 'right', // Align items to the right
          display: 'flex', // Use flexbox for layout
          justifyContent: 'flex-end', // Justify items to the end
          alignItems: 'center', // Center items vertically
        }}>
          <WalletMultiButton />

          {/* Documentation Button */}
          <a href="https://ex2-0.gitbook.io/grx" target="_blank" rel="noopener noreferrer" style={{
            marginLeft: '10px', // Space between the buttons
            padding: '10px 15px', // Padding for the button
            backgroundColor: '#007BFF', // Button background color
            color: 'white', // Text color
            borderRadius: '5px', // Rounded corners
            textDecoration: 'none', // Remove underline from link
            fontWeight: 'bold', // Bold text
            display: 'flex', // Use flex to center the text
            alignItems: 'center', // Center text vertically
            justifyContent: 'center', // Center text horizontally
          }}>
            Documentation
          </a>
        </div>
          <div style={{
          height: '10px',}}></div>
          {/* <h1>Hello Solana</h1> */}
          <div style={{
          border: '2px solid #ccc',
          borderRadius: '10px',
          padding: '20px',
          backgroundColor: '#0e1a1e',
          width: '1290px', // Adjusting to full width
          display: 'flex', // Using flexbox for layout
          flexDirection: 'column', // Column layout
          alignItems: 'flex-start', // Align items to the left
          height: '50px'
        }}>
          <div style={{
            display: 'grid', // Using grid for structured layout
            gridTemplateColumns: 'repeat(6, 1fr)', // Six equal columns for headers
            gap: '10px', // Space between grid items
            width: '100%', // Full width for grid
            marginBottom: '10px', // Space below headers
          }}>
            {/* Column Headers */}
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>sUSDe APY Perpetual</div>
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Mark</div>
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Oracle</div>
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>24h Change</div>
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>24h Volume</div>
            <div style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>Funding Rate</div>
          </div>
          <div style={{
            display: 'grid', // Using grid for structured layout
            gridTemplateColumns: 'repeat(6, 1fr)', // Six equal columns for values
            gap: '10px', // Space between grid items
            width: '100%', // Full width for grid
          }}>
            {/* Corresponding Values */}
            <div style={{ color: '#fff', textAlign: 'center' }}> </div>
            <div style={{ color: '#fff', textAlign: 'center' }}>25.00</div>
            <div style={{ color: '#fff', textAlign: 'center' }}>-1.1 / -0.05%</div>
            <div style={{ color: '#fff', textAlign: 'center' }}>$71,854,880.67</div>
            <div style={{ color: '#fff', textAlign: 'center' }}>$219,985,215.56</div>
            <div style={{ color: '#fff', textAlign: 'center' }}>0.013%</div>
          </div>
        </div>
        <div style={{
          height: '10px',}}></div>
          <ChartComponent />

          
      
        </WalletModalProvider>
      </WalletProvider>
      {/* <InfoBox /> */}
    </ConnectionProvider>
  );
}
 
export default App;

