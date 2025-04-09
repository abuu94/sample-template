import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/login?username=${username}&password=${password}`);
      if (response.data.length > 0) {
        setMessage('Login successful!');
        // Handle successful login (e.g., store user info, redirect to another page, etc.)
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in', error);
      setMessage('An error occurred during login');
    }
  };

  const Navigate= useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
     
      <main className="flex-1 flex flex-col py-4 px-4">
        
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form  onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input 
                      id="password" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                       required />
                    </div>
                    <button className="secondary" type="submit">Login</button> 
                    {/* <Button onClick={()=> Navigate('/dashboard')} type="submit" className="w-full">
                      Login
                    </Button> */}
                    <Button variant="outline" className="w-full">
                      Login with Google
                    </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a href="#" className="underline underline-offset-4">
                      Sign up
                    </a>
                  </div>
                </form>
                {message && <p>{message}</p>}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="w-full bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Foodie. All rights reserved.</p>
        </div>
      </footer>
    </div>

    // <div className={cn("flex flex-col gap-6", className)} {...props}>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle className="text-2xl">Login</CardTitle>
    //       <CardDescription>
    //         Enter your email below to login to your account
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <form>
    //         <div className="flex flex-col gap-6">
    //           <div className="grid gap-2">
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               type="email"
    //               placeholder="m@example.com"
    //               required
    //             />
    //           </div>
    //           <div className="grid gap-2">
    //             <div className="flex items-center">
    //               <Label htmlFor="password">Password</Label>
    //               <a
    //                 href="#"
    //                 className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
    //               >
    //                 Forgot your password?
    //               </a>
    //             </div>
    //             <Input id="password" type="password" required />
    //           </div>
    //           <Button type="submit" className="w-full">
    //             Login
    //           </Button>
    //           <Button variant="outline" className="w-full">
    //             Login with Google
    //           </Button>
    //         </div>
    //         <div className="mt-4 text-center text-sm">
    //           Don&apos;t have an account?{" "}
    //           <a href="#" className="underline underline-offset-4">
    //             Sign up
    //           </a>
    //         </div>
    //       </form>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
