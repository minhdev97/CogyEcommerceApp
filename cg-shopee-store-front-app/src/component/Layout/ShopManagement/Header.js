import { Button, Nav, Navbar } from 'reactstrap';
import { MdClearAll } from 'react-icons/md';

import bn from '../../../util/bemnames';
import UserCardToggle from "../../../component/UserCardToggle";

const bem = bn.create('header');

const Header = () => {

    const handleSidebarControlButton = (event) => {
        event.preventDefault();
        event.stopPropagation();

        document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
    };

    return (
        <Navbar light expand className={bem.b('bg-white')}>
            <Nav navbar className="mr-2">
                <Button outline onClick={handleSidebarControlButton} color="warning" >
                    <MdClearAll size={25} />
                </Button>
            </Nav>
            <Nav navbar className={bem.e('nav-right')}>
                <UserCardToggle isLargeFontSize={false}/>
            </Nav>
        </Navbar>
    );
};

export default Header;
