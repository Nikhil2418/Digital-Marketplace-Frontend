import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ServiceProviderProfile = () => {
  const { id } = useParams(); // Get user ID from URL
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch service provider profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://digital-marketplace-backend-production.up.railway.app/api/profile/service-provider/${id}`);
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{profile.companyName || 'Service Provider'}</h1>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Languages:</strong> {profile.languages?.join(', ')}</p>
      <p><strong>Ratings:</strong> {profile.ratings} ⭐</p>
      <p><strong>Jobs Posted:</strong> {profile.jobsPosted}</p>
      <p><strong>Payment Verified:</strong> {profile.paymentVerified ? 'Yes' : 'No'}</p>
      <p><strong>Phone Verified:</strong> {profile.phoneVerified ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ServiceProviderProfile;
