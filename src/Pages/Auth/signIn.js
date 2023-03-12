import { Navigate, Link } from "react-router-dom";

const SignIn = () => {
  const access = localStorage.getItem("access");

  if (access) return <Navigate to="/sign-in" />;
  return (
    <div className="w-screen h-screen fixed">
      <div className="w-full h-full grid grid-cols-2">
        <div className="w-full h-full bg-purple-500">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
              <h1 className="text-xl font-semibold text-white">
                Welcome back!
              </h1>
            </div>
            <div className="text-center text-xs pt-4 text-white px-12">
              Nisi mollit ex ullamco occaecat cillum qui non. Esse duis sunt
              tempor quis duis excepteur voluptate consequat ipsum eu mollit
              ullamco. Aliquip et enim consectetur ipsum pariatur incididunt sit
              excepteur anim velit. Dolore cupidatat sit id qui nisi ea dolore
              deserunt nisi incididunt do mollit cupidatat do. Culpa nisi dolore
              consequat sint id id.
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50">
          <div className="w-full h-full px-24 flex flex-col items-center justify-center">
            <div className="w-full flex items-start pl-4 mb-6">
              <h1 className="font-semibold text-xl">
                Sign In to your account!
              </h1>
            </div>
            <form className="w-full px-4">
              <div class="mb-4">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your phone number
                </label>
                <input
                  type="phone"
                  id="phone"
                  className="shadow-sm bg-gray-50 border outline-none border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-8">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="shadow-sm bg-gray-50 border outline-none text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
              <button
                type="submit"
                className="w-full uppercase text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm py-2.5 text-center"
              >
                Sign In
              </button>
            </form>
            <div className="w-full px-4 text-xs pt-4 flex items-center gap-x-2">
              <h1>Don't have an account?</h1>
              <Link to="/sin-up" className="text-blue-500">
                {" "}
                register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
