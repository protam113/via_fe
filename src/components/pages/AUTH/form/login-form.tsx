'use client';

import { Button, Input } from '@/components';
import { useAuthStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/utils';

export default function LoginForm() {
  const { login, checkAuth } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const { username, password } = values;

    // Optional: Custom check (ex: password length < 8 thì throw để kiểm soát)
    if (password.length < 8) {
      setError('password', {
        type: 'manual',
        message: 'Password must be at least 8 characters.',
      });
      return;
    }

    try {
      await login(username, password);
      await checkAuth();

      if (!useAuthStore.getState().isAuthenticated) {
        setError('root', {
          type: 'manual',
          message: 'Invalid username or password',
        });
        return;
      }

      router.push('/admin');
    } catch (err) {
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.',
      });
    }
  };

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-600">
          Welcome to VIA Dashboard
        </h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            placeholder="VIA account"
            className="w-full p-2 border rounded-none"
            {...register('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded-none"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Root error (login failed, etc.) */}
        {errors.root?.message && (
          <p className="text-sm text-red-500 text-center">
            {errors.root.message}
          </p>
        )}

        <Button
          type="submit"
          className="w-full font-bold rounded-none text-xl bg-black hover:bg-gray-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Loading...' : 'Login'}
        </Button>
      </form>
    </div>
  );
}
