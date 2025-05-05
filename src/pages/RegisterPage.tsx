
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/Logo";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const isFormValid =
    username.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    password === confirmPassword &&
    termsAccepted;
  
  useEffect(() => {
    // Simple password strength calculation
    const calculateStrength = (pass: string) => {
      if (!pass) return 0;
      
      let strength = 0;
      
      if (pass.length >= 8) strength += 1;
      if (/[A-Z]/.test(pass)) strength += 1;
      if (/[0-9]/.test(pass)) strength += 1;
      if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
      
      return Math.min(strength, 3);
    };
    
    setPasswordStrength(calculateStrength(password));
  }, [password]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      await register(username, email, password);
      navigate("/");
    } catch (error) {
      setError(t("auth.registerFailed") || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const getStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
        return "";
      case 1:
        return t("auth.weak");
      case 2:
        return t("auth.medium");
      case 3:
        return t("auth.strong");
      default:
        return "";
    }
  };
  
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-playpod-light to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <Logo size="large" />
          <h1 className="text-2xl font-bold mt-4">{t("auth.register")}</h1>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-playpod-primary peer pt-4"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="absolute top-1 left-4 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs"
              >
                {t("auth.username")}
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-playpod-primary peer pt-4"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute top-1 left-4 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs"
              >
                {t("auth.email")}
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-playpod-primary peer pt-4"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute top-1 left-4 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs"
              >
                {t("auth.password")}
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {t("auth.passwordStrength")}:{" "}
                    <span className={passwordStrength === 3 ? "text-green-500" : passwordStrength === 2 ? "text-yellow-500" : "text-red-500"}>
                      {getStrengthLabel()}
                    </span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                  <div
                    className={`h-full transition-all ${getStrengthColor()}`}
                    style={{ width: `${(passwordStrength / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-playpod-primary peer pt-4"
                placeholder=" "
                required
              />
              <label
                htmlFor="confirmPassword"
                className="absolute top-1 left-4 text-xs text-muted-foreground transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs"
              >
                {t("auth.confirmPassword")}
              </label>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-muted-foreground">
                {t("auth.termsAgreement")}
              </span>
            </label>
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 bg-playpod-primary text-white rounded-lg font-medium hover:bg-playpod-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              t("auth.signUp")
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {t("auth.haveAccount")}{" "}
            <Link to="/login" className="text-playpod-primary hover:underline">
              {t("auth.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
