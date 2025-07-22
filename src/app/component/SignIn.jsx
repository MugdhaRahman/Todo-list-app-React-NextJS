

export default function SignIn() {

    return (

        <div className="flex flex-col items-center justify-center w-full px-6 py-8 mx-auto bg-[url('/flash.png')] bg-cover bg-center">

            <div className="backdrop-blur-xl bg-background/10 border border-foreground/20 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="p-8 space-y-6">
                    <h1 className="text-2xl font-bold text-foreground">
                        Sign in to your account
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
                                placeholder="name@company.com"
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
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-foreground/30 bg-foreground/10 text-foreground focus:ring-foreground"
                                    required
                                />
                                <label htmlFor="remember" className="text-sm text-foreground">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-sm text-foreground hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary/30 hover:bg-secondary/50 text-foreground font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300"
                        >
                            Sign in
                        </button>
                        <p className="text-sm font-light text-foreground/80 text-center">
                            Don’t have an account yet?{" "}
                            <a href="#" className="font-medium text-foreground hover:underline">
                                Sign up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}