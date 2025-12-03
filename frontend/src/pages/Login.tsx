import { Button } from "@/components/ui/button";
import { GOOGLE_CLIENT_ID, GOOGLE_OAUTH_CALLBACK_URL } from "@/utils/constants";

const LoginPage = () => {
  const handleClick = () => {
    const googleClientId = GOOGLE_CLIENT_ID;

    const redirectUri = GOOGLE_OAUTH_CALLBACK_URL;

    const scope =
      "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/generative-language.retriever";

    const targetUrl =
      `https://accounts.google.com/o/oauth2/auth?` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` + // token is for frontend, implicit flow, resposne_type= code for authorization code flow
      `client_id=${googleClientId}&` +
      `prompt=consent&` +
      `scope=${encodeURIComponent(scope)}`;

    window.location.href = targetUrl;
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-gray-100 mb-8">
            Login to Your Account
          </h1>
        </div>

        <div className="flex items-center justify-center">
          <Button className="btn btn-primary" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 326667 333333"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              imageRendering="optimizeQuality"
              fillRule="evenodd"
              clipRule="evenodd"
              width={20}
              height={20}
            >
              <path
                d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                fill="#4285f4"
              />
              <path
                d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                fill="#34a853"
              />
              <path
                d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                fill="#fbbc04"
              />
              <path
                d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                fill="#ea4335"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
        <p className="text-md text-center text-gray-400 mt-3">
          By logging in, you agree to our{" "}
          <span className="underline hover:text-gray-400">Terms</span> and have
          read our{" "}
          <span className="underline hover:text-gray-400">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
