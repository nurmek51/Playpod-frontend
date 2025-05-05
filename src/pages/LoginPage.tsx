
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/Logo";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const isFormValid = email.trim() !== "" && password.trim() !== "";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError(t("auth.loginFailed") || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-playpod-light to-white dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-background rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-8">
          <Logo size="large" />
          <h1 className="text-2xl font-bold mt-4">{t("auth.login")}</h1>
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
          </div>
          
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full h-12 bg-playpod-primary text-white rounded-lg font-medium hover:bg-playpod-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              t("auth.signIn")
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {t("auth.noAccount")}{" "}
            <Link to="/register" className="text-playpod-primary hover:underline">
              {t("auth.signUp")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
