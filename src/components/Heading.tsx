import Image from "next/image";

type HeadingProps = {
    icon: string;
    text: string;
}
const Heading = ({ icon, text }: HeadingProps) => {
    return (
        <div className="flex items-center justify-start gap-2">
            <Image
                src={icon}
                alt="icon"
                width={32}
                height={32}
            />
            <h2 className="font-bold text-3xl">{text}</h2>
        </div>
    )
}

export default Heading
