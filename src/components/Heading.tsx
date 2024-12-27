import Image from "next/image";

type HeadingProps = {
    icon?: string;
    text: string;
    className?: string;
}
const Heading = ({ icon, text, className }: HeadingProps) => {
    return (
        <div className={`flex items-center justify-start gap-2 ${className}`}>
            {icon && <Image
                src={icon}
                alt="icon"
                width={32}
                height={32}
                className="max-md:w-[20px] max-md:h-[20px]"
            />}
            <h2 className="font-semibold lg:font-bold text-lg md:text-xl lg:text-3xl">{text}</h2>
        </div>
    )
}

export default Heading
