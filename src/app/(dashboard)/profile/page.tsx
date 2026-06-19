import { ProfileForm } from "@/features/users/components/profile-form";

export default function ProfilePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal information and preferences.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
