import { FreedomWallPost } from "@/types"
import { motion } from "framer-motion"

interface WallNoteProps {
  content: FreedomWallPost
}

const WallNote = ({ content }: WallNoteProps) => {
  const formatTag = () => {
    if (content?.hashTag) {
      let hashTag = content.hashTag.replace(/_/g, " ");
      if (hashTag.startsWith("#")) {
        hashTag = hashTag.substring(1);
      }
      return hashTag;
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="p-8 space-y-4 bg-gray-900 border border-blue-300 border-opacity-50 shadow-lg  bg-opacity-90 rounded-2xl">
      <header className="text-2xl text-white">{content?.message}</header>
      {
        content?.hashTag &&
        <div className="flex items-center px-4 space-x-2 bg-blue-800  bg-opacity-20 rounded-full w-fit">
          <p className=" text-lg text-blue-300">#</p>
          <p className=" text-blue-300">{formatTag()}</p>
        </div>
      }
      <p className="text-lg text-right text-white">
        {`by: ${content?.author ? content?.author : "Anonymous"}`}
      </p>
    </motion.div>
  )
}

export default WallNote