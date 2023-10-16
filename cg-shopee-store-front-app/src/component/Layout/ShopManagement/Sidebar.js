import {Fragment, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FaCubes} from 'react-icons/fa';
import {
    MdCloudDone,
    MdFreeCancellation,
    MdKeyboardArrowDown,
    MdNewspaper,
    MdPendingActions,
    MdViewList,
} from 'react-icons/md';
import {Collapse, Nav, Navbar, NavItem, NavLink as BSNavLink,} from 'reactstrap';

import bn from '../../../util/bemnames';
import LogoCogy from "../../../component/LogoCogy";
import Avatar from "../../../component/Avatar";
import {getImageStore, getNameStore} from "../../../service/userService";
import {CREATE_VOUCHER_PAGE, HOME_PAGE, ORDER_SELLER_MANAGEMENT_PAGE, PRODUCT_MANAGEMENT_PAGE} from "../../../constant/page";
import {ZERO} from "../../../constant/number";
import {BiAddToQueue} from "react-icons/bi";
import {IoPricetags} from "react-icons/io5";
import {AiFillSetting, AiOutlineWarning} from "react-icons/ai";
import {FaRegRectangleList} from "react-icons/fa6";
import {TbTruckDelivery} from "react-icons/tb";

const sidebarBackground = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};

const navOrders = [
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=all`, name: 'All order', Icon: FaRegRectangleList},
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=requesting`, name: 'Requesting order', Icon: AiOutlineWarning},
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=pending`, name: 'Pending order', Icon: MdPendingActions},
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=delivering`, name: 'Delivering order', Icon: TbTruckDelivery},
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=complete`, name: 'Complete order', Icon: MdCloudDone},
    {to: `${ORDER_SELLER_MANAGEMENT_PAGE}?status=canceled`, name: 'Canceled order', Icon: MdFreeCancellation},
];

const navProducts = [
    {to: PRODUCT_MANAGEMENT_PAGE, name: 'Products', Icon: MdViewList},
    // {to: '/admin/import-products', name: 'Import', Icon: FaDolly},
];

const navVouchers = [
    {to: CREATE_VOUCHER_PAGE, name: 'Add voucher', Icon: BiAddToQueue},
];


const defaultNavItems = [
    {name: 'Order management', Icon: MdNewspaper, subNavItems: navOrders, isOpenSub: false},
    {name: 'Product management', Icon: FaCubes, subNavItems: navProducts, isOpenSub: false},
    {name: 'Voucher management', Icon: IoPricetags, subNavItems: navVouchers, isOpenSub: false},
    {name: 'Setting store', Icon: AiFillSetting, subNavItems: [], isOpenSub: false},
];

const bem = bn.create('sidebar');

const Sidebar = () => {
    const [navItems, setNavItems] = useState(defaultNavItems);

    const handleClick = (name) => () => {
        const _navItems = [...navItems];
        const _navItem = _navItems.find(item => item.name === name);
        _navItem.isOpenSub = !_navItem.isOpenSub;
        setNavItems(_navItems);
    };


    return (
        <aside className={bem.b()}>
            <div className={bem.e('background')} style={sidebarBackground}/>
            <div className={bem.e('content')}>
                <Navbar>
                    <NavLink className="navbar-brand col-12 d-flex justify-content-center" to={HOME_PAGE}>
                        <LogoCogy/>
                    </NavLink>
                    <NavLink className="navbar-brand col-12 d-flex justify-content-center" to={PRODUCT_MANAGEMENT_PAGE}>
                        <Avatar src={getImageStore()}
                                size={60}
                        />
                    </NavLink>
                    <NavLink className="navbar-brand col-12 d-flex justify-content-center" to={PRODUCT_MANAGEMENT_PAGE}>
                        <div className="text-white">{getNameStore()}</div>
                    </NavLink>
                </Navbar>
                <Nav vertical>
                    {navItems.map(({name, Icon, subNavItems, isOpenSub}, index) => (
                        <Fragment key={index}>
                            <NavItem className={bem.e('nav-item')} onClick={handleClick(name)}>
                                <BSNavLink className={bem.e('nav-item-collapse')}
                                           id={`navItem-${name}-${index}`}
                                >
                                    <div className="d-flex">
                                        <Icon className={bem.e('nav-item-icon')}/>
                                        <strong className="align-self-start text-uppercase mt-2">{name}</strong>
                                    </div>
                                    {subNavItems?.length !== ZERO &&
                                        <MdKeyboardArrowDown
                                            className={bem.e('nav-item-icon')}
                                            style={{
                                                padding: 0,
                                                transform: isOpenSub ? 'rotate(0deg)' : 'rotate(-90deg)',
                                                transitionDuration: '0.3s',
                                                transitionProperty: 'transform',
                                            }}
                                        />
                                    }
                                </BSNavLink>
                            </NavItem>
                            <Collapse isOpen={isOpenSub}>
                                {subNavItems.map(({to, name, exact, Icon}, index) => (
                                    <div className="ms-4" key={index}>
                                        <NavItem className={bem.e('nav-item')}>
                                            <BSNavLink
                                                id={`navItem-${name}-${index}`}
                                                className="text-uppercase"
                                                tag={NavLink}
                                                to={to}
                                            >
                                                <Icon className={bem.e('nav-item-icon')}/>
                                                <p className="text-white mb-0">{name}</p>
                                            </BSNavLink>
                                        </NavItem>
                                    </div>

                                ))}
                            </Collapse>
                        </Fragment>
                    ))}
                </Nav>
            </div>
        </aside>
    );
}

export default Sidebar;