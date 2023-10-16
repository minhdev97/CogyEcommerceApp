import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './component/Layout';
import { Fragment } from 'react';
import componentQueries from 'react-component-queries';


const App = ({ breakpoint }) => {
    return (
        <BrowserRouter >
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout breakpoint={breakpoint}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
};

const query = ({ width }) => {
    if (width < 575) {
        return { breakpoint: 'xs' };
    }

    if (576 < width && width < 767) {
        return { breakpoint: 'sm' };
    }

    if (768 < width && width < 991) {
        return { breakpoint: 'md' };
    }

    if (992 < width && width < 1199) {
        return { breakpoint: 'lg' };
    }

    if (width > 1200) {
        return { breakpoint: 'xl' };
    }

    return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
