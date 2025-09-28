import { useNavigate } from 'react-router-dom';
import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    const navigate = useNavigate();
    return(
        <header className="header">
            <ul className="header__menu">
                <li onClick={() => navigate('/')} ><IoHomeOutline fontSize='22'/></li>
                <li className='header__menu-search'><GoSearch className='header__menu-search-icon' fontSize='22'/><SearchBar /></li>
                <li><IoMusicalNotesOutline fontSize='22'/></li>
            </ul>
        </header>
    )
}
export default Header;