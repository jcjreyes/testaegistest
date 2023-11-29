import React, { lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ReactNotification from 'react-notifications-component'
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import GlobalStyle from './theme/globalStyle';

import { QueryClient, QueryClientProvider} from 'react-query'

const Login = lazy(async () => await import('./pages/Login'))
const AdminDashboard = lazy(async () => await import('./pages/AdminDashboard'))
const PhotoshootDays = lazy(async () => await import('./pages/PhotoshootDays'))
const ReschedulingRequests = lazy(async () => await import('./pages/ReschedulingRequests'))
const SpecificRequest = lazy(async () => await import('./pages/ReschedulingRequests/components/SpecificRequest'))
const WriteupSubmissions = lazy(async () => await import('./pages/WriteupSubmissions'))
const YearbookRevisions = lazy(async () => await import('./pages/YearbookRevisions'))
const ForgotPassword = lazy(async () => await import('./pages/ForgotPassword'))
// const Memorandum = lazy(async () => await import('./pages/Memorandum'))

const queryClient = new QueryClient()

const App = () => {

  const localToken = localStorage.getItem('token');

  if (localToken == "undefined" || localToken == "null" || localToken == undefined || localToken == null) {
    return (
      <QueryClientProvider client={queryClient}>
      <ReactNotification />
      <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
        <Navbar loggedIn={false} />
        <Switch>
          <Login exact path="/login" />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
      </QueryClientProvider>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
    <ReactNotification />
    <BrowserRouter>
    <GlobalStyle />
    <ScrollToTop />
      <Navbar loggedIn={true} />
      <Switch>
        <Route exact path="/" component={AdminDashboard} />
        <Route exact path="/photoshoots" component={PhotoshootDays} />
        <Route exact path="/rescheduling" component={ReschedulingRequests} />
        <Route exact path="/rescheduling/:id" component={SpecificRequest} />
        <Route exact path="/writeups" component={WriteupSubmissions} />
        <Route exact path="/yearbook" component={YearbookRevisions} />
        <Redirect to="/" />
        {/* <Route exact path="/" component={} />
        <Route exact path="/" component={} /> */}
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
