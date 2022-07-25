import { ethers } from "ethers";
import * as React from "react";
import { Link } from "react-router-dom";
import { Web3Storage } from "web3.storage";
import SendMeme from "../../artifacts/contracts/SendMeme.sol/SendMeme.json";

export namespace CreatePost 
{
    declare let window: any;

    interface States
    {
        image: any;
        title: string;
        tag: string;
    }

    interface Props 
    {
        navigation: any;
    }

    export class Post extends React.Component<Props, States>
    {
        constructor(props: any) 
        {
            super(props);

            this.onChangeImage = this.onChangeImage.bind(this);
            this.onChangeTitle = this.onChangeTitle.bind(this);
            this.onChangeTag = this.onChangeTag.bind(this);
            this.onSubmit = this.onSubmit.bind(this);

            this.state =
            {
                image: null,
                title: "",
                tag: "",
            }
        }

        onChangeImage(e: any) 
        {
            this.setState({ image: e.target.files[0] });
        }

        onChangeTag(e: any) 
        {
            this.setState({ tag: e.target.value });
        }

        onChangeTitle(e: any) 
        {
            this.setState({ title: e.target.value });
        }

        async onSubmit(e: any): Promise<void>
        {
            e.preventDefault();
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    "0x141012373d7e1cDDD067BB8151Fa368AEfe78cB0", 
                    SendMeme.abi,
                    signer
                );
                console.log(contract);
                try
                {
                    const today = new Date();
                    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

                    const token: string | any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlCOTMzOTU5NjMxMTkwMjdBODFkZUUwOTlhODQxNEIxMDA3YzkxZTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDM4NzY2NTY0NTgsIm5hbWUiOiJhcGkifQ.Wt_lXKV_LBhiwJqLrc-9iqKNMrtilPB8dVnrgS9ZPd4" || process.env.WEB3_STORAGE;
                    const client = new Web3Storage({ token });

                    const files = [new File([this.state.image], this.state.image.name)];
                    console.log(files);

                    const cid = await client.put(files);
                    console.log(cid);

                    const Sendres: any = await client.get(cid);
                    const filesInfo = await Sendres.files();
                    console.log(filesInfo);

                    for (const file of filesInfo) 
                    {
                        const fileSize = file.size / 1000000;
                        console.log(file);
                        console.log(fileSize);

                        if(fileSize > 10) 
                        {
                            throw new Error("you can't upload file more then 10Mb");   
                        }

                        this.setState({
                            image: `https://${cid}.ipfs.dweb.link/${file.name}`,
                        });

                        const options = {value: ethers.utils.parseEther("0.001")}
                        const data: any = await contract.createMeme(
                            this.state.image,
                            this.state.title,
                            date.toString(),
                            this.state.tag,
                            options
                        );      
                        this.setState({ title: "", tag: "" });

                        console.log(data);
                    }
                } catch (error: unknown) 
                {
                    console.error(error);
                }
            }
        } 

        render(): React.ReactNode
        {
            return (
                <div>
                    <Link to="/">Home</Link>
                    <form onSubmit={(e) => this.onSubmit(e)}>
                        <input 
                            type="text"
                            defaultValue={this.state.title}
                            onChange={this.onChangeTitle}
                        />
                        <input 
                            type="text"
                            defaultValue={this.state.tag}
                            onChange={this.onChangeTag}
                        />
                        <input 
                            type="file" 
                            onChange={this.onChangeImage}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            );
        } 
    }
}
