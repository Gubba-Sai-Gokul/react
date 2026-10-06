import { Link } from "react-router-dom";
import SearchOrder from "./SearchOrder";

export default function Header() {
    return(
        <header>
            <Link to="/">fast react pizza co.</Link>
            <SearchOrder />
        </header>
    )
}