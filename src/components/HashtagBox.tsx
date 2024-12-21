
const HashtagBox = ({text} : {text: string}) => {
  return (
    <div className="text-xs bg-dark-2 text-purple-tertiary border border-dark-4  rounded-full p-2 px-4">
      #{text}
      </div>
  )
}

export default HashtagBox 