
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react"


export default function SignUp() {

    return (

        <div className="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto bg-[url('/flash.png')] bg-cover bg-center">

            <div className="backdrop-blur-xl bg-background/10 border border-foreground/20 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-8 space-y-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        Sign Up to ToDo List
                    </h1>
                    <form className="space-y-4" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="name@mail.com"
                                required
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                required
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>

                              <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground">
                               Confirm Password
                            </label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                id="password"
                                placeholder="••••••••"
                                required
                                className="bg-background/20 border border-foreground/30 text-foreground placeholder-foreground/70 rounded-lg focus:ring-foreground focus:border-foreground block w-full p-2.5"
                            />
                        </div>
            
                        <button
                            type="submit"
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            Sign Up
                        </button>

                        <button
                            type="button"
                            onClick={() => signIn("github")}
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <FaGithub className="w-5 h-5 me-3.5" />
                                Continue With Github</div>

                        </button>

                        <button
                            type="button"
                            onClick={() => signIn("google")}
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            <div className="flex justify-center items-center">
                                <FaGoogle className="w-5 h-5 mr-3.5" />
                                Continue With Google</div>

                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}