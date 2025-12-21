import RegisterForm from "@/components/register-form";
import SEO from "@/components/shared/SEO";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <>
      <SEO
        title="Create Account - Join Us Today"
        description="Register a new account and start exploring our platform. Enjoy personalized features and a smooth onboarding experience."
      />
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 md:p-10">
        <div className="w-full max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">
                Create an account
              </CardTitle>
              <CardDescription className="text-gray-600">
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-[80vh] overflow-y-auto">
                <RegisterForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
