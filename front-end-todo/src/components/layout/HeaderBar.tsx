import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLogout } from "react-icons/md";
import { useUser } from "@/hooks/useUser";

/**
 * Displays the application's header with the app title, the current user's avatar and name,
 * and a logout button.
 */
const HeaderBar: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="w-full bg-gray-100 py-1.5 px-6 flex justify-between items-center ">
      <h2 className="text-md font-semibold">Todo App</h2>

      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>

        <span className="font-medium text-sm">{user?.name ? user.name : user?.nickname}</span>

        <div
          onClick={() => logout()}
          className="flex flex-row gap-1 text-red-500 hover:bg-gray-200 font-semibold 
          cursor-pointer p-1 rounded-sm"
        >
          <MdLogout size={20} />
          <span className="self-center text-sm">Logout</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
