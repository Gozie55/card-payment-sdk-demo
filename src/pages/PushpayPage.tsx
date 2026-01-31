import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  Landmark,
  Smartphone,
  WalletCards,
  X,
  Clock3,
  ShieldCheck,
} from "lucide-react";

function PushpayPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const checkout = location.state || {};
  const amount = checkout.amount || "";
  const fullName = checkout.fullName || "";
  const email = checkout.email || "";
  const phone = checkout.phone || "";

  const [cardholder, setCardholder] = useState(fullName || "");

  const amountNumber = Number(amount || 0);
  const displayAmount =
    Number.isFinite(amountNumber) && amountNumber > 0
      ? `₦${amountNumber.toLocaleString()}`
      : "₦0";

  const COLORS = useMemo(
    () => ({
      skyBg: "#38bdf8",
      formBlue: "#2563eb",
      navy: "#0b1b3a",
      textOnBlue: "rgba(255,255,255,0.92)",
      textOnBlueStrong: "#ffffff",
      subtleOnBlue: "rgba(255,255,255,0.75)",
      softBorder: "rgba(255,255,255,0.22)",
      softBorder2: "rgba(255,255,255,0.16)",
      gold: "#f5c26b",
      goldBorder: "rgba(245, 194, 107, 0.9)",
    }),
    [],
  );

  const outer: React.CSSProperties = {
    minHeight: "100vh",
    background: COLORS.skyBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const shell: React.CSSProperties = {
    width: "100%",
    maxWidth: 420,
    borderRadius: 22,
    padding: 16,
    background: `linear-gradient(180deg, ${COLORS.formBlue}, ${COLORS.navy})`,
    boxShadow: "0 22px 60px rgba(2, 6, 23, 0.35)",
    border: `1px solid ${COLORS.softBorder}`,
    boxSizing: "border-box",
    position: "relative",
  };

  const panel: React.CSSProperties = {
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${COLORS.softBorder2}`,
  };

  const pillTestMode: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "6px 12px",
    borderRadius: 999,
    border: `1.6px solid ${COLORS.goldBorder}`,
    color: COLORS.gold,
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: "0.2px",
    background: "rgba(245, 194, 107, 0.10)",
  };

  const ChannelButton = ({
    active,
    label,
    icon,
    to,
  }: {
    active?: boolean;
    label: string;
    icon: React.ReactNode;
    to: string;
  }) => (
    <button
      type="button"
      onClick={() =>
        navigate(to, {
          state: checkout, // ✅ forward the same data to the next page
        })
      }
      style={{
        width: 70,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        display: "grid",
        justifyItems: "center",
        gap: 6,
      }}
      aria-label={label}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: active
            ? "rgba(255,255,255,0.16)"
            : "rgba(255,255,255,0.10)",
          border: active
            ? "2px solid rgba(255,255,255,0.85)"
            : "1px solid rgba(255,255,255,0.28)",
          boxShadow: active ? "0 10px 18px rgba(0,0,0,0.16)" : "none",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: active ? 950 : 800,
          color: active ? COLORS.textOnBlueStrong : "rgba(255,255,255,0.78)",
        }}
      >
        {label}
      </div>
    </button>
  );

  return (
    <div style={outer}>
      <div style={shell}>
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 36,
            height: 36,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.20)",
            background: "rgba(255,255,255,0.06)",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} color="#ffffff" />
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: 10,
          }}
        >
          <div style={pillTestMode}>⚠ TEST MODE</div>
        </div>

        {/* Merchant summary */}
        <div
          style={{
            ...panel,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontWeight: 1000,
                color: "#ffffff",
                fontSize: 22,
              }}
            >
              N
            </div>
            <div>
              <div style={{ fontWeight: 900, color: "#fff", fontSize: 14 }}>
                Netapps Marketplace
              </div>
              <div style={{ fontSize: 12, color: COLORS.subtleOnBlue }}>
                Dynamic Payment
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 12,
                color: COLORS.subtleOnBlue,
                fontWeight: 900,
              }}
            >
              {fullName || "Customer"}
            </div>
            <div style={{ fontSize: 12, color: COLORS.subtleOnBlue }}>
              Total Pay
            </div>
            <div style={{ fontSize: 16, fontWeight: 950, color: "#fff" }}>
              {displayAmount}
            </div>
          </div>
        </div>

        {/* Channels */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              color: COLORS.textOnBlue,
              marginBottom: 10,
            }}
          >
            Select Payment Channel
          </div>

          <div
            style={{ display: "flex", justifyContent: "space-between", gap: 6 }}
          >
            <ChannelButton
              label="Card"
              icon={<CreditCard size={18} color="#ffffff" />}
              to="/card"
            />
            <ChannelButton
              label="Bank"
              icon={<Landmark size={18} color="#ffffff" />}
              to="/bank"
            />
            <ChannelButton
              label="USSD"
              icon={<Smartphone size={18} color="#ffffff" />}
              to="/ussd"
            />
            <ChannelButton
              active
              label="PushPay"
              icon={<WalletCards size={18} color="#ffffff" />}
              to="/pushpay"
            />
          </div>
        </div>

        {/* PushPay content */}
        <div
          style={{
            borderRadius: 18,
            padding: 16,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.16)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              margin: "0 auto 12px",
              display: "grid",
              placeItems: "center",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <Clock3 size={26} color="#ffffff" />
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 950,
              color: "#fff",
              marginBottom: 8,
            }}
          >
            PayAttitude Not Available in Test Mode
          </div>

          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.55,
            }}
          >
            PayAttitude (PushPay) payments are only available in live mode. To
            test this payment channel, please use a live API key.
          </div>

          <div
            style={{
              marginTop: 14,
              borderRadius: 14,
              border: `1.6px solid ${COLORS.goldBorder}`,
              color: COLORS.gold,
              fontWeight: 900,
              fontSize: 12,
              padding: "10px 12px",
              background: "rgba(245, 194, 107, 0.10)",
              display: "inline-block",
            }}
          >
            Tip: Use card payments to test your integration in sandbox mode.
          </div>
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontSize: 11,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <ShieldCheck size={14} color="rgba(255,255,255,0.72)" />
          Secured by • BlackSilicon
        </div>
      </div>
    </div>
  );
}

export default PushpayPage;
