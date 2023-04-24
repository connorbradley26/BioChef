import { SignIn } from "@clerk/nextjs";
 
const SignInPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center bg-base-300 px-14">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);
export default SignInPage;