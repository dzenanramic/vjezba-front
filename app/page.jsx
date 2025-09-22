import WardrobePage from "../components/ui/WardrobePage";
import TabNavigation from "../components/ui/TabNavigation";

export default function Home() {
  // Use a consistent base URL for all API calls

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center">Moj Ormar</h1>
        <WardrobePage />
        <div className="fixed bottom-2 left-0 w-full flex items-center justify-around bg-gray-200 h-15 ">
          <TabNavigation />
        </div>
      </main>
    </div>
  );
}
