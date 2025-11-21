"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import localStorageManager from "@/lib/local-storage-manager";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const walletState = localStorageManager.loadWalletState();
    setConnected(walletState.connected);
  }, []);

  useEffect(() => {
    if (isOpen) {
      localStorageManager.saveWalletState({
        connected,
        address: connected ? "0x742d35Cc6634C0532925a3b844Bc0e7b3C7B3C" : null,
      });
    }
  }, [connected, isOpen]);

  if (!isOpen) return null;

  const handleConnect = () => {
    setConnected(true);
  };

  const handleDisconnect = () => {
    setConnected(false);
    localStorageManager.saveWalletState({ connected: false, address: null });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-primary/20 p-8 glow-border">
        <div className="text-center">
          <div className="text-5xl mb-4">🔗</div>
          <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>

          {!connected ? (
            <>
              <p className="text-foreground/70 mb-6">
                Connect your Web3 wallet to access blockchain features
              </p>

              <div className="space-y-2 mb-6">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 py-6"
                  onClick={handleConnect}
                >
                  MetaMask
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 py-6 bg-transparent"
                >
                  WalletConnect
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-primary/30 py-6 bg-transparent"
                >
                  Coinbase Wallet
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg mb-6">
                <p className="text-green-400 font-semibold mb-2">✓ Connected</p>
                <p className="text-sm text-foreground/70">0x742d...7B3C</p>
              </div>
              <p className="text-foreground/70 mb-6">
                Your wallet is now connected to FreelanceHub
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="flex-1 border-primary/30 bg-transparent"
                >
                  Disconnect
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Done
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
