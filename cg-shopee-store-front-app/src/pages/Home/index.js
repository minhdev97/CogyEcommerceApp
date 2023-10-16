import BannerSection from "../../component/product/BannerSection";
import Footer from "../../component/product/Footer";
import '../../asset/css/main/base.css';
import "../../asset/css/main/main.css";
import "../../asset/css/normalize.min.css";
import "../../asset/css/main/responsive.css";
import "../../asset/font/fontawesome-free-6.1.1/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import CategoryList from "../../component/CategoryList/CategoryList";
import React, {useEffect} from "react";
import { Button } from 'primereact/button';
import {Link} from "react-router-dom";
import {DAILY_DISCOVER_PAGE, HOME_PAGE} from "../../constant/page";
import {useDispatch} from "react-redux";
import {setHistory} from "../../features/history/historySlice";
import Top20SuggestProduct from "../../component/product/Top20SuggestProducts";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHistory(HOME_PAGE));
    }, [])

    return (
        <div style={{marginLeft: 50, width: 1200}}>
            <BannerSection/>
            <div style={{paddingTop: 30}}>
                <CategoryList/>
            </div>
            <div align={'center'} style={{paddingTop:10,paddingBottom:30}}>
                <Top20SuggestProduct/>
                <Link to={`${DAILY_DISCOVER_PAGE}?pageNumber=2`}>
                    <Button label="Xem thêm" severity="primary" text raised size={"large"} />
                </Link>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;