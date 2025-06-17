import EnrollForm from "./components/EnrollForm";
import GetCredits from "./components/Getcredits";



function App() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6 text-blue-800">Credit Engine API Frontend</h1>
      <EnrollForm />
      <GetCredits />
    </div>
  );
}

export default App;
