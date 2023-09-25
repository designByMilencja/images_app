import Link from "next/link";
import Image from "next/image";
import {navLinks} from "@/constants";
import AuthProviders from "@/components/AuthProviders";
import {getCurrentUser} from "@/lib/session";

const Navbar = async () => {
    const session = await getCurrentUser();
    return (
        <nav className="bg-black flexBetween navbar">
            <div className="bg-orange-400 flex-1 flexStart gap-10">
                <Link href="/">
                    <Image
                    src="/icons/bug-outline.svg"
                    width={50}
                    height={50}
                    alt="a logo item - the little bug outline"/>
                </Link>
                <ul className="bg-blue-100 xs:flex hidden text-small gap-7">
                    {navLinks.map((link) => (
                        <Link href={link.href} key={link.key}>{link.text}</Link>
                    ))}
                </ul>
            </div>
            <div className="bg-pink-800 flexCenter gap-4">
                {session?.user ? (
                    <>
                        {session?.user?.image
                        &&   (<Image
                                src={session.user.image}
                                width={40}
                                height={40}
                                className="rounded-full"
                                alt={session.user.name}
                            />)}

                        <Link href='/create-project'>Share work</Link>
                    </>
                ) : <AuthProviders/>}
            </div>
        </nav>
    )
}
export default Navbar
