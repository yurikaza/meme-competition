import './App.css';
import Home from './containers/home';
import { Switch, Route } from "react-router-dom";
import ConnectWallets from './components/Wallet/ConnectWallet';
import Profile from './components/Wallet/Profile';
import { CreatePost } from './components/SendFile/CreatePost';
import { Layout } from './components/Layout/Navbar';
import { Winners } from './components/Vote/Winners';
import { Users } from './components/Wallet/Users';
import { PostDeatail } from './components/SendFile/PostDeatail';
import { LandingPage } from './containers/LandingPage';


function App() {
  let footer;
  if(window.location.href === "http://localhost:3000/") 
  {
    footer = <div></div>
  } else 
  {
    footer = <Layout.Footer />;
  }
  return (
    <>
      <Layout.Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/posts" component={Home} />
          <Route exact path="/login" component={ConnectWallets} />
          <Route exact path="/winners" component={Winners} />
          <Route exact path="/users/:publicKey" component={Users} />
          <Route exact path="/posts/:hex" component={PostDeatail} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/post" component={CreatePost.Post} />
        </Switch>
      {footer} 
    </>
  );
}

export default App;
