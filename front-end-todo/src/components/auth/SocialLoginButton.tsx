import type { ReactNode } from "react";

type SocialLoginButtonProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

/**
 * A button used for social login (Google, Facebook, etc.).
 * Displays an icon and a label, and calls `onClick` when pressed.
 */
const SocialLoginButton = ({ icon, label, onClick }: SocialLoginButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 w-full cursor-pointer justify-start bg-white text-black border p-1.5 hover:bg-gray-100"
    >
      <span className="flex items-center justify-center pr-2 pl-2">{icon}</span>
      {label}
    </div>
  );
};

export default SocialLoginButton;
