import { updatePostShares } from "@/actions/post.actions";
import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'
import {
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'
import {
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'
import {
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share'



interface ShareButtonsProps {
  url: string;
  title: string;
  message: string;
  postId?: string
  flickId?: string
  currentShares: number | undefined
}

const ShareButtons = ({
  url,
  title,
  message,
  postId,
  flickId,
  currentShares
}: ShareButtonsProps) => {
  const handleShare = async () => {
 
    if (postId && currentShares) {
      await updatePostShares(postId, currentShares)
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4">

      <div onClick={handleShare}>
        <WhatsappShareButton
          url={url}
          title={title + " \n" + message}
          separator="  "
          blankTarget
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <div onClick={handleShare}>
        <FacebookShareButton
          url={url}
          quote={title + " \n" + message}
          blankTarget
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div onClick={handleShare}>
        <TwitterShareButton
          url={url}
          title={title + " \n" + message}
          blankTarget
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div onClick={handleShare}>
        <LinkedinShareButton url={url} blankTarget>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;