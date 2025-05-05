
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User, Upload, Save } from "lucide-react";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    description: user?.description || "",
    avatar: user?.avatar || ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server
      // For demo, create an object URL
      const avatarUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: avatarUrl }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      // In a real app, this would be a call to updateUserProfile API
      // await updateUserProfile(formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t("settings.profileUpdated"),
        description: t("settings.profileUpdatedDescription")
      });
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: t("common.error"),
        description: t("settings.updateError"),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t("settings.title")}</h1>
      
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Avatar Upload */}
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div 
                  className="h-32 w-32 rounded-full overflow-hidden bg-muted mb-4 relative cursor-pointer"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt={formData.username} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <User size={48} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload size={24} className="text-white" />
                  </div>
                </div>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                />
                <p className="text-sm text-muted-foreground mb-2">
                  {t("settings.avatarTip")}
                </p>
                <button
                  type="button"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                  className="text-sm text-playpod-primary hover:underline"
                >
                  {t("settings.changeAvatar")}
                </button>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  {t("settings.username")}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-muted"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {t("settings.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-border bg-muted"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  {t("settings.description")}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 rounded-md border border-border bg-muted"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="active:scale-95"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                  {t("common.saving")}
                </span>
              ) : (
                <span className="flex items-center">
                  <Save size={16} className="mr-2" />
                  {t("common.save")}
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{t("settings.preferences")}</h2>
        
        <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{t("settings.language")}</h3>
              <p className="text-sm text-muted-foreground">{t("settings.languageDescription")}</p>
            </div>
            <select 
              className="p-2 rounded-md border border-border bg-muted"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
