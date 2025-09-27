import UploadingPage from "@/components/ui/UploadingPage";

export default function Home() {
  return (
    <div className="font-sans flex flex-col min-h-[100dvh] ">
      {/* Header */}
      <header className="w-full pt-[env(safe-area-inset-top)] ">
        <h1 className="text-4xl font-extrabold text-center py-0 pb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-fuchsia-500 to-pink-500 drop-shadow-lg select-none tracking-tight">
          Moj Ormar
        </h1>
      </header>

      {/* Main */}
      <main className="flex-grow w-full">
        <UploadingPage />
      </main>
    </div>
  );
}
