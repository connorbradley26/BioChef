import { SignUp } from "@clerk/nextjs";
 
const SignUpPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 text-center bg-base-300 px-14">
   <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);
export default SignUpPage;