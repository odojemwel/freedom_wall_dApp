/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import * as anchor from "@coral-xyz/anchor"
import * as Web3 from "@solana/web3.js";
import { Input } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import CreatePost from "./CreatePost"
import idl from "../idl.json"
import WallNote from "./WallNote";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { FreedomWallPost } from "@/types";
import { motion } from "framer-motion"


const NotesList = () => {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const programId = new Web3.PublicKey("2YVujTjqyFigZx4YYh1fFzWgPtd2bDwgUJNEjiDLVCcC")
  const anchorWallet = useAnchorWallet()
  const { publicKey } = useWallet();
  const programIdl = idl as anchor.Idl;
  const [posts, setPosts] = useState<FreedomWallPost[]>([])


  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
      return new anchor.Program(programIdl, programId, provider)
    }
  }, [connection, anchorWallet])

  const addPost = async (formData: FreedomWallPost) => {
    const keypair = anchor.web3.Keypair.generate();
    if (program && publicKey) {
      const tx = await program.methods
        .createpost(formData.message, formData.author, formData.hashTag)
        .accounts({
          signer: publicKey,
          post: keypair.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([keypair])
        .rpc();
      setTimeout(getPosts, 5000);
    }
  }

  useEffect(() => {
    if (posts.length === 0) {
      getPosts()
    }

    const interval = setInterval(getPosts, 60000);

    return () => clearInterval(interval);
  }, [program])


  const getPosts = async () => {
    if (program) {
      setTimeout(async () => {
        const posts = await program.account.post.all()
        const cleanPost = posts.map(post => {
          return post.account as FreedomWallPost
        })
        console.log("posts", cleanPost)
        setPosts(cleanPost)
      }, 2000);
    }
  }

  return (
    <div className=" relative flex justify-center h-full">
      {anchorWallet ? <div className="flex flex-row flex-1 h-full space-x-2">
        <div className="flex-1 p-8 flex space-x-16 mx-4">
          <motion.div className="flex-1 space-y-8">
            {
              posts.map((post, index) => {
                if (index % 2 === 0)
                  return <WallNote key={index} content={post} />
              })
            }
          </motion.div>
          <motion.div className="flex-1 space-y-8">
            {
              posts.map((post, index) => {
                if (index % 2 !== 0)
                  return <WallNote key={index} content={post} />
              })
            }
          </motion.div>
        </div>

      </div>
        :
        <div className="flex justify-center flex-1 w-full my-8">
          <div className="text-4xl font-bold text-white">Please connect your wallet to get started.</div>
        </div>
      }
      <div className="fixed p-4 w-[50%] bg-gray-600 bg-opacity-50 border bottom-8 rounded-xl">
        <Input placeholder="Post a freedom wall note"
          className=" bg-white"
          focusBorderColor="blue.500"
          size="lg"
          onClick={() => {
            setAddModalOpen(true)
          }}
          readOnly
        />
      </div>
      <CreatePost addModalOpen={addModalOpen} setAddModalOpen={setAddModalOpen}
        post={(formData) => addPost(formData)} />
    </div>
  )
}

export default NotesList