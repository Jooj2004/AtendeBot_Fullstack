import Image from "next/image"
import Link from "next/link"

export const LogoDeashboard = () => {
    return(
        <Link href={'/home'} className="flex active:underline active:text-white">
          <Image src="/assets/logo.png" alt="AtendeBot" width={25} height={25} className="bg-white rounded-md" />
          <p className="text-cyan-950 hidden sm:block font-bold ml-1.5 text-[16px]">AtendeBot</p>
        </Link>
    )
}