"use client"
import { FreedomWallPost } from '@/types'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface CreatePostProps {
  addModalOpen: boolean
  setAddModalOpen: (value: boolean) => void
  post: (formData: FreedomWallPost) => void
}

const CreatePost = ({ addModalOpen, setAddModalOpen, post }: CreatePostProps) => {
  const [messageError, setMessageError] = useState(false)

  const [formData, setFormData] = useState({
    message: '',
    author: '',
    hashTag: ''
  })

  useEffect(() => {
    setFormData({
      message: '',
      author: '',
      hashTag: ''
    })

  }, [])


  const handleOnchange = (value: string, data: string) => {
    setFormData({ ...formData, [data]: value });
  };

  const handleSubmit = () => {
    if (formData.message === '') {
      setMessageError(true)
    } else {
      post(formData as FreedomWallPost)
      setAddModalOpen(false)
    }
  }

  return (
    <Modal isOpen={addModalOpen}
      onClose={() => {
        setAddModalOpen(false)
        setMessageError(false)
      }}
    >
      <ModalOverlay
        backdropFilter='blur(10px)' />
      <ModalContent className="bg-violet-950 rounded-3xl p-4"
        minWidth="50%" minHeight="50%">
        <ModalHeader className="text-center w-full">Create your post to the wall. It&apos;s a freedom wall🙂
          <br />
          But it&apos;s costs a few lamports🤑 to post😉
          <br />
          <p className="text-sm">Make sure you are connected to your wallet.</p>
        </ModalHeader>
        <ModalBody>
          <div className="flex-col space-y-4">
            <FormControl isInvalid={messageError}>
              <FormLabel>Message</FormLabel>
              <Input placeholder="message" required type="text" isRequired
                value={formData.message}
                onChange={(e) => handleOnchange(e.target.value, 'message')}
              />
              {messageError &&
                <FormErrorMessage>
                  Message is required
                </FormErrorMessage>
              }
            </FormControl>
            <FormControl>
              <FormLabel>Wall note author</FormLabel>
              <Input placeholder="author"
                colorScheme='black'
                value={formData.author}
                onChange={(e) => handleOnchange(e.target.value, 'author')}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Hash Tag</FormLabel>
              <Input placeholder="hashtag"
                value={formData.hashTag}
                onChange={(e) => handleOnchange(e.target.value, 'hashTag')}
              />
            </FormControl>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full">
            <Button width="full" variant="solid" colorScheme="blue" onClick={() => {
              handleSubmit()
            }}>Post</Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreatePost