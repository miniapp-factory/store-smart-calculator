import { generateMetadata } from "@/lib/farcaster-embed";
import SavageCfoExecutiveEdition from "@/components/savage-cfo-executive-edition";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <SavageCfoExecutiveEdition />
    </main>
  );
}
