import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";
import UserName from "../features/user/UserName";

export default function Header() {
    return(
        <header className="bg-yellow-500 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex items-center justify-between">
            <Link to="/" className="tracking-widest">fast react pizza co.</Link>
            <SearchOrder />
            <UserName />
        </header>
    )
}