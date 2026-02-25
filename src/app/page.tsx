import Image from 'next/image';
import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Logo className="size-8" />
              <h1 className="font-headline text-3xl font-bold">
                NexaTrack
              </h1>
            </div>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://picsum.photos/seed/nexa-bg/1200/800"
          alt="Abstract background image"
          data-ai-hint="abstract background"
          width="1200"
          height="800"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
