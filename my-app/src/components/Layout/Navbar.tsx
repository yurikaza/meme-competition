import * as React from "react";
import { Link } from 'react-router-dom';

export namespace Layout {
    declare let window: any;

    interface States
    {
    window: any; 
    }

    interface Props 
    {
    }

    export class Navbar extends React.Component<Props, States>
    {
        render(): React.ReactNode 
        {
            if(window.ethereum.selectedAddress) 
            {
                return (
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/posts">See Posts</Link>
                    <Link to="/winners">Winners</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/profile/post">Post</Link>
                </div>
                )
            }
            else
            {
                return (
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/posts">See Posts</Link>
                    <Link to="/winners">Winners</Link>
                </div>
                )
            }
        } 
    }

    export class Footer extends React.Component<Props, States>
    {
        render(): React.ReactNode
        {
            return (
                <div>
                    <h1>Here is Footer</h1> 
                </div>
            );
        } 
    }
}
