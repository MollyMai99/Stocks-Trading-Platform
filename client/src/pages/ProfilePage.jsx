import { useEffect, useState } from "react";
import { getUserProfile } from "../utilities/users-service";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getUserProfile();
      setProfile(profileData);
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Approved:</strong> {profile.is_approved ? "Yes" : "No"}
      </p>
    </div>
  );
}
