'use client';

import React, { useState } from 'react';
import BackButton from '@/components/common/button/back-admin.button';
import { AdminContainer, Heading, Button, Input, Label } from '@/components';
import { Icons } from '@/assets/icons/icons';

import { useCreateManager } from '@/hooks/users/useUser';

// Form validation schema
import { employeeFormWithConfirmSchema } from '@/utils';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployeeError } from '@/constants';

type FormData = z.infer<typeof employeeFormWithConfirmSchema>;

const Page = () => {
  const { mutate: createManager } = useCreateManager();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(employeeFormWithConfirmSchema),
  });

  const handleCreateManager = (values: FormData) => {
    setLoading(true);
    const { confirmPassword: _confirmPassword, ...managerData } = values;

    createManager(managerData, {
      onSuccess: () => {
        reset();
      },
      onError: (error: any) => {
        setError('root', {
          type: 'manual',
          message: error.message || EmployeeError.FAILED_CREATE_EMPLOYEE,
        });
      },
      onSettled: () => setLoading(false),
    });
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
          type="submit"
          form="create-manager-form"
          disabled={loading}
          className="rounded-none"
        >
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </div>

      <form
        id="create-manager-form"
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(handleCreateManager)}
      >
        {/* Username */}
        <FormField
          label="Username"
          name="username"
          register={register}
          error={errors.username?.message}
        />

        {/* Full name */}
        <FormField
          label="Full Name"
          name="name"
          register={register}
          error={errors.name?.message}
        />

        {/* Email */}
        <FormField
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
        />

        {/* Password */}
        <PasswordField
          label="Password"
          name="password"
          register={register}
          error={errors.password?.message}
          show={showPassword}
          toggle={() => setShowPassword((p) => !p)}
        />

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
          show={showPassword}
          toggle={() => setShowPassword((p) => !p)}
        />
      </form>
    </AdminContainer>
  );
};

export default Page;

// COMPONENT: Input field
type FieldProps = {
  label: string;
  name: keyof FormData;
  type?: string;
  register: ReturnType<typeof useForm<FormData>>['register'];
  error?: string;
};

const FormField = ({
  label,
  name,
  type = 'text',
  register,
  error,
}: FieldProps) => (
  <div className="grid grid-cols-[150px_1fr] items-center gap-4">
    <Label className="text-right" htmlFor={name}>
      {label}
    </Label>
    <div className="flex flex-col w-full">
      <Input
        id={name}
        type={type}
        {...register(name)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`rounded-none ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

// COMPONENT: Password field
const PasswordField = ({
  label,
  name,
  register,
  error,
  show,
  toggle,
}: FieldProps & {
  show: boolean;
  toggle: () => void;
}) => (
  <div className="grid grid-cols-[150px_1fr] items-center gap-4">
    <Label className="text-right" htmlFor={name}>
      {label}
    </Label>
    <div className="flex flex-col w-full relative">
      <Input
        id={name}
        type={show ? 'text' : 'password'}
        {...register(name)}
        placeholder={`Enter ${label.toLowerCase()}`}
        className={`rounded-none pr-10 ${error ? 'border-red-500' : ''}`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-2.5 text-gray-500 hover:text-black"
      >
        {show ? <Icons.EyeOff size={18} /> : <Icons.Eye size={18} />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);
