import { whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] right-[max(20px,env(safe-area-inset-right))] z-40 chamfer chamfer-sm flex h-14 w-14 items-center justify-center bg-caba-500 text-white transition-[background-color,transform] duration-200 hover:bg-caba-600 active:scale-95"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
