'use client'

import { useUser } from '@clerk/nextjs';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/actions/stream.actions';
import { ReactNode, useEffect, useState } from 'react';
import Loader from '@/components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY

const StreamVideoProvider= ({children}:{
    children:ReactNode
}) => {

   const [videoClient,setVideoCLient]=useState<StreamVideoClient>();
   const {user,isLoaded}=useUser();

   useEffect(()=>{
       if(!isLoaded || !user) return ;

       if(!apiKey) throw new Error('Stream Api key missinng');

       const client=new StreamVideoClient({
        apiKey,
        user:{
            id:user?.id,
            name:user?.username || user?.id,
            image:user?.imageUrl
        },
        tokenProvider
       })

       setVideoCLient(client);
   },[user,isLoaded]);
   
  if(!videoClient) return <Loader/>

  return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;