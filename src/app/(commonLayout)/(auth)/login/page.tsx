import LoginForm from "@/components/login-form";
import SEO from "@/components/shared/SEO";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <>
      <SEO
        title="Secure Login - Access Your Account Safely"
        description="Log in to your account quickly and securely. Enjoy seamless access to all features and manage your profile effortlessly."
      />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Dream.</h1>
            <p className="text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm redirect={params.redirect} />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
