import { useMemo, useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CardForm() {
  // ----------------------------
  // Form State
  // ----------------------------
  const [amount, setAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ----------------------------
  // Mobile-first Fintech Blues + Gold
  // ----------------------------
  const COLORS = useMemo(
    () => ({
      // Background (skyblue)
      skyBg: "#38bdf8",

      // Form (blue)
      formBlue: "#2563eb",
      navy: "#0b1b3a",

      // Neutrals
      white: "#ffffff",
      offWhite: "#f8fafc",
      textOnBlue: "rgba(255,255,255,0.92)",
      textOnBlueStrong: "#ffffff",
      subtleOnBlue: "rgba(255,255,255,0.75)",

      // Borders
      softBorder: "rgba(255,255,255,0.22)",

      // Gold accents
      gold: "#f5c26b",
      goldBorder: "rgba(245, 194, 107, 0.9)",

      // Feedback
      danger: "#fecaca",
      dangerText: "#7f1d1d",
      success: "#bbf7d0",
      successText: "#14532d",
    }),
    [],
  );

  // ----------------------------
  // Input Handlers (sanitizers)
  // ----------------------------
  const handleAmount = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 9) setAmount(digits);
  };

  const handleFullName = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setFullName(value);
  };

  const handleEmail = (e) => setEmail(e.target.value);

  const handlePhone = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 11) setPhone(digits);
  };

  // ----------------------------
  // Validation
  // ----------------------------
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const hasTwoNames = (v) => {
    const parts = v.trim().split(/\s+/).filter(Boolean);
    return parts.length >= 2;
  };

  const isValidPhone = (v) => /^0\d{10}$/.test(v);

  const isValidAmount = (v) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!isValidAmount(amount))
      newErrors.amount = "Enter a valid amount greater than 0.";
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (!hasTwoNames(fullName))
      newErrors.fullName = "Enter at least two names (e.g., John Doe).";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!isValidEmail(email))
      newErrors.email = "Enter a valid email address (e.g., name@email.com).";

    if (!phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!isValidPhone(phone))
      newErrors.phone = "Phone must start with 0 and be exactly 11 digits.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage("");

      // Navigate to the gateway Card page (UI checkout)
      navigate("/card", {
        state: {
          amount,
          fullName,
          email,
          phone,
        },
      });
    } else {
      setSuccessMessage("");
    }
  };

  // ----------------------------
  // Styles (mobile-first)
  // ----------------------------
  const getInputStyle = (hasError) => ({
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: hasError
      ? "1.6px solid rgba(254,202,202,0.95)"
      : "1.3px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.10)", // glass on blue card
    color: COLORS.textOnBlueStrong,
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
    boxShadow: hasError
      ? "0 0 0 3px rgba(254,202,202,0.18)"
      : "inset 0 1px 2px rgba(0,0,0,0.10)",
    transition: "0.2s",
  });

  const labelStyle = {
    fontWeight: 800,
    display: "block",
    marginBottom: 6,
    color: COLORS.textOnBlue,
    fontSize: 13,
  };

  const helperStyle = (type) => ({
    marginTop: 6,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 10,
    padding: "8px 10px",
    background:
      type === "error" ? "rgba(254,202,202,0.95)" : "rgba(187,247,208,0.95)",
    color: type === "error" ? COLORS.dangerText : COLORS.successText,
  });

  // Responsive container padding + narrow maxWidth
  const outer = {
    minHeight: "100vh",
    background: COLORS.skyBg, // skyblue background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 14, // mobile-first
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  return (
    <div style={outer}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420, // narrower (mobile-first)
          borderRadius: 22,
          padding: 16,
          background: `linear-gradient(180deg, ${COLORS.formBlue}, ${COLORS.navy})`, // blue form card
          boxShadow: "0 22px 60px rgba(2, 6, 23, 0.35)",
          border: `1px solid ${COLORS.softBorder}`,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 16,
                display: "grid",
                placeItems: "center",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <CreditCard size={20} color="#ffffff" />
            </div>
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "-0.3px",
              color: COLORS.textOnBlueStrong,
              marginBottom: 8,
            }}
          >
            Script SDK Demo
          </div>

          {/* Gold Test Mode pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 999,
              border: `1.6px solid ${COLORS.goldBorder}`,
              color: COLORS.gold, // gold text
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: "0.2px",
              background: "rgba(245, 194, 107, 0.10)",
            }}
          >
            TEST MODE
          </div>
        </div>

        {/* Plan summary */}
        <div
          style={{
            borderRadius: 18,
            padding: 20,
            marginBottom: 14,
            background: "rgba(255,255,255,0.010)",
            border: "2px solid rgba(255,255,255,0.20)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 900,
                color: COLORS.textOnBlueStrong,
                fontSize: 14,
              }}
            >
              Premium Subscription
            </div>
            <div style={{ fontSize: 12, color: COLORS.subtleOnBlue }}>
              Flexible amount payment
            </div>
          </div>

          <div
            style={{
              fontSize: 12,
              fontWeight: 900,
              color: COLORS.gold,
              background: "rgba(245, 194, 107, 0.10)",
              border: "1px solid rgba(245, 194, 107, 0.35)",
              padding: "8px 10px",
              borderRadius: 999,
              whiteSpace: "nowrap",
            }}
          >
            Secure
          </div>
        </div>

        {/* Fields (mobile-first, stacked) */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Amount (₦)</label>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmount}
            placeholder="5000"
            style={getInputStyle(errors.amount)}
          />
          {errors.amount && (
            <div style={helperStyle("error")}>{errors.amount}</div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={handleFullName}
            placeholder="John Doe"
            style={getInputStyle(errors.fullName)}
          />
          {errors.fullName && (
            <div style={helperStyle("error")}>{errors.fullName}</div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="name@email.com"
            style={getInputStyle(errors.email)}
          />
          {errors.email && (
            <div style={helperStyle("error")}>{errors.email}</div>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Phone Number</label>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={handlePhone}
            placeholder="08012345678"
            style={getInputStyle(errors.phone)}
          />
          {errors.phone && (
            <div style={helperStyle("error")}>{errors.phone}</div>
          )}
        </div>

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
          Pay Now
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

        {/* Tiny responsiveness improvement without CSS files:
            Increase padding slightly on larger screens */}
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
    color: rgba(255, 255, 255, 0.75); /* brighter placeholder */
    font-weight: 600;
  }

  input:focus::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }
`}</style>
      </form>
    </div>
  );
}

export default CardForm;
