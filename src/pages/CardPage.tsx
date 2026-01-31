import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  CreditCard,
  Landmark,
  Smartphone,
  WalletCards,
  X,
  Wifi,
  ShieldCheck,
} from "lucide-react";

function CardPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const checkout = location.state || {};
  const amount = checkout.amount || "";
  const fullName = checkout.fullName || "";
  const email = checkout.email || "";
  const phone = checkout.phone || "";

  // ----------------------------
  // Mobile-first Fintech Blues + Gold (same pattern as your CardForm)
  // ----------------------------
  const COLORS = useMemo(
    () => ({
      skyBg: "#38bdf8",
      formBlue: "#2563eb",
      navy: "#0b1b3a",

      white: "#ffffff",
      offWhite: "#f8fafc",
      textOnBlue: "rgba(255,255,255,0.92)",
      textOnBlueStrong: "#ffffff",
      subtleOnBlue: "rgba(255,255,255,0.75)",

      softBorder: "rgba(255,255,255,0.22)",
      softBorder2: "rgba(255,255,255,0.16)",

      gold: "#f5c26b",
      goldBorder: "rgba(245, 194, 107, 0.9)",

      dangerText: "#7f1d1d",
      successText: "#14532d",
    }),
    [],
  );

  // ----------------------------
  // UI-only state (no API yet)
  // ----------------------------

  const [cardholder, setCardholder] = useState(fullName || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  // ----------------------------
  // Sanitizers
  // ----------------------------
  const onlyDigits = (v: string) => v.replace(/\D/g, "");

  const handleCardNumber = (v: string) => {
    const digits = onlyDigits(v).slice(0, 16);
    const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(grouped);
  };

  const handleExpiry = (v: string) => {
    const digits = onlyDigits(v).slice(0, 4);
    let mm = digits.slice(0, 2);
    const yy = digits.slice(2, 4);

    if (mm.length === 2) {
      const m = Math.max(1, Math.min(12, Number(mm) || 0));
      mm = String(m).padStart(2, "0");
    }

    const out = yy.length ? `${mm}/${yy}` : mm;
    setExpiry(out.slice(0, 5));
  };

  const handleCvv = (v: string) => setCvv(onlyDigits(v).slice(0, 4));

  // ----------------------------
  // Validation (UI only)
  // ----------------------------
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};

    const rawCard = onlyDigits(cardNumber);

    if (cardholder.trim().length < 3)
      next.cardholder = "Enter cardholder name.";
    if (rawCard.length !== 16)
      next.cardNumber = "Enter a valid 16-digit card number.";
    if (!/^\d{2}\/\d{2}$/.test(expiry)) next.expiry = "Use MM/YY.";
    if (cvv.length < 3) next.cvv = "Enter CVV (3–4 digits).";

    setErrors(next);

    if (Object.keys(next).length === 0) {
      setSuccessMessage("✅ Card details captured (UI only). Add API later.");
      setTimeout(() => setSuccessMessage(""), 5000);
    } else {
      setSuccessMessage("");
    }
  };

  const amountNumber = Number(amount || 0);
  const displayAmount =
    Number.isFinite(amountNumber) && amountNumber > 0
      ? `₦${amountNumber.toLocaleString()}`
      : "₦0";

  // ----------------------------
  // Styles (same approach as your CardForm)
  // ----------------------------
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

  const labelStyle: React.CSSProperties = {
    fontWeight: 800,
    display: "block",
    marginBottom: 6,
    color: COLORS.textOnBlue,
    fontSize: 13,
  };

  const getInputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: hasError
      ? "1.6px solid rgba(254,202,202,0.95)"
      : "1.3px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.10)",
    color: COLORS.textOnBlueStrong,
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
    boxShadow: hasError
      ? "0 0 0 3px rgba(254,202,202,0.18)"
      : "inset 0 1px 2px rgba(0,0,0,0.10)",
    transition: "0.2s",
  });

  const helperStyle = (type: "error" | "success"): React.CSSProperties => ({
    marginTop: 6,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 10,
    padding: "8px 10px",
    background:
      type === "error" ? "rgba(254,202,202,0.95)" : "rgba(187,247,208,0.95)",
    color: type === "error" ? COLORS.dangerText : COLORS.successText,
  });

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

  const panel: React.CSSProperties = {
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${COLORS.softBorder2}`,
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
      <form onSubmit={submit} style={shell}>
        {/* Close */}
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

        {/* TEST MODE */}
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
        <div style={{ marginBottom: 10 }}>
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
              active
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
              label="PushPay"
              icon={<WalletCards size={18} color="#ffffff" />}
              to="/pushpay"
            />
          </div>
        </div>

        {/* Card preview */}
        <div
          style={{
            borderRadius: 18,
            padding: 14,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.16)",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              height: 140,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 18px 30px rgba(0,0,0,0.16)",
              padding: 14,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -30,
                background:
                  "radial-gradient(circle at 20% 20%, rgba(245,194,107,0.22), transparent 55%), radial-gradient(circle at 80% 65%, rgba(56,189,248,0.35), transparent 55%)",
                transform: "rotate(8deg)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontWeight: 1000,
                    color: "#fff",
                    fontSize: 12,
                    letterSpacing: 0.6,
                  }}
                >
                  NETAPPS
                </div>
                <Wifi size={18} color="rgba(255,255,255,0.92)" />
              </div>

              <div
                style={{
                  marginTop: 44,
                  fontWeight: 1000,
                  color: "#fff",
                  fontSize: 12,
                }}
              >
                {cardholder || "CARDHOLDER"}
              </div>

              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 14,
                    fontWeight: 950,
                    color: "rgba(255,255,255,0.95)",
                    letterSpacing: 1.2,
                  }}
                >
                  {cardNumber.trim() ? cardNumber : "0000 0000 0000 0000"}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {expiry || "MM/YY"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fields */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Cardholder Name</label>
          <input
            type="text"
            value={cardholder}
            onChange={(e) =>
              setCardholder(e.target.value.replace(/[^a-zA-Z\s]/g, ""))
            }
            placeholder="Gozman Iwu"
            style={getInputStyle(!!errors.cardholder)}
          />
          {errors.cardholder && (
            <div style={helperStyle("error")}>{errors.cardholder}</div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={(e) => handleCardNumber(e.target.value)}
            placeholder="0000 0000 0000 0000"
            style={getInputStyle(!!errors.cardNumber)}
          />
          {errors.cardNumber && (
            <div style={helperStyle("error")}>{errors.cardNumber}</div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Expiry Date</label>
            <input
              type="text"
              inputMode="numeric"
              value={expiry}
              onChange={(e) => handleExpiry(e.target.value)}
              placeholder="MM/YY"
              style={getInputStyle(!!errors.expiry)}
            />
            {errors.expiry && (
              <div style={helperStyle("error")}>{errors.expiry}</div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <label style={labelStyle}>CVV</label>
            <input
              type="password"
              inputMode="numeric"
              value={cvv}
              onChange={(e) => handleCvv(e.target.value)}
              placeholder="***"
              style={getInputStyle(!!errors.cvv)}
            />
            {errors.cvv && <div style={helperStyle("error")}>{errors.cvv}</div>}
          </div>
        </div>

        {/* Save card */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
            color: "rgba(255,255,255,0.88)",
            fontWeight: 800,
            fontSize: 12,
          }}
        >
          <input
            type="checkbox"
            checked={saveCard}
            onChange={(e) => setSaveCard(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: COLORS.gold }}
          />
          Save this card for future payments
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "13px 0",
            fontSize: 15,
            fontWeight: 950,
            background: `linear-gradient(135deg, ${COLORS.gold}, #f59e0b)`,
            color: "#1f2937",
            border: "none",
            borderRadius: 16,
            cursor: "pointer",
            boxShadow: "0 16px 30px rgba(0,0,0,0.20)",
            transition: "transform 0.15s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.99)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Pay {displayAmount}
        </button>

        {successMessage && (
          <div
            style={{
              ...helperStyle("success"),
              marginTop: 12,
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        )}

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

        <style>
          {`
            @media (min-width: 640px) {
              form {
                padding: 18px !important;
              }
            }
          `}
        </style>

        <style>{`
          input::placeholder {
            color: rgba(255, 255, 255, 0.78);
            font-weight: 650;
          }
          input:focus::placeholder {
            color: rgba(255, 255, 255, 0.45);
          }
        `}</style>
      </form>
    </div>
  );
}

export default CardPage;
