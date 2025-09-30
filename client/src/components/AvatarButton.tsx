import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useUser } from "@/context/UserContextProvider";

const AvatarButton = () => {
  const { fetchUser, isLoggedIn, setLoginModal, setIsLoggedIn, user, setUser } =
    useUser();
  useEffect(() => {
    const savedAvatar = localStorage.getItem("todo-avatar");
    if (savedAvatar) setUser({ ...user, avatar: savedAvatar });
    else {
      fetchUser();
    }
    if (!isLoggedIn) localStorage.removeItem("todo-avatar");
    else {
      fetchUser();
    }
  }, [isLoggedIn]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="pointer-cursor z-10">
        <Button
          size="icon"
          className="absolute lg:top-0 xl:top-0 2xl:top-0 md:top-0 mt-8 right-20 overflow-hidden rounded-full hover:ring-2 dark:hover:ring-white hover:ring-slate-950"
          title=""
        >
          <img src={user.avatar} alt="" className="object-cover" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="ring-1 ring-gray-200 dark:ring-slate-200 p-1 rounded-md mt-2 z-10 bg-white dark:bg-slate-950 shadow-md"
      >
        <DropdownMenuItem
          className="px-4 py-1 cursor-default text-center hover:dark:bg-slate-800 hover:bg-gray-100 rounded-md"
          onClick={() => (window.location.href = "/profile")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-4 py-1 cursor-default text-center text-red-400  hover:dark:bg-slate-800 hover:bg-gray-100 rounded-md"
          onClick={() => {
            localStorage.removeItem("todo-accessToken");
            localStorage.removeItem("todo-avatar");
            setLoginModal(true);
            setIsLoggedIn(false);
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarButton;
