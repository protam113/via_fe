import LoginForm from '@/components/pages/AUTH/form/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div
        className="relative hidden lg:flex flex-col items-center justify-center p-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/hero1.png')" }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="max-w-md mx-auto text-center space-y-6 z-10">
          <Image
            src="/logo.svg"
            alt="Decorative bird illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
}
