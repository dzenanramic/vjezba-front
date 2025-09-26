import UploadingPage from "@/components/ui/UploadingPage";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-[100dvh]">
      {/* Header */}
      <header className="w-full pt-[env(safe-area-inset-top)]">
        <h1 className="text-2xl font-bold text-center p-4 pb-2">Moj Ormar</h1>
      </header>

      {/* Main content - full width */}
      <main className="flex-grow w-full">
        <UploadingPage />
      </main>
    </div>
  );
}
