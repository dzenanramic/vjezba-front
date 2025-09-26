import WardrobePage from "../components/ui/WardrobePage";
import TabNavigation from "../components/ui/TabNavigation";
import UploadingPage from "@/components/ui/UploadingPage";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-[90vh]">
      {/* Header */}
      <header className="w-full">
        <h1 className="text-2xl font-bold text-center p-4">Moj Ormar</h1>
      </header>

      {/* Main content - full width */}
      <main className="flex-grow w-full">
        <UploadingPage />
      </main>
    </div>
  );
}
