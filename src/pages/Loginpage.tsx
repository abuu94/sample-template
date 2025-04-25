import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    

    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <header className="w-full bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">HR-AI Portal</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Menu</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to HR-AI Portal</h2>
      <p className="text-lg text-gray-600 mb-8">Order your favorite meals from the best restaurants in town.</p>
      <div className="w-full max-w-sm">
         <LoginForm />
       </div>
     
      
    </main>
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2023 HR-AI Portal. All rights reserved.</p>
      </div>
    </footer>
  </div>
  )
}
