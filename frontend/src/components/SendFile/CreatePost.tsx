import { ethers } from "ethers";
import * as React from "react";
import { Button, TextInput, TouchableOpacity, View } from "react-native";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js";
import SendMeme from "../../../artifacts/contracts/SendMeme.sol/SendMeme.json";

export namespace CreatePost 
{
    declare let window: any;

    interface States
    {
        image: any;
        title: string;
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
            this.onSubmit = this.onSubmit.bind(this);

            this.state =
            {
                image: null,
                title: "",
            }
        }

        onChangeImage(e: any) 
        {
            this.setState({ image: e.target.files[0] });
        }

        onChangeTitle(e: any) 
        {
            this.setState({ image: e.target.value });
        }

        async onSubmit(): Promise<void>
        {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const contract = new ethers.Contract(
                    "0x6Ed12C1a45BDd824EAcfd687a7C37a998Dee07A7", 
                    SendMeme.abi,
                    provider
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
                            title: "",
                        });

                        const data: any = await contract.createMeme(
                            this.state.image,
                            this.state.title,
                            date.toString()
                        );      

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
                <View>
                    <Button
                    title="go back home"
                    onPress={() => this.props.navigation.navigate('Home')}
                    />
                    <TextInput
                        style={{ height: 50, width: 300 }} 
                        value={this.state.title}
                        onChangeText={this.onChangeTitle}
                    />
                    <Button
                        title="Upload File"
                        onPress={() => this.onChangeImage}
                    />
                    <Button
                        title="Submit"
                        onPress={() => this.onSubmit}
                    />
                </View>
            );
        } 
    }
}
