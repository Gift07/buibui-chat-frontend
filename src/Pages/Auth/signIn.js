import { useContext } from "react";
import { Navigate, Link } from "react-router-dom";
import { AuthContext } from "../../Context/auth";
import { RotatingLines } from "react-loader-spinner";

const SignIn = () => {
  const access = localStorage.getItem("access");
  const { auth, signIn, handleChange, formdata } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(formdata);
  };

  if (access) return <Navigate to="/" />;
  return (
    <div className="w-screen h-screen fixed">
      <div className="w-full h-full grid grid-cols-2">
        <div className="w-full h-screen">
          <div className="w-full h-full relative">
            <div className="w-full h-full absolute">
              <img
                src="https://images.unsplash.com/photo-1678564356674-3d2c8b057ab1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                alt="background"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full h-full absolute z-10 bg-purple-500 opacity-60" />
            <div className="w-full h-full absolute z-20">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div>
                  <h1 className="text-4xl font-semibold text-white">
                    Welcome back!
                  </h1>
                </div>
                <div className="text-center text-xs pt-4 text-white px-12">
                  Nisi mollit ex ullamco occaecat cillum qui non. Esse duis sunt
                  tempor quis duis excepteur voluptate consequat ipsum eu mollit
                  ullamco. Aliquip et enim consectetur ipsum pariatur incididunt
                  sit excepteur anim velit. Dolore cupidatat sit id qui nisi ea
                  dolore deserunt nisi incididunt do mollit cupidatat do. Culpa
                  nisi dolore consequat sint id id.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-50">
          <div className="flex items-center pr-28 mb-20 w-full justify-end">
            <img src="Logo.png" alt="logo" className="h-20 w-16 object-cover" />
            <h1 className="text-xl uppercase text-purple-500">
              Infinity chats
            </h1>
          </div>
          <div className="w-full  px-24 flex flex-col items-center justify-center">
            <div className="w-full flex items-start pl-4 mb-6">
              <h1 className="font-semibold text-xl">
                Sign In to your account!
              </h1>
            </div>
            <form className="w-full px-4" onSubmit={(e) => handleSubmit(e)}>
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
                  name="phone_number"
                  value={formdata.phone_number}
                  onChange={(e) => handleChange(e)}
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
                  value={formdata.password}
                  onChange={(e) => handleChange(e)}
                  className="shadow-sm bg-gray-50 border outline-none text-xs border-gray-300 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </div>
              {auth.loading ? (
                <div className="w-full flex items-center justify-center gap-x-2  text-white bg-purple-500 focus:outline-none rounded-lg text-sm font-light py-2.5 text-center">
                  <RotatingLines
                    strokeColor="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="16"
                    visible={true}
                  />
                  <h1>Loading...</h1>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full uppercase text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm py-2.5 text-center"
                >
                  Sign In
                </button>
              )}
            </form>
            <div className="w-full px-4 text-xs pt-4 flex items-center gap-x-2">
              <h1>Don't have an account?</h1>
              <Link to="/sign-up" className="text-blue-500">
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
