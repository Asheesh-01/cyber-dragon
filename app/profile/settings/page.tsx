"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";
import { Card, Button, Alert, LoadingSpinner } from "@/components/UI";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Moon, Sun } from "lucide-react";

interface Settings {
  theme: "dark" | "light" | "system";
  emailNotifications: boolean;
  inappNotifications: boolean;
  publicProfile: boolean;
  language: string;
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<Settings>({
    theme: "dark",
    emailNotifications: true,
    inappNotifications: true,
    publicProfile: false,
    language: "en",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Save settings to localStorage as demo
      localStorage.setItem("userSettings", JSON.stringify(settings));
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOutAllDevices = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      setMessage("Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;

    try {
      // This would typically call a backend endpoint
      await supabase.auth.signOut();
      router.push("/");
      setMessage("Account deleted successfully");
    } catch (error) {
      setMessage("Failed to delete account");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-28">
        <LoadingSpinner size="lg" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-black text-white pt-28 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-400">Please log in to access settings.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        {message && (
          <Alert
            type={message.includes("successfully") ? "success" : "error"}
            message={message}
            onClose={() => setMessage("")}
          />
        )}

        {/* Appearance */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sun size={20} /> Appearance
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    theme: e.target.value as any,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-600 focus:outline-none"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    language: e.target.value,
                  })
                }
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-600 focus:outline-none"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    emailNotifications: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-400">
                  Receive email updates on progress and achievements
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.inappNotifications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    inappNotifications: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <div>
                <p className="font-medium">In-App Notifications</p>
                <p className="text-sm text-gray-400">
                  Show notifications in the app
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.publicProfile}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    publicProfile: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-gray-400">
                  Allow others to view your profile
                </p>
              </div>
            </label>
          </div>
        </Card>

        {/* Security */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">Security</h2>
          <div className="space-y-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleSignOutAllDevices}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out All Devices
            </Button>
            <p className="text-xs text-gray-500">
              Sign out from all devices and sessions
            </p>
          </div>
        </Card>

        {/* Save Button */}
        <div className="mb-6">
          <Button
            loading={saving}
            onClick={handleSaveSettings}
            className="w-full"
          >
            Save Settings
          </Button>
        </div>

        {/* Danger Zone */}
        <Card className="border-red-600/30 bg-red-600/5">
          <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
          <Button
            variant="danger"
            className="w-full"
            onClick={handleDeleteAccount}
          >
            <Trash2 size={18} className="mr-2" />
            Delete Account
          </Button>
          <p className="text-xs text-gray-500 mt-3">
            This action is permanent and cannot be undone. All your data will be
            deleted.
          </p>
        </Card>
      </div>
    </main>
  );
}
