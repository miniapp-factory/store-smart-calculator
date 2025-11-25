import { generateMetadata } from "@/lib/farcaster-embed";
import SavageCfoTextOnlyPro from "@/components/savage-cfo-text-only-pro";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <SavageCfoTextOnlyPro />
    </main>
  );
}
