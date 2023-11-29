import React, { lazy, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ReactNotification from "react-notifications-component";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyle from "./theme/globalStyle";
import { Accounts } from "./services";
import { store } from "react-notifications-component";

import { QueryClient, QueryClientProvider } from "react-query";

const Login = lazy(async () => await import("./pages/Login"));
const AdminDashboard = lazy(async () => await import("./pages/AdminDashboard"));
const PhotoshootDays = lazy(async () => await import("./pages/PhotoshootDays"));
const ReschedulingRequests = lazy(
    async () => await import("./pages/ReschedulingRequests")
);
const SpecificRequest = lazy(
    async () =>
        await import("./pages/ReschedulingRequests/components/SpecificRequest")
);
const WriteupSubmissions = lazy(
    async () => await import("./pages/WriteupSubmissions")
);
const YearbookRevisions = lazy(
    async () => await import("./pages/YearbookRevisions")
);
const ForgotPassword = lazy(async () => await import("./pages/ForgotPassword"));
// const Memorandum = lazy(async () => await import('./pages/Memorandum'))

const queryClient = new QueryClient();

const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        // Fetch a user
        Accounts.me().then((data) => setUser(data));
    }, []);

    useEffect(() => {
        // If a user exists and he is not a staff
        if (user?.is_logged_in && !user?.user?.is_staff) {
            // Alert user
            store.addNotification({
                title: "Invalid Login",
                message:
                    "Only admins are given access to Aegis Admin. Please login using an admin account.",
                type: "danger",
                insert: "bottom",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
            });
            // Logout
            Accounts.logout();
        }
    }, [user]);

    return user?.is_logged_in && user?.user?.is_staff ? (
        <QueryClientProvider client={queryClient}>
            <ReactNotification />
            <BrowserRouter>
                <GlobalStyle />
                <ScrollToTop />
                <Navbar loggedIn={true} />
                <Switch>
                    <Route exact path="/" component={AdminDashboard} />
                    <Route
                        exact
                        path="/photoshoots"
                        component={PhotoshootDays}
                    />
                    <Route
                        exact
                        path="/rescheduling"
                        component={ReschedulingRequests}
                    />
                    <Route
                        exact
                        path="/rescheduling/:id"
                        component={SpecificRequest}
                    />
                    <Route
                        exact
                        path="/writeups"
                        component={WriteupSubmissions}
                    />
                    <Route
                        exact
                        path="/yearbook"
                        component={YearbookRevisions}
                    />
                    <Redirect to="/" />
                    {/* <Route exact path="/" component={} />
        <Route exact path="/" component={} /> */}
                </Switch>
                {/* <Footer /> */}
            </BrowserRouter>
        </QueryClientProvider>
    ) : (
        <QueryClientProvider client={queryClient}>
            <ReactNotification />
            <BrowserRouter>
                <GlobalStyle />
                <ScrollToTop />
                <Navbar loggedIn={false} />
                <Switch>
                    <Login exact path="/login" />
                    <Route
                        exact
                        path="/forgot-password"
                        component={ForgotPassword}
                    />
                    <Redirect to="/login" />
                </Switch>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
