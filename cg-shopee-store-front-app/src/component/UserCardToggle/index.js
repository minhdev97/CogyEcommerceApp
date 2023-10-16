import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListGroup, ListGroupItem, NavItem, NavLink, Popover, PopoverBody } from 'reactstrap';
import { MdExitToApp, MdHelp, MdMessage, MdPersonPin, MdSettingsApplications } from 'react-icons/md';
import Avatar from '../../component/Avatar';
import { getAvatar, getEmail, getFullName, getUsername } from '../../service/userService';
import blankAvatar from '../../asset/img/blank-avatar.jpg';
import UserCard from '../../component/UserCard';
import {LOGIN_PAGE, ORDER_USER_HISTORY_PAGE, PROFILE_PAGE} from '../../constant/page';
import { useEffect } from 'react';
import { useRef } from 'react';


const UserCardToggle = ({ isLargeFontSize }) => {
    const [isOpen, setIsOpen] = useState(false);
    const userCardRef = useRef(null);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleToggleUserCard = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseOver = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                userCardRef.current &&
                !userCardRef.current.contains(e.target) &&
                formRef.current &&
                !formRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
        };
    }, []);

     useEffect(() => {
         setIsOpen(false); // Close UserCard whenever the route changes
     }, [location]);

    const styleFontSize = () => {
        if (isLargeFontSize) {
            return { fontSize: '1.5rem' };
        } else {
            return { fontSize: '1rem' };
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate(LOGIN_PAGE);
        window.location.reload();
    };

    const handleClickProfile = () => {
        navigate(PROFILE_PAGE);
    };

    const handleClickOrderHistory = () => {
        navigate(ORDER_USER_HISTORY_PAGE);
    }

    return (
        <>
            <NavItem>
                <NavLink id="Popover2" onMouseOver={handleMouseOver}>
                    <Avatar onClick={handleToggleUserCard} className="can-click" src={getAvatar() ?? blankAvatar} />
                </NavLink>

                <Popover
                    placement="bottom-end"
                    isOpen={isOpen}
                    toggle={handleToggleUserCard}
                    target="Popover2"
                    className="p-0 border-0"
                    style={{ top: 'calc(100% + 5px)', left: 0, minWidth: 250, margin: '10px' }}
                    innerRef={userCardRef}
                >
                    <PopoverBody className="p-0 border-light">
                        {/* <button
                            onClick={handleToggleUserCard}
                            style={{ zIndex: 1, position: 'absolute', top: '-10px', right: '-10px', fontSize: '30px' }}
                        >
                            <image
                                class="close-img"
                                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                                alt="icon"
                            />
                        </button> */}
                        {/* <button
                            onClick={handleToggleUserCard}
                            style={{
                                zIndex: 1,
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                fontSize: '30px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                class="close-img"
                                src="https://salt.tikicdn.com/ts/upload/fe/20/d7/6d7764292a847adcffa7251141eb4730.png"
                                alt="Close Icon"
                                style={{ width : '24px', height: '24px'}}
                            />
                        </button> */}
                        <UserCard
                            avatar={getAvatar() ?? blankAvatar}
                            title={getFullName()}
                            subtitle={getEmail()}
                            className="border-light"
                            isLargeFontSize={isLargeFontSize}
                        ></UserCard>
                        <div ref={formRef}>
                            <ListGroup flush style={styleFontSize()}>
                                <ListGroupItem
                                    tag="button"
                                    action
                                    className="border-light"
                                    onClick={handleClickProfile}
                                >
                                    <MdPersonPin /> Profile
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light" onClick={handleClickOrderHistory}>
                                    <MdMessage /> Orders History
                                </ListGroupItem>
                                <ListGroupItem tag="button" action className="border-light" onClick={handleLogout}>
                                    <MdExitToApp /> Sign out
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </PopoverBody>
                </Popover>
            </NavItem>
        </>
    );
};

export default UserCardToggle;
