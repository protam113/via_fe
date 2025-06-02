'use client';

import React, { useState } from 'react';
import BackButton from '@/components/button/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateManagerData } from '@/types/types';
import { toast } from 'sonner';
import Heading from '@/components/design/Heading';
import AdminContainer from '@/components/container/admin.container';
import { useCreateManager } from '@/hooks/users/useUser';

const Page = () => {
  const { mutate: createManager } = useCreateManager();
  const [managerData, setManagerData] = useState<CreateManagerData>({
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateManagerData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CreateManagerData, string>> = {};
    let isValid = true;

    // Validate username
    if (!managerData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    // Validate name
    if (!managerData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (!managerData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(managerData.email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    // Validate password
    if (!managerData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (managerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleCreateManager = async () => {
    if (!validateForm()) {
      toast.error('Please fix the authentication error');
      return;
    }

    setLoading(true);

    try {
      await createManager(managerData);
      // Reset state
      setManagerData({
        username: '',
        name: '',
        email: '',
        password: '',
      });
      // Optionally navigate to another page
      // router.push('/managers');
    } catch (error) {
      console.error(error);
      // Error is already handled by the mutation hook
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof CreateManagerData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <AdminContainer>
      <BackButton />
      <div className="flex justify-between items-center">
        <Heading
          name="Create Manager"
          desc="Enter the required information to create a new manager account. The role is set by default, so you just need to fill out the basic details."
        />
        <Button
          onClick={handleCreateManager}
          disabled={loading}
          className="rounded-none"
        >
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateManager();
        }}
      >
        {[
          { label: 'Uername', name: 'username' },
          { label: 'Full name', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Password', name: 'password', type: 'password' },
        ].map(({ label, name, type = 'text' }) => (
          <div
            key={name}
            className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4"
          >
            <Label className="text-right" htmlFor={name}>
              {label}
            </Label>
            <div className="flex flex-col w-full">
              <Input
                id={name}
                type={type}
                name={name}
                value={managerData[name as keyof CreateManagerData] as string}
                onChange={handleInputChange}
                required
                placeholder={`Enter manager ${label.toLowerCase()}`}
                className={`rounded-none ${
                  errors[name as keyof CreateManagerData]
                    ? 'border-red-500'
                    : ''
                }`}
              />
              {errors[name as keyof CreateManagerData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name as keyof CreateManagerData]}
                </p>
              )}
            </div>
          </div>
        ))}
      </form>
    </AdminContainer>
  );
};

export default Page;
