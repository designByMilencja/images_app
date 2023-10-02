import {getCurrentUser} from "@/lib/session";
import {getProjectDetails} from "@/lib/actions";
import {ProjectInterface} from "@/common.types";
import Modal from "@/components/Modal";
import Image from "next/image";
import Link from "next/link";
import RelatedProjects from "@/components/RelatedProjects";
import ProjectActions from "@/components/ProjectActions";

const Project = async ({params: {id}}: { params: { id: string } }) => {
    const session = await getCurrentUser();
    const result = await getProjectDetails(id) as {
        project?: ProjectInterface
    };
    if (!result?.project) {
        return (<p>Failed to fetch project info</p>)
    }
    const {title, description, image, liveSiteUrl, githubUrl, category, createdBy} = result?.project
    const projectDetails = result?.project

    const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`;

    return (
        <Modal>
            <div className="w-full flexBetween gap-y-8 flex-col max-w-4xl max-xs:flex-col">
                <div className="flex flex-1 items-start w-full gap-5 max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="Profile Image"
                        />
                    </Link>

                    <div className="flexStart flex-col gap-1 flex-1">
                        <p className="self-start text-lg font-semibold">{title}</p>
                        <div className="flex flex-wrap whitespace-nowrap text-sm font-normal w-full gap-2">
                            <Link href={renderLink()}>
                                {createdBy?.name}
                            </Link>
                            <Image src="/icons/bug-outline.svg" width={8} height={8} alt="dot" />
                            <Link href={`/?category=${category}`} className="text-primary-purple font-semibold">
                                {category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails.id} />
                    </div>
                )}


                <div className="mt-14">
                    <Image
                        src={image}
                        width={1064}
                        height={798}
                        className="object-cover rounded-2xl"
                        alt="Profile Image"
                    />
                </div>


                <section className="flexCenter flex-col mt-5">
                    <p className="max-w-5xl text-xl font-normal">{description}</p>
                    <div className="flex flex-wrap mt-5 gap-5">
                        <Link href={`${githubUrl}`} target="_blank" rel="noreferrer" className="flexCenter gap-2 text-sm font-medium text-primary-purple">
                            🖥 Github
                        </Link>
                        <Image src="/icons/bug-outline.svg" width={8} height={8} alt="dot" />
                        <Link href={`${liveSiteUrl}`}  target="_blank" rel="noreferrer" className="flexCenter gap-2 text-sm font-medium text-primary-purple">
                            🚀 Live Site
                        </Link>
                    </div>
                </section>

                <section className="flexCenter w-full gap-8 mt-28">
                    <span className="w-full h-0.5 bg-light-white-200" />
                    <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                        <Image
                            src={createdBy?.avatarUrl}
                            className="rounded-full"
                            width={82}
                            height={82}
                            alt="profile image"
                        />
                    </Link>
                    <span className="w-full h-0.5 bg-light-white-200" />
                </section>
            </div>
            <RelatedProjects
            userId={createdBy?.id} projectId={id}/>
        </Modal>
    );
}

export default Project;
