import Image from "next/image";
import {footerLinks} from "@/constants";
import Link from "next/link";

type ColumnProps = {
    title: string,
    links: Array<string>
}

const FooterColumn = ({title, links}: ColumnProps) => (
    <div className="bg-yellow-400 footer_column">
        <h4 className="bg-yellow-500 font-semibold">{title}</h4>
        <ul className="bg-yellow-600 flex flex-col gap-2 font-normal">
            {links.map(link => <Link href="/" key={link}>{link}</Link>)}
        </ul>
    </div>
)


const Footer = () => {
    return (
        <footer className="bg-red-200 flexStart footer">
            <div className="bg-red-300 flex flex-col gap-12 w-full p-1">
                <div className="bg-red-500 flex items-start flex-col">
                    <Image
                        src="/icons/bug-outline.svg"
                        width={115}
                        height={38}
                        alt="a logo item - the little bug outline"/>
                    <p className="bg-red-100 text-start text-sm font-normal mt-5 max-w-xs">Dumbledore - your place to
                        share videos and images</p>
                </div>
                <div className="bg-blue-100 flex flex-wrap gap-12 p-1">
                    <FooterColumn title={footerLinks[0].title} links={footerLinks[0].links}/>
                    <div className="bg-yellow-200 flex-1 flex flex-col gap-4">
                        <FooterColumn title={footerLinks[1].title} links={footerLinks[1].links}/>
                        <FooterColumn title={footerLinks[2].title} links={footerLinks[2].links}/>
                    </div>
                    <FooterColumn title={footerLinks[3].title} links={footerLinks[3].links}/>
                    <div className="bg-yellow-200 flex-1 flex flex-col gap-4">
                        <FooterColumn title={footerLinks[4].title} links={footerLinks[4].links}/>
                        <FooterColumn title={footerLinks[5].title} links={footerLinks[5].links}/>
                    </div>
                    <FooterColumn title={footerLinks[6].title} links={footerLinks[6].links}/>
                </div>
            </div>
            <div className="bg-blue-100 flexBetween footer_copyright">
                <p>© 2023 Dumbledore All rights reserved</p>
                <p className="text-gray"><span className="text-black font-semibold">
                    2137
                </span> project submitted</p>
            </div>
        </footer>
    )
}
export default Footer
